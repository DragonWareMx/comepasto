<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Brand;

class quienesSomosController extends Controller
{
    public function index()
    {
        $brands=Brand::get();
        return Inertia::render('QuienesSomos',[
            'brands'=>$brands,
        ]);
    }
}
