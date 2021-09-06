<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


class CuentaController extends Controller
{
    public function index()
    {
        return Inertia::render('Cuenta/Cuenta');
    }

    public function misPedidos()
    {
        if (Auth::guest()) {
            return redirect()->route('inicio')->with('info', 'Por favor primero inicia sesión.');
        }
        $compras = Sale::where('client_id', '=', Auth::id())->orderBy('created_at', 'DESC')->get();
        return Inertia::render('Cuenta/MisPedidos', ['compras' => $compras]);
    }

    public function informacion()
    {
        return Inertia::render('Cuenta/Informacion');
    }

    public function direcciones()
    {
        return Inertia::render('Cuenta/Direcciones');
    }

    public function direccionesAdd()
    {
        return Inertia::render('Cuenta/Direcciones/AgregarDireccion');
    }

    public function direccionesEdit($id)
    {
        return Inertia::render('Cuenta/Direcciones/EditarDireccion');
    }

    public function misPagos()
    {
        return Inertia::render('Cuenta/MisPagos');
    }
}