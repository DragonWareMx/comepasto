<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Recipe;
use Illuminate\Support\Facades\DB;
use App\Models\Brand;
use App\Models\Type;
use App\Models\Category;

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
        $marcas=Brand::select('id','name')->get();
        $tipos=Type::select('id','name')->get();
        $categorias=Category::select('id','name')->get();
        return Inertia::render('Admin/Productos/AgregarProducto',[
            'marcas'=>$marcas,
            'tipos'=>$tipos,
            'categorias'=>$categorias,
        ]);
    }

    public function productoInventario(Request $request, $id){
        $validated = $request->validate([
            'stock' => 'required|numeric',
        ]);
        $product=Product::findOrFail($id);
        try {
            DB::beginTransaction();
            $product->stock=$request->stock;
            $product->save();
            DB::commit();
            return \Redirect::back()->with('success','Stock actualizado con éxito.');
        } catch (\Throwable $th) {
            dd($th);
            DB::rollback();
            return \Redirect::back()->with('error','Ocurrió un problema, vuelva a intentarlo más tarde.');
        }
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

    public function recetas(Request $request){
        if($request->busqueda){
            $recetas=Recipe::where('recipes.nombre','like','%'.$request->busqueda.'%')
            ->orWhere('imgs.descripcion','like','%'.$request->busqueda.'%')
            ->join('imgs','recipes.id', '=', 'imgs.recipe_id')
                ->select('recipes.*', 'imgs.*')->orderBy('recipes.created_at','desc')->get();
            $busqueda=$request->busqueda;
        }
        else{
            $recetas=Recipe::join('imgs','recipes.id', '=', 'imgs.recipe_id')
                ->select('recipes.*', 'imgs.*')->orderBy('recipes.created_at','desc')->get();
            $busqueda='';
        }
            
        return Inertia::render('Admin/Recetas/Recetas',[
            'recetas' => $recetas,
            'busqueda'=>$busqueda,
        ]);
    }

    public function receta($id){
        return Inertia::render('Admin/Recetas/Receta');
    }

    public function recetaEditar($id){
        return Inertia::render('Admin/Recetas/EditarReceta');
    }

    public function recetasAgregar(){
        return Inertia::render('Admin/Recetas/AgregarReceta');
    }
}
