<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class quienesSomosController extends Controller
{
    public function index()
    {
        return Inertia::render('QuienesSomos');
    }
}
