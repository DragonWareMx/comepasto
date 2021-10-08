<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Recipe;
use Illuminate\Support\Facades\DB;
use App\Models\Brand;
use App\Models\Type;
use App\Models\User;
use App\Models\Category;
use App\Models\Question;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{

    public function __construct()
    {
        $this->middleware('soyadmin');
    }

    public function index()
    {
        $productos = Product::leftJoin('brands', 'products.brand_id', '=', 'brands.id')
            ->select('products.id', 'products.name as nombre', 'brands.name as marca', 'precio', 'descuento', 'stock')
            ->selectRaw('(`products`.`precio` - `products`.`precio`*(`products`.`descuento`/100)) AS precio_descuento')
            ->when($request->deleted == "true", function ($query, $deleted) {
                return $query->onlyTrashed();
            })
            ->get();
        
            $total = $productos->count();

        $sinStock=Product::where('stock','<=',0)->count();

        $stock=Product::sum('stock');

        $totalProductos=Product::sum(DB::raw('stock * (`products`.`precio` - `products`.`precio`*(`products`.`descuento`/100)) '));
        
            return Inertia::render('Admin/Productos/Productos',[
            'total'=>$total,
            'sinStock'=>$sinStock,
            'stock'=>$stock,
            'totalProductos'=>$totalProductos,
            'productos'=>$productos,
        ]);
    }

    public function producto($id){
        $producto=Product::withTrashed()->with('brand:name,id','type:id,name','category:id,name','img:product_id,url')->findOrFail($id);

        $recetas = Recipe::with('img:descripcion,url,recipe_id')
                        ->whereHas('img')
                        ->whereHas('product', function($query) use ($producto){
                            return $query->where('products.id', $producto->id);
                        })
                        ->select('id', 'nombre')
                        ->get();

        return Inertia::render('Admin/Productos/Producto',[
            'producto'=>$producto,
            'recetas'=>$recetas
        ]);
    }

    public function ProductoDelete($id)
    {
        DB::beginTransaction();
        try{
            $product = Product::find($id);

            if(!$product){
                DB::rollBack();
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar eliminar el producto, inténtelo más tarde.');
            }

            $product->delete();

            DB::commit();
            return \Redirect::route('admin.productos')->with('success','¡Producto eliminado con éxito!');
            
        } catch (\Exception $e) {
            DB::rollBack();
            return \Redirect::back()->with('error','Ha ocurrido un error al intentar eliminar el usuario, inténtelo más tarde.');
        }
    }

    public function productoRestore($id)
    {
        DB::beginTransaction();
        try{
            $product = Product::withTrashed()->find($id);

            if(!$product){
                DB::rollBack();
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar restaurar el producto, inténtelo más tarde.');
            }

            $product->restore();

            DB::commit();
            return \Redirect::back()->with('success','¡Producto restaurado con éxito!');
            
        } catch (\Exception $e) {
            DB::rollBack();

            return \Redirect::back()->with('error','Ha ocurrido un error al intentar restaurar el producto, inténtelo más tarde.');
        }
    }

    public function productoEditar($id){
        $producto=Product::with('brand:id,name')
            ->with('type:id,name')
            ->with('category:id,name')
            ->findOrFail($id);
        $marcas = Brand::select('id', 'name')->get();
        $tipos = Type::select('id', 'name')->get();
        $categorias = Category::select('id', 'name')->get();
        return Inertia::render('Admin/Productos/EditarProducto', [
            'producto' => $producto,
            'marcas' => $marcas,
            'tipos' => $tipos,
            'categorias' => $categorias,
        ]);
    }

    public function productoPatch(Request $request, $id)
    {
        dd('holi we', $id, $request);
    }

    public function productoAgregar()
    {
        $marcas = Brand::select('id', 'name')->get();
        $tipos = Type::select('id', 'name')->get();
        $categorias = Category::select('id', 'name')->get();
        return Inertia::render('Admin/Productos/AgregarProducto', [
            'marcas' => $marcas,
            'tipos' => $tipos,
            'categorias' => $categorias,
        ]);
    }

    public function storeProducto(Request $request)
    {
        $validated = $request->validate([
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:51200',
            'nombre' => ['required', 'max:100', 'regex:/^[A-Za-z0-9À-ÖØ-öø-ÿ_! \"#$%&\'()*+,\-.\\:\/;=?@^_]+$/'],
            'marca' => 'required|exists:brands,id',
            'tipo' => 'required|exists:types,id',
            'categoria' => 'required|exists:categories,id',
            'presentacion' => ['nullable', 'max:250', 'regex:/^[A-Za-z0-9À-ÖØ-öø-ÿ_! \"#$%&\'()*+,\-.\\:\/;=?@^_]+$/'],
            'precio' => 'required|between:0,999999.99|numeric',
            'descuento' => 'required|between:0,100.00|numeric',
            'ingredientes' => ['nullable', 'max:8000', 'regex:/^[A-Za-z0-9À-ÖØ-öø-ÿ_! \"#$%&\'()*+,\-.\\:\/;=?@^_]+$/'],
            'soyaFree' => 'required|boolean',
            'trigoFree' => 'required|boolean',
        ]);
        // El nuevo producto es valido...

        //COMIENZA LA TRANSACCION
        DB::beginTransaction();

        //variables para comprobar la subida de archivos
        $foto = null;
        try {
            DB::commit();

            $newProduct = new Product;

            //guarda la foto
            $foto = $request->file('foto')->store('public/products');
            $newProduct->foto = $request->file('foto')->hashName();

            //informacion
            $newProduct->uuid = Str::uuid();
            $newProduct->name = $request->nombre;
            $newProduct->brand_id = $request->marca;
            $newProduct->type_id = $request->tipo;
            $newProduct->category_id = $request->categoria;
            $newProduct->presentacion = $request->presentacion;
            $newProduct->precio = $request->precio;
            $newProduct->descuento = $request->descuento;
            $newProduct->ingredientes = $request->ingredientes;
            $newProduct->soyaFree = $request->soyaFree;
            $newProduct->trigoFree = $request->trigoFree;

            $newProduct->save();

            //REDIRECCIONA A LA VISTA DE PRODUCTOS
            return \Redirect::route('admin.productos')->with('success', 'El producto ha sido registrado con éxito!');
        } catch (\Exception $e) {
            DB::rollBack();

            //si hay foto se elimina del servidor
            if ($foto) {
                \Storage::delete($foto);
            }

            return \Redirect::back()->with('error', 'Ha ocurrido un error al intentar registrar el producto, inténtelo más tarde.');
        }
    }

    public function productoInventario(Request $request, $id)
    {
        $validated = $request->validate([
            'stock' => 'required|numeric',
        ]);
        $product = Product::findOrFail($id);
        try {
            DB::beginTransaction();
            $product->stock = $request->stock;
            $product->save();
            DB::commit();
            return \Redirect::back()->with('success', 'Stock actualizado con éxito.');
        } catch (\Throwable $th) {
            dd($th);
            DB::rollback();
            return \Redirect::back()->with('error', 'Ocurrió un problema, vuelva a intentarlo más tarde.');
        }
    }

    public function pedidos()
    {
        $pedidos = Sale::leftJoin('users', 'sales.client_id', '=', 'users.id')
            ->select('sales.id', 'sales.created_at as fecha', 'users.name as cliente', 'sales.total as total', 'tipo_entrega as entrega')
            ->orderBy('id', 'DESC')
            ->get();

        $total = $pedidos->count();

        $ganancias = $pedidos->sum('total');

        return Inertia::render('Admin/Pedidos/Pedidos', [
            'total' => $total,
            'ganancias' => $ganancias,
            'pedidos' => $pedidos,
        ]);
    }

    public function pedido($id)
    {
        $pedido = Sale::with('client', 'product')
            ->findOrFail($id);
        return Inertia::render('Admin/Pedidos/Pedido', [
            'pedido' => $pedido,
        ]);
    }

    public function pedidoEstatus(Request $request, $id){
        $validated = $request->validate([
            'estatus' => ["required" , "max:50", "in:en camino,pendiente,entregado"]  ,
        ]);
        $pedido = Sale::findOrFail($id);
        try {
            DB::beginTransaction();
            $pedido->status = $request->estatus;
            $pedido->save();
            DB::commit();
            return \Redirect::back()->with('success', 'Estatus actualizado con éxito.');
        } catch (\Throwable $th) {
            DB::rollback();
            return \Redirect::back()->with('error', 'Ocurrió un problema, vuelva a intentarlo más tarde.');
        }
    }

    public function pedidoPagado($id){
        $pedido = Sale::findOrFail($id);
        try {
            DB::beginTransaction();
            $pedido->statusPago = 1;
            $pedido->save();
            DB::commit();
            return \Redirect::back()->with('success', 'El pedido se marcó como pagado.');
        } catch (\Throwable $th) {
            DB::rollback();
            return \Redirect::back()->with('error', 'Ocurrió un problema, vuelva a intentarlo más tarde.');
        }
    }

    public function pedidoDelete($id)
    {
        $pedido = Sale::findOrFail($id);
        try {
            DB::beginTransaction();
            $pedido->delete();
            DB::commit();
            return \Redirect::route('admin.pedidos')->with('success', 'El pedido se ha eliminado con éxito!');
        } catch (\Throwable $th) {
            dd($th);
            DB::rollback();
            return \Redirect::back()->with('error', 'Ocurrió un problema, vuelva a intentarlo más tarde.');
        }
    }

    public function pedidosAgregar()
    {
        return Inertia::render('Admin/Pedidos/AgregarPedido');
    }

    public function clientes()
    {
        $clients = User::leftJoin('sales', 'sales.client_id', '=', 'users.id')
            ->selectRaw('users.id, name AS nombre,tel AS telefono, email AS correo, users.created_at AS registro, SUM(sales.total) AS total')
            ->groupBy('users.id', 'users.name', 'users.tel', 'users.email', 'users.created_at')
            ->get();

        return Inertia::render('Admin/Clientes/Clientes', [
            'clients' => $clients
        ]);
    }

    public function cliente($id)
    {
        $cliente = User::with('sale', 'sale.product')->findOrFail($id);
        return Inertia::render('Admin/Clientes/Cliente', [
            'cliente' => $cliente,
        ]);
    }

    public function preguntas(Request $request)
    {
        if ($request->busqueda) {
            $preguntas = Question::where('question', 'like', '%' . $request->busqueda . '%')
                ->orWhere('answer', 'like', '%' . $request->busqueda . '%')
                ->orWhere('type', 'like', '%' . $request->busqueda . '%')
                ->get();
        } else {
            $preguntas = Question::get();
        }
        return Inertia::render('Admin/Preguntas/Preguntas', [
            'preguntas' => $preguntas,
        ]);
    }

    public function preguntasEliminar($id)
    {
        try {
            DB::beginTransaction();
            $pregunta = Question::findOrFail($id);
            $pregunta->delete();
            DB::commit();
            return \Redirect::back()->with('success', 'Pregunta eliminada con éxito.');
        } catch (\Throwable $th) {
            DB::rollback();
            return \Redirect::back()->with('error', 'Ocurrió un problema, vuelva a intentarlo más tarde.');
        }
    }

    public function preguntasCreate(Request $request)
    {
        $validated = $request->validate([
            'pregunta' => ['required', 'string', 'max:255'],
            'respuesta' => ['required', 'string'],
            'categoria' => ['required', 'numeric'],
        ]);
        try {
            DB::beginTransaction();
            $pregunta = new Question;
            $pregunta->question = $request->pregunta;
            $pregunta->answer = $request->respuesta;
            $pregunta->type = $request->categoria;
            $pregunta->save();
            DB::commit();
            return \Redirect::back()->with('success', 'Pregunta creada con éxito.');
        } catch (\Throwable $th) {
            DB::rollback();
            return \Redirect::back()->with('error', 'Ocurrió un problema, vuelva a intentarlo más tarde.');
        }
    }

    public function banners(Request $request)
    {
        if ($request->wantsJson()) {
            $banner = Banner::orderBy('created_at', 'desc')->first(['id', 'url', 'orden']);
            return $banner;
        }
        $banners = Banner::orderBy('orden', 'asc')->get(['id', 'url', 'orden']);

        return Inertia::render('Admin/Banners/Banners', ['banners' => $banners]);
    }

    public function newBanner(Request $request)
    {
        if ($request->file('foto')) {
            DB::beginTransaction();
            try {
                $file = request()->file('foto');
                $imageName = time() . '.' . $file->getClientOriginalExtension();
                $file->storeAs('banners', $imageName, 'public');
                $ultimo = Banner::orderBy('orden', 'desc')->first();
                $banner = new Banner();
                $banner->url = $imageName;
                $banner->orden = $ultimo->orden + 1;
                $banner->brand_id = 1;
                $banner->activo = 1;
                $banner->save();
                DB::commit();
                return redirect()->back()->with('success', 'Banner agregado con éxito!');
            } catch (\Throwable $th) {
                //throw $th;
                DB::rollBack();
                unlink(public_path('/img/carrousel/' . $imageName));
                return redirect()->back()->with('error', 'Ocurrió un error, por favor intentálo de nuevo.')->withErrors('eumiki');
            }
        }

        return redirect()->back()->with('error', 'Imágen no válida, intentálo de nuevo!')->withErrors('eu miki');
    }

    public function deleteBanner($id)
    {
        DB::beginTransaction();
        try {
            $banner = Banner::findOrFail($id);
            Storage::disk('public')->delete('banners/' . $banner->url);
            $banner->delete();
            DB::commit();
            return redirect()->back()->with('success', 'Banner borrado con éxito!');
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return redirect()->back()->with('error', 'Ocurrió un error, por favor intentálo de nuevo.')->withErrors('eumiki');
        }
    }

    public function updateBanner()
    {
        $banner = Banner::orderBy('orden', 'asc')->get(['id', 'url', 'orden']);
        return $banner;
    }

    public function ordenarBanner(Request $request)
    {
        DB::beginTransaction();
        try {
            $i = 1;
            foreach ($request->cards as $card) {
                $banner = Banner::findOrFail($card['id']);
                $banner->orden = $i;
                $banner->save();
                $i++;
            }
            DB::commit();
            return redirect()->back()->with('success', 'Banner ordenado con éxito!');
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return redirect()->back()->with('error', 'Ocurrió un error, por favor intentálo de nuevo.')->withErrors('eumiki');
        }
    }

    public function recetas(Request $request)
    {
        if ($request->busqueda) {
            $recetas = Recipe::where('recipes.nombre', 'like', '%' . $request->busqueda . '%')
                ->orWhere('imgs.descripcion', 'like', '%' . $request->busqueda . '%')
                ->join('imgs', 'recipes.id', '=', 'imgs.recipe_id')
                ->select('recipes.*', 'imgs.*')->orderBy('recipes.created_at', 'desc')->get();
        } else {
            $recetas = Recipe::join('imgs', 'recipes.id', '=', 'imgs.recipe_id')
                ->select('recipes.*', 'imgs.*')->orderBy('recipes.created_at', 'desc')->get();
        }

        return Inertia::render('Admin/Recetas/Recetas', [
            'recetas' => $recetas,
        ]);
    }

    public function receta($id)
    {
        $receta = Recipe::join('imgs', 'recipes.id', '=', 'imgs.recipe_id')
            ->select('recipes.*', 'imgs.*')->findOrFail($id);

        $productos = DB::table('product_recipe')
            ->join('products', 'product_recipe.product_id', '=', 'products.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.name', 'products.foto', 'products.id', 'products.uuid', 'categories.name as categoria')
            ->where('recipe_id', '=', $id)->get();

        return Inertia::render('Admin/Recetas/Receta', ['receta' => $receta, 'productos' => $productos]);
    }

    public function recetaEditar($id)
    {
        $receta = Recipe::join('imgs', 'recipes.id', '=', 'imgs.recipe_id')
            ->select('recipes.*', 'imgs.*')->findOrFail($id);

        $productos = DB::table('product_recipe')
            ->join('products', 'product_recipe.product_id', '=', 'products.id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.name', 'products.foto', 'products.id', 'products.uuid', 'categories.name as categoria')
            ->where('recipe_id', '=', $id)->get();

        return Inertia::render('Admin/Recetas/EditarReceta', ['receta' => $receta, 'productos' => $productos]);
    }

    public function recetasAgregar()
    {
        return Inertia::render('Admin/Recetas/AgregarReceta');
    }

    public function recetaEliminar($id){
        DB::beginTransaction();
        try {
            $receta = Recipe::findOrFail($id);
            // buscar y eliminar las imagenes y los productos
            DB::table('product_recipe')->where('recipe_id',$id)->delete();
            DB::table('imgs')->where('recipe_id',$id)->delete();

            $receta->delete();
            DB::commit();
            $status = "Receta eliminada con éxito";
            return redirect()->route('admin.recetas')->with('success','Receta actualizada con éxito.');
        } catch (\Throwable $th) {
            DB::rollBack();
            $status = "Hubo un problema al procesar tu solicitud. Inténtalo más tarde";
            return redirect()->route('admin.recetas')->with('error','Ocurrió un problema, vuelva a intentarlo más tarde.');
        }
    }
}
