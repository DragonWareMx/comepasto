<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Cartalyst\Stripe\Laravel\Facades\Stripe;
use Cartalyst\Stripe\Exception\CardErrorException;
use Illuminate\Support\Facades\Auth;

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
        return redirect()->back()->with('data', $costoEnvio);
    }

    public function payment(Request $request)
    {
        if ($request->tipo_de_pago == 'stripe') {
            return redirect()->route('stripe.index');
        }
        dd($request->all());
    }

    public function stripe()
    {
        if (Auth::guest()) {
            return redirect()->route('inicio')->with('info', 'Por favor primero inicia sesión.');
        }
        return Inertia::render('Stripe');
    }

    public function stripePay(Request $request)
    {
        try {
            $charge = Stripe::charges()->create([
                'amount' => 100,
                'currency' => 'MXN',
                'source' => $request->token,
                'description' => 'Esta es la primera prueba',
                'receipt_email' => 'inherentejohn@gmail.com',
                'metadata' => [
                    'contents' => 'Order id: 5',
                    'quantity' => 1,
                ]
            ]);
            //Successfull

        } catch (\Throwable $th) {
            //throw $th;
            dd($th);
        }
    }
}