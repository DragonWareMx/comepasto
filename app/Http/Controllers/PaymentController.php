<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
}