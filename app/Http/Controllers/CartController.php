<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Recipe;
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
        if(!$product || $product->stock == 0){
            //si el producto existe en el carrito se elimina
            if(!is_null(\Auth::user()->cart()->where('product_id', $product->id)->first())){
                \Auth::user()->cart()->detach($product->id);
            }
            
            return \Redirect::back()->with('error','El producto solicitado no se encuentra disponible.');
        }

        // checa si existe el producto en el carrito
        $productInCart = \Auth::user()->cart()->where('product_id', $product->id)->first();

        //si existe se suma la cantidad
        if($productInCart) {
            $cantidad = $productInCart->pivot->cantidad + 1;

            $mensaje = true;
            //si la cantidad no excede el stock
            if($cantidad > $productInCart->stock){
                $cantidad = $productInCart->stock;
                $mensaje = false;
            }
            if($cantidad < 1){
                $cantidad = 1;
            }

            \Auth::user()->cart()->sync([$product->id => ['cantidad' => $cantidad, 'estatus' => 'ready']], false);
            
            if($mensaje){
                return \Redirect::back();
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
     * resta o elimina un producto del carrito
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cart  $cart
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        //si está loggeado
        if(!\Auth::user()){
            return \Redirect::back()->with('info','Inicia sesión.');
        }

        //se encuentra el producto
        $product = Product::find($id);

        //si no hay producto se manda el mensaje de error
        if(!$product || $product->stock == 0){
            //si el producto existe en el carrito se elimina
            if(!is_null(\Auth::user()->cart()->where('product_id', $product->id)->first())){
                \Auth::user()->cart()->detach($product->id);
            }

            return \Redirect::back()->with('error','El producto solicitado no se encuentra disponible.');
        }

        //checa si existe el producto en el carrito
        $productInCart = \Auth::user()->cart()->where('product_id', $product->id)->first();

        //si existe se elimina o se resta
        if($productInCart) {
            $cantidad = $productInCart->pivot->cantidad - 1;

            //si la cantidad no excede el stock
            if($cantidad > $productInCart->stock){
                $cantidad = $productInCart->stock;
            }

            //si la cantidad es menor o igual a 0 se elimina el producto del carrito
            if($cantidad <= 0){
                \Auth::user()->cart()->detach($product->id);

                return \Redirect::back()->with('success','Producto eliminado del carrito.');
            }

            //si la cantidad no es 0 se resta y se actualiza
            \Auth::user()->cart()->sync([$product->id => ['cantidad' => $cantidad, 'estatus' => 'ready']], false);
            
            return \Redirect::back();
        }

        return \Redirect::back();
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


    public function recipe($id, Request $request)
    {
        //si está loggeado
        if(!\Auth::user()){
            return \Redirect::back()->with('info','Inicia sesión.');
        }

        $recipe=Recipe::with('product:id')->findOrFail($id);

        //contador para wachar los productos que no se puedan agregar
        $cont=0;

        foreach ($recipe->product as $product) {
            //se encuentra el producto
            $product = Product::find($product->id);
            
            //si no hay producto se manda el mensaje de error
            if(!$product || $product->stock == 0){
                //si el producto existe en el carrito se elimina
                if(!is_null(\Auth::user()->cart()->where('product_id', $product->id)->first())){
                    \Auth::user()->cart()->detach($product->id);
                }
                $cont++;
                continue;
                // return \Redirect::back()->with('error','El producto solicitado no se encuentra disponible.');
            }

            // checa si existe el producto en el carrito
            $productInCart = \Auth::user()->cart()->where('product_id', $product->id)->first();

            //si existe se suma la cantidad
            if($productInCart) {
                $cantidad = $productInCart->pivot->cantidad + 1;
                $mensaje = true;
                //si la cantidad no excede el stock
                if($cantidad > $productInCart->stock){
                    $cantidad = $productInCart->stock;
                    $mensaje = false;
                }
                if($cantidad < 1){
                    $cantidad = 1;
                }
                
                \Auth::user()->cart()->sync([$product->id => ['cantidad' => $cantidad, 'estatus' => 'ready']], false);
                
                if(!$mensaje){
                    // return \Redirect::back();
                    $cont++;
                }

                //si excede el stock
                // return \Redirect::back()->with('message','Ya no puede agregar más cantidad de este producto.');
            }
            else{
                //si no existe el producto en el carrito se agrega
                \Auth::user()->cart()->sync([$product->id => ['cantidad' => 1, 'estatus' => 'ready']], false);
            }
        }

        if($cont>0){
            return \Redirect::back()->with('message',$cont.' producto(s) no están disponibles, revisa el carrito.');
        }
        return \Redirect::back()->with('success','Productos agregados al carrito.');
    }
}
