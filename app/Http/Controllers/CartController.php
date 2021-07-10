<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function getProductos(){
        
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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
    public function store($id, Request $request)
    {
        //si está loggeado
        if(!\Auth::user()){
            return \Redirect::back()->with('info','Inicia sesión.');
        }

        //se encuentra el producto
        $product = Product::find($id);

        //si no hay producto se manda el mensaje de error
        if(!$product){
            return \Redirect::back()->with('error','El producto solicitado no existe.');
        }

        //si el carrito no esta vacio checa si existe el producto
        $productInCart = \Auth::user()->cart()->where('product_id', $product->id)->first();

        if($productInCart) {
            $cantidad = $productInCart->pivot->cantidad + 1;

            //si la cantidad no excede el stock
            if($cantidad <= $productInCart->stock){
                \Auth::user()->cart()->sync([$product->id => ['cantidad' => $cantidad, 'estatus' => 'ready']], false);
                
                return \Redirect::back()->with('success','Producto agregado al carrito.');
            }

            //si excede el stock
            return \Redirect::back()->with('message','Ya no puede agregar más cantidad de este producto.');
        }

        //si no existe el producto en el carrito se agrega
        \Auth::user()->cart()->sync([$product->id => ['cantidad' => 1, 'estatus' => 'ready']], false);

        return \Redirect::back()->with('success','Producto agregado al carrito.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cart $cart)
    {
        //
    }
}
