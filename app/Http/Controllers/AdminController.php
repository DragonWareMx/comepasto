<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Support\Facades\DB; 
use App\Models\Recipe;

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

    public function productoAgregar(){
        return Inertia::render('Admin/Productos/AgregarProducto');
    }

    public function pedidos(){
        $pedidos=Sale::
            leftJoin('users','sales.client_id','=','users.id')
            ->select('sales.id','sales.created_at as fecha','users.name as cliente', 'sales.total as total','tipo_entrega as entrega')
            ->orderBy('id','DESC')
        ->get();
        $total=$pedidos->count();
        $ganancias=$pedidos->sum('total');
        return Inertia::render('Admin/Pedidos/Pedidos',[
            'total'=>$total,
            'ganancias'=>$ganancias,
            'pedidos'=>$pedidos,
        ]);
    }

    public function pedido($id){
        $pedido=Sale::
            with('client','product')
        ->findOrFail($id);
        return Inertia::render('Admin/Pedidos/Pedido',[
            'pedido'=>$pedido,
        ]);
    }

    public function pedidosAgregar(){
        return Inertia::render('Admin/Pedidos/AgregarPedido');
    }

    public function clientes(){
        return Inertia::render('Admin/Clientes/Clientes');
    }

    public function cliente(){
        return Inertia::render('Admin/Clientes/Cliente');
    }

    public function preguntas(){
        return Inertia::render('Admin/Preguntas/Preguntas');
    }

    public function banners(){
        return Inertia::render('Admin/Banners/Banners');
    }

    public function recetas(){
        $recetas=Recipe::join('imgs','recipes.id', '=', 'imgs.recipe_id')
            ->select('recipes.*', 'imgs.*')->orderBy('recipes.created_at','desc')->get();
            
        return Inertia::render('Admin/Recetas/Recetas',['recetas' => $recetas]);
    }
}
