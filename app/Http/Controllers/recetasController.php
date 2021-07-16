<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; 
use App\Models\Recipe;

class recetasController extends Controller
{
    public function index()
    {
        $recetas=Recipe::join('imgs','recipes.id', '=', 'imgs.recipe_id')->select('recipes.*', 'imgs.*')->orderBy('recipes.created_at','desc')->get();
        dd($recetas);
        return Inertia::render('Recetas/Recetas'); 
    }

    public function verReceta($id){
        return Inertia::render('Recetas/Receta');
    }
}
