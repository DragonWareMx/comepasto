<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Facades\DB; 

class AdminController extends Controller
{
    public function index(){
        $productos=Product::get();
        $total=$productos->count();
        $sinStock=$productos->where('stock','<=',0)->count();
        $stock=$productos->sum('stock');
        $totalProductos=DB::table('products')->sum(DB::raw('stock * precio'));
        $productos=Product::
            leftJoin('brands','products.brand_id','=','brands.id')
            ->select('products.id','products.name as nombre','brands.name as marca', 'precio' , 'descuento')->get();
        return Inertia::render('Admin/Productos/Productos',[
            'total'=>$total,
            'sinStock'=>$sinStock,
            'stock'=>$stock,
            'totalProductos'=>$totalProductos,
            'productos'=>$productos,
        ]);
    }

    public function producto($id){
        $producto=Product::with('brand:name,id','type:id,name','category:id,name','img:product_id,url')->findOrFail($id);
        return Inertia::render('Admin/Productos/Producto',[
            'producto'=>$producto,
        ]);
    }

    public function productoEditar($id){
        return Inertia::render('Admin/Productos/EditarProducto');
    }

    public function pedidos(){
        return Inertia::render('Admin/Pedidos/Pedidos');
    }

    public function pedido($id){
        return Inertia::render('Admin/Pedidos/Pedido');
    }
}
