<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; 
use Illuminate\Support\Facades\DB;


class CuentaController extends Controller
{
    public function index()
    {
        return Inertia::render('Cuenta/Cuenta'); 
    }

    public function misPedidos()
    {
        return Inertia::render('Cuenta/MisPedidos');
    }

    public function informacion()
    {
        return Inertia::render('Cuenta/Informacion');
    }

    public function direcciones()
    {
        return Inertia::render('Cuenta/Direcciones');
    }

    public function direccionesAdd(){
        return Inertia::render('Cuenta/Direcciones/AgregarDireccion');
    }

    public function direccionesEdit($id){
        return Inertia::render('Cuenta/Direcciones/EditarDireccion');
    }

    public function misPagos()
    {
        return Inertia::render('Cuenta/MisPagos');
    }
}
