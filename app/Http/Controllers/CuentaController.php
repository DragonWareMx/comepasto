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
}
