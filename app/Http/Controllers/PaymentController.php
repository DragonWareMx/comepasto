<?php

namespace App\Http\Controllers;

use App\Mail\ReceiptComepasto;
use App\Models\Product;
use App\Models\Sale;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Cartalyst\Stripe\Laravel\Facades\Stripe;
use Cartalyst\Stripe\Exception\CardErrorException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReceiptSale;

class PaymentController extends Controller
{
    //
    public function cotizar(Request $request)
    {
        $GoogleAPIKey = 'AIzaSyDAsRsMlBifyC8uKaJMAskmREIdfLqBYyA';

        //Send request and receive json data
        $geocodeFrom = file_get_contents('https://maps.google.com/maps/api/distancematrix/json?origins=' .
            '19.7104094,-101.2056903' . '&destinations=' .  $request->lat . ',' . $request->lng . '&sensor=false&key=' . $GoogleAPIKey);
        $outputFrom = json_decode($geocodeFrom);

        $result = $outputFrom->rows[0]->elements[0]->distance->text;
        list($distancia, $unidad) = explode(" ", $result);
        $costoEnvio = round($distancia) * 5;
        $costoEnvio = $costoEnvio + 25;
        session()->put('costoEnvio', $costoEnvio);
        return redirect()->back()->with('data', $costoEnvio);
    }

    public function payment(Request $request)
    {
        if ($request->tipo_de_pago == 'stripe') {
            session()->put('tipo_de_envio', $request->tipo_de_envio);
            session()->put('direccion', $request->direction);
            return redirect()->route('stripe.index');
        }
        if ($request->tipo_de_pago == 'transferencia' || $request->tipo_de_pago == 'efectivo') {
            DB::beginTransaction();
            try {
                //code..
                $compras = User::findOrFail(Auth::id())->cart()->get();
                $subtotal = 0;
                foreach ($compras as $item) {
                    $subtotal += ($item->precio * ((100 - $item->descuento) / 100)) * $item->pivot->cantidad;
                    if ($item->pivot->cantidad > $item->stock) {
                        //Se vacía el carrito
                        $cart = User::findOrFail(Auth::id())->cart()->detach();
                        return redirect()->back()->with('error', 'Un producto ya no se encuentra disponible, revisa tu carrito!');
                    }
                }
                if ($request->tipo_de_envio  == 'domicilio') {
                    $envio = session()->get('costoEnvio');
                } else {
                    $envio = 0;
                }
                $total = $subtotal + $envio;

                $venta = new Sale;
                $venta->client_id = Auth::id();
                $venta->costoProducto = $subtotal;
                $venta->costoEnvio = $envio;
                $venta->formaPago = $request->tipo_de_pago;
                $venta->total = $total;
                $venta->ganancia = 0;
                $venta->tipo_entrega = $request->tipo_de_envio;
                $venta->direccion = $request->direction;
                $venta->save();

                foreach ($compras as $item) {
                    $venta->product()->attach(
                        $item->id,
                        [
                            'costo' => $item->costo,
                            'precio' => $item->precio,
                            'descuento' => $item->descuento,
                            'cantidad' => $item->pivot->cantidad,
                        ]
                    );
                    $producto = Product::findOrFail($item->id);
                    $producto->stock = $producto->stock - $item->pivot->cantidad;
                    $producto->save();
                }
                //Se vacía el carrito
                $cart = User::findOrFail(Auth::id())->cart()->detach();
                //Se envía el correo electronico
                $this->mandarCorreo($venta->id);
                //se vacía la sesión
                session()->forget('direccion');
                DB::commit();
                return redirect()->route('gracias', $venta->id)->with('success', 'Compra realizada con éxito!');
            } catch (\Throwable $th) {
                //throw $th;
                DB::rollback();
                return redirect()->back()->with('error', 'Ocurrió un error inesperado, por favor intentalo más tarde.');
            }
        }
        //Aqui va lo de paypal
        if ($request->tipo_de_pago == 'paypal') {
            $paypal = new PaypalController();
            return $paypal->payment($request);
        }
        return redirect()->back()->with('error', 'Ocurrió un error inesperado, por favor intentalo más tarde.');
    }

    public function stripe()
    {
        if (Auth::guest()) {
            return redirect()->route('inicio')->with('info', 'Por favor primero inicia sesión.');
        }
        if (session()->get('tipo_de_envio')  == 'domicilio') {
            $costoEnvio = session()->get('costoEnvio');
        } else {
            $costoEnvio = 0;
        }


        return Inertia::render('Stripe', ['costoEnvio' => $costoEnvio]);
    }

