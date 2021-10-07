<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PayPal\Rest\ApiContext;
use PayPal\Auth\OAuthTokenCredential;
use Illuminate\Support\Facades\Config;
use PayPal\Api\Payer;
use PayPal\Api\Amount;
use PayPal\Api\Transaction;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;
use PayPal\Exception\PayPalConnectionException;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Sale;
use App\Models\Product;

class PaypalController extends Controller
{
    //
    private $apiContext;
    public function __construct()
    {
        $payPalConfig = Config::get('paypal');
        $this->apiContext = new ApiContext(
            new OAuthTokenCredential(
                $payPalConfig['client_id'],     // ClientID
                $payPalConfig['secret']      // ClientSecret
            )
        );

        $this->apiContext->setConfig($payPalConfig['settings']);
    }

    public function payment(Request $request)
    {
        $total = 0;
        $payer = new Payer();
        $payer->setPaymentMethod('paypal');

        //parte para crear la lista de items que se van a cobrar
        $items = [];

        $compras = User::findOrFail(Auth::id())->cart()->get();
        $subtotal = 0;
        $i = 0;
        foreach ($compras as $producto) {
            if ($producto->pivot->cantidad > $producto->stock) {
                //Se vacía el carrito
                $cart = User::findOrFail(Auth::id())->cart()->detach();
                return redirect()->back()->with('error', 'Un producto ya no se encuentra disponible, revisa tu carrito!');
            }
            $items[$i] = new Item();
            $items[$i]->setName($producto->name)
                /** item name **/
                ->setCurrency('MXN')
                ->setQuantity($producto->pivot->cantidad)
                ->setPrice(number_format($producto->precio * ((100 - $producto->descuento) / 100), 2, ".", ""));
            $subtotal += ($producto->precio * ((100 - $producto->descuento) / 100)) * $producto->pivot->cantidad;
            $i++;
        }
        if ($request->tipo_de_envio  == 'domicilio') {
            $envio = session()->get('costoEnvio');
            $items[$i] = new Item();
            $items[$i]->setName('Envío')
                /** item name **/
                ->setCurrency('MXN')
                ->setQuantity('1')
                ->setPrice(number_format($envio, 2, ".", ""));
        } else {
            $envio = 0;
        }
        $total = $subtotal + $envio;

        $item_list = new ItemList();
        $item_list->setItems($items);

        //VARIABLES DE SESION
        session()->put('subtotal', $subtotal);
        session()->put('envio', $envio);
        session()->put('total', $total);
        session()->put('tipo_de_envio', $request->tipo_de_envio);
        session()->put('direccion', $request->direction);
        // session(['eventoId' => $evento->id]);
        // session(['productoId' => $evento->product->id]);
        // session(['productoUuid' => $evento->product->uuid]);
        // session(['cantidad' => $request->values['cantidad']]);
        // session(['total' => $total]);

        $amount = new Amount();
        $amount->setTotal($total);
        $amount->setCurrency('MXN');

        $transaction = new Transaction();
        $transaction->setAmount($amount);
        $transaction->setDescription('Compra en Comepasto');
        $transaction->setItemList($item_list);

        $callbackurl = route('paypal.payment');
        $redirectUrls = new RedirectUrls();
        $redirectUrls->setReturnUrl($callbackurl)
            ->setCancelUrl($callbackurl);

        $payment = new Payment();
        $payment->setIntent('sale')
            ->setPayer($payer)
            ->setTransactions(array($transaction))
            ->setRedirectUrls($redirectUrls);

        try {
            $payment->create($this->apiContext);
            //echo $payment;
            return response('', 409)
                ->header('X-Inertia-Location', $payment->getApprovalLink());
        } catch (PayPalConnectionException $ex) {

            echo $ex->getData();
        }
    }

    public function status(Request $request)
    {
        $paymentId = $request->input('paymentId');
        $payerId = $request->input('PayerID');
        $token = $request->input('token');

        if (!$paymentId || !$payerId || !$token) {
            return redirect()->route('inicio')->with('error', "No se pudo proceder con el pago através de PayPal.");
        }
        $payment = Payment::get($paymentId, $this->apiContext);

        $execution = new PaymentExecution();
        $execution->setPayerId($payerId);

        $result = $payment->execute($execution, $this->apiContext);

        if ($result->getState() == 'approved') {
            //se registra la venta en la BD en la tabla Sales

            DB::beginTransaction();
            try {
                $venta = new Sale;
                $venta->client_id = Auth::id();
                $venta->costoProducto = session()->get('subtotal');
                $venta->costoEnvio = session()->get('envio');
                $venta->formaPago = 'Paypal';
                $venta->total = session()->get('total');
                $venta->ganancia = 0;
                $venta->tipo_entrega = session()->get('tipo_de_envio');
                $venta->direccion = (session()->get('tipo_de_envio') == 'domicilio') ? session()->get('direccion') : '';
                $venta->statusPago = true;
                $venta->save();

                $compras = User::findOrFail(Auth::id())->cart()->get();

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
                $otroController = new PaymentController();
                $otroController->mandarCorreo($venta->id);
                //se vacía la sesión
                session()->forget('subtotal');
                session()->forget('envio');
                session()->forget('total');
                session()->forget('tipo_de_envio');
                session()->forget('costoEnvio');
                session()->forget('direccion');
                DB::commit();
                $status = "Gracias! El pago a través de PayPal se ha procesado correctamente. Se te enviará un correo electrónico con los detalles de tu pedido.";
                return redirect()->route('gracias', $venta->id)->with('success', $status);
            } catch (\Throwable $th) {
                //throw $th;
                DB::rollBack();
                return redirect()->route('inicio')->with('error', "Lo sentimos! El pago a través de PayPal no se pudo realizar, inténtalo más tarde.");
            }
        }
        return redirect()->route('inicio')->with('error', "Lo sentimos! El pago a través de PayPal no se pudo realizar.");
    }
}