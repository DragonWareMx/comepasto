<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class recetasController extends Controller
{
    public function index()
    {
        return Inertia::render('Recetas/Recetas'); 
    }

    public function verReceta($id){
        return Inertia::render('Recetas/Receta');
    }
}