    public function stripePay(Request $request)
    {
        DB::beginTransaction();
        try {
            $compras = User::findOrFail(Auth::id())->cart()->get();
            $subtotal = 0;
            $metadata = [];
            foreach ($compras as $item) {
                $subtotal += ($item->precio * ((100 - $item->descuento) / 100)) * $item->pivot->cantidad;
                $metadata[] = $item->name . ' cantidad= ' . $item->pivot->cantidad;
                if ($item->pivot->cantidad > $item->stock) {
                    //Se vacía el carrito
                    $cart = User::findOrFail(Auth::id())->cart()->detach();
                    return redirect()->back()->with('error', 'Un producto ya no se encuentra disponible, revisa tu carrito!');
                }
            }
            if (session()->get('tipo_de_envio')  == 'domicilio') {
                $envio = session()->get('costoEnvio');
                $direccion = session()->get('direccion');
            } else {
                $envio = 0;
                $direccion = '';
            }
            $total = $subtotal + $envio;
            $charge = Stripe::charges()->create([
                'amount' => $total,
                'currency' => 'MXN',
                'source' => $request->token,
                'description' => 'Compra en Comepasto',
                'receipt_email' => Auth::user()->email,
                'metadata' => [
                    'contents' => json_encode($metadata),
                    'quantity' => 1,
                ]
            ]);
            //Successfull
            $venta = new Sale;
            $venta->client_id = Auth::id();
            $venta->costoProducto = $subtotal;
            $venta->costoEnvio = $envio;
            $venta->formaPago = 'stripe';
            $venta->total = $total;
            $venta->ganancia = 0;
            $venta->tipo_entrega = session()->get('tipo_de_envio');
            $venta->direccion = $direccion;
            $venta->statusPago = true;
            $venta->save();

            foreach ($compras as $item) {
                $venta->product()->attach(
                    $item->id,
                    [
                        'costo' => $item->costo,
                        'precio' => $item->precio,
                        'descuento' => $item->descuento,
                        'cantidad' => $item->pivot->cantidad,
                    ]
                );
                $producto = Product::findOrFail($item->id);
                $producto->stock = $producto->stock - $item->pivot->cantidad;
                $producto->save();
            }
            //Se vacía el carrito
            $cart = User::findOrFail(Auth::id())->cart()->detach();
            //Se envía el correo electronico
            $this->mandarCorreo($venta->id);
            //se vacía la sesión
            session()->forget('tipo_de_envio');
            session()->forget('costoEnvio');
            session()->forget('direccion');
            DB::commit();
            return redirect()->back()->with('success', 'Compra realizada con éxito!');
        } catch (CardErrorException $e) {
            //throw $th;
            if ($e->getMessage() == 'Your card has insufficient funds.') {
                $status = 'Error! Tu tarjeta no tiene fondos suficientes.';
            } else if ($e->getMessage() == 'Your card was declined.') {
                $status = 'Error! Tu tarjeta fue declinada.';
            } else if ($e->getMessage() == 'Your card has expired.') {
                $status = 'Error! Tu tarjeta ha expirado.';
            } else if ($e->getMessage() == "Your card's security code is incorrect.") {
                $status = 'Error! El código de seguridad de tu tarjeta es incorrecto.';
            } else if ($e->getMessage() == "An error occurred while processing your card. Try again in a little bit.") {
                $status = 'Error! Un problema ocurrió mientras procesabamos tu tarjeta. Inténtalo de nuevo más tarde.';
            } else {
                $status = 'Error! ' . $e->getMessage();
            }
            return redirect()->route('stripe.index')->with('error', $status);
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollback();
            return redirect()->route('stripe.index')->with('error', 'Algo salió mal, por favor intentalo más tarde.');
        }
    }

    public function mandarCorreo($id_sale)
    {
        $var = config('app.env');
        if ($var == 'production') {
            Mail::to(Auth::user()->email)->send(new ReceiptSale($id_sale));
            Mail::to('joseagustinsolorzano@gmail.com')->send(new ReceiptComepasto($id_sale));
            Mail::to('comepastov@gmail.com')->send(new ReceiptComepasto($id_sale));
        } else {
            Mail::to(Auth::user()->email)->send(new ReceiptSale($id_sale));
            Mail::to(Auth::user()->email)->send(new ReceiptComepasto($id_sale));
        }
    }

    public function showGreetings($id)
    {
        $sale = Sale::find($id);
        if ($sale && $sale->client->id == Auth::id()) {
            return Inertia::render('Gracias');
        }
        return redirect()->route('inicio');
    }
}