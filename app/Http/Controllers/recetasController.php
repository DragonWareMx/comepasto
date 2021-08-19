<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; 
use App\Models\Recipe;
use Illuminate\Support\Facades\DB;

class recetasController extends Controller
{
    public function index()
    {
        $recetas=Recipe::join('imgs','recipes.id', '=', 'imgs.recipe_id')
            ->select('recipes.*', 'imgs.*')->orderBy('recipes.created_at','desc')->get();
        // $recetas=Recipe::get();
        // dd($recetas);

        return Inertia::render('Recetas/Recetas',['recetas' => $recetas]); 
    }

    public function verReceta($id){
        $receta=Recipe::join('imgs','recipes.id', '=', 'imgs.recipe_id')
            ->select('recipes.*', 'imgs.*')->findOrFail($id); 
            
        $productos=DB::table('product_recipe')
            ->join('products', 'product_recipe.product_id', '=', 'products.id')
            ->select('products.name', 'products.foto', 'products.id', 'products.uuid')
            ->where('recipe_id', '=', $id)->get();
        
        return Inertia::render('Recetas/Receta',['receta' => $receta, 'productos' => $productos]);
    }
}
