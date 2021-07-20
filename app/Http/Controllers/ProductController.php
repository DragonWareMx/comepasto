<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart;
use App\Models\Category;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Muestra todos los productos listados.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $product = Product::with('brand:id,name,logo,link', 'category:id,name', 'type:id,name', 'img:product_id,url,descripcion')
                        ->select('id','name', 'precio', 'descuento','brand_id','category_id', 'type_id', 'presentacion', 'ingredientes', 'trigoFree', 'soyaFree', 'foto')
                        ->where('uuid', '=', $id)
                        ->firstOrFail();

        return Inertia::render('Products/Product',['product' => $product]); 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
