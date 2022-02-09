<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Recipe;
use App\Models\Img;
use Illuminate\Support\Facades\DB;
use App\Models\Brand;
use App\Models\Type;
use App\Models\User;
use App\Models\Category;
use App\Models\Question;
use Illuminate\Support\Str;
use App\Models\Supplier;
use Illuminate\Support\Facades\Storage;
use Image;

class AdminController extends Controller
{

    public function __construct()
    {
        $this->middleware('soyadmin');
    }

    public function index(Request $request)
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
        $validated = $request->validate([
            'imgProducto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:51200',
            'fotos' => 'nullable',
            'fotos.*' => 'image|mimes:jpeg,png,jpg,gif|max:51200',
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
        $fotos = [];
        try {
            $product = Product::findOrFail($id);

            if($request->file('imgProducto')){
                Storage::delete('public/products/'.$product->foto);

                //guarda la foto
                $foto = $request->file('imgProducto')->store('public/products');
                $fileName = $request->file('imgProducto')->hashName();
                $product->foto = $fileName;

                $image = Image::make(Storage::get($foto));

                $image->resize(1280, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });

                Storage::put($foto, (string) $image->encode('jpg', 30));
            }

            //informacion
            $product->name = $request->nombre;
            $product->brand_id = $request->marca;
            $product->type_id = $request->tipo;
            $product->category_id = $request->categoria;
            $product->presentacion = $request->presentacion;
            $product->precio = $request->precio;
            $product->descuento = $request->descuento;
            $product->ingredientes = $request->ingredientes;
            $product->soyaFree = $request->soyaFree;
            $product->trigoFree = $request->trigoFree;

            $product->save();
            
            if($request->file('fotos')){
                //borra las fotos viejas
                foreach ($product->img()->get() as $img) {
                    Storage::delete('public/products/'.$img->url);
                    $img->delete();
                }

                //guarda las fotos
                foreach ($request->file('fotos') as $fotoS) {
                    $newImagen = new Img;
                    $newImagen->product_id = $product->id;

                    //guarda la foto
                    $fotoName = $fotoS->store('public/products');
                    $fileName = $fotoS->hashName();
                    $newImagen->url = $fileName;

                    $image = Image::make(Storage::get($foto));

                    $image->resize(1280, null, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });

                    Storage::put($foto, (string) $image->encode('jpg', 30));
                    
                    $newImagen->save();
    
                    array_push($fotos, $fotoName);
                }
            }

            DB::commit();

            //REDIRECCIONA A LA VISTA DE PRODUCTOS
            return \Redirect::route('admin.productos')->with('success', 'El producto ha sido registrado con éxito!');
        } catch (\Exception $e) {
            DB::rollBack();

            //si hay foto se elimina del servidor
            if ($foto) {
                Storage::delete($foto);
            }

            //si hay fotos se elimina del servidor
            if (sizeof($fotos) > 0) {
                foreach ($fotos as $fotoS) {
                    \Storage::delete($fotoS);
                }
            }

            return \Redirect::back()->with('error', 'Ha ocurrido un error al intentar registrar el producto, inténtelo más tarde.');
        }
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
            'fotos' => 'nullable',
            'fotos.*' => 'image|mimes:jpeg,png,jpg,gif|max:51200',
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
        $fotos = [];
        try {
            $newProduct = new Product;

            //guarda la foto
            $foto = $request->file('foto')->store('public/products');
            $fileName = $request->file('foto')->hashName();
            $newProduct->foto = $fileName;

            $image = Image::make(Storage::get($foto));

            $image->resize(1280, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });

            Storage::put($foto, (string) $image->encode('jpg', 30));

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

            //guarda las fotos
            if($request->file('fotos')){
                foreach ($request->file('fotos') as $fotoS) {
                    $newImagen = new Img;
                    $newImagen->product_id = $newProduct->id;

                    //guarda la foto
                    $fotoName = $fotoS->store('public/products');
                    $fileName = $fotoS->hashName();
                    $newImagen->url = $fileName;

                    $image = Image::make(Storage::get($foto));

                    $image->resize(1280, null, function ($constraint) {
                        $constraint->aspectRatio();
                        $constraint->upsize();
                    });

                    Storage::put($foto, (string) $image->encode('jpg', 30));
                    
                    $newImagen->save();
    
                    array_push($fotos, $fotoName);
                }
            }

            DB::commit();

            //REDIRECCIONA A LA VISTA DE PRODUCTOS
            return \Redirect::route('admin.productos')->with('success', 'El producto ha sido registrado con éxito!');
        } catch (\Exception $e) {
            DB::rollBack();

            //si hay foto se elimina del servidor
            if ($foto) {
                \Storage::delete($foto);
            }

            //si hay fotos se elimina del servidor
            if (sizeof($fotos) > 0) {
                foreach ($fotos as $fotoS) {
                    \Storage::delete($fotoS);
                }
            }
            dd($e);

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
            DB::rollback();
            return \Redirect::back()->with('error', 'Ocurrió un problema, vuelva a intentarlo más tarde.');
        }
    }

    public function pedidos(Request $request)
    {
        $pedidos = Sale::leftJoin('users', 'sales.client_id', '=', 'users.id')
            ->select('sales.id', 'sales.created_at as fecha', 'users.name as cliente', 'sales.total as total', 'tipo_entrega as entrega','sales.status', 'sales.costoEnvio', 'sales.formaPago')
            ->orderBy('id', 'DESC')
            ->when($request->deleted == "true", function ($query, $deleted) {
                return $query->onlyTrashed();
            })
            ->get();

        $total = $pedidos->count();

        $ganancias = Sale::sum('total');

        $pedidos_completados = Sale::where('status', 'entregado')->count();

        $pedidos_pendientes = Sale::where('status', '!=','entregado')->count();

        return Inertia::render('Admin/Pedidos/Pedidos', [
            'total' => $total,
            'ganancias' => $ganancias,
            'pedidos' => $pedidos,
            'pedidos_completados' => $pedidos_completados,
            'pedidos_pendientes' => $pedidos_pendientes,
        ]);
    }

    public function pedido($id)
    {
        $pedido = Sale::withTrashed()->with('client', 'product')
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
            DB::rollback();
            return \Redirect::back()->with('error', 'Ocurrió un problema, vuelva a intentarlo más tarde.');
        }
    }

    public function pedidoRestore($id)
    {
        DB::beginTransaction();
        try{
            $pedido = Sale::withTrashed()->find($id);

            if(!$pedido){
                DB::rollBack();
                return \Redirect::back()->with('error','Ha ocurrido un error al intentar restaurar el pedido, inténtelo más tarde.');
            }

            $pedido->restore();

            DB::commit();
            return \Redirect::back()->with('success','¡Pedido restaurado con éxito!');
            
        } catch (\Exception $e) {
            DB::rollBack();

            return \Redirect::back()->with('error','Ha ocurrido un error al intentar restaurar el pedido, inténtelo más tarde.');
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

        $productosBefore = DB::table('product_recipe')
            ->join('products', 'product_recipe.product_id', '=', 'products.id')
            ->select('products.name', 'products.foto', 'products.id', 'products.uuid')
            ->where('recipe_id', '=', $id)->get();

        $productos = Product::select('name', 'id')
            ->orderBy('name', 'asc')
            ->get();

        return Inertia::render('Admin/Recetas/EditarReceta', ['receta' => $receta, 'productosBefore' => $productosBefore, 'productos' => $productos]);
    }

    public function recetasAgregar()
    {
        $productos = Product::join('categories', 'products.category_id', '=', 'categories.id')
                    ->select('products.name', 'products.foto', 'products.id', 'products.uuid', 'categories.name as categoria')
                    ->orderBy('name', 'asc')
                    ->get();

        return Inertia::render('Admin/Recetas/AgregarReceta', ['productos' => $productos]);
    }

    public function recetasStore(Request $request){
        $validated = $request->validate([
            'foto' => ['nullable','image','mimes:jpeg,png,jpg,gif','max:51200'],
            'nombre' => ['required', 'max:250', 'regex:/^[A-Za-z0-9À-ÖØ-öø-ÿ_! \"#$%&\'()*+,\-.\\:\/;=?@^_]+$/'],
            'descripcion' => ['required', 'max:250', 'regex:/^[A-Za-z0-9À-ÖØ-öø-ÿ_! \"#$%&\'()*+,\-.\\:\/;=?@^_]+$/'],
            'link' => 'required|url',
            'ingredientes' => 'required',
            'productosSelect' => 'required',
        ]);

        //variables para comprobar la subida de archivos
        $NewImg = null; 

        //COMIENZA LA TRANSACCION
        DB::beginTransaction();

        try {
            
            $receta = new Recipe;

            $receta->nombre = $request->nombre;
            $receta->ingredientes = $request->ingredientes;
            $receta->preparacion = $request->preparacion;
            $receta->link = $request->link;

            $receta->save();

            // Guardar los productos seleccionados
            $i= 0;

            foreach ($request->productosSelect as $seleccionado){
                $producto = Product::where('name', $request->productosSelect[$i])->select('id')->first();
                $values = array('product_id' => $producto->id,'recipe_id' => $receta->id);
                DB::table('product_recipe')->insert($values);
                $i++;
            }

            $recetaImg = new Img;
            $recetaImg->recipe_id = $receta->id;
            $recetaImg->descripcion = $request->descripcion;
            
            if(!is_null($request->file('foto'))){
                
                // Cambiar el nombre de la img 
                // Guardar la img en el server
                // Guardar el url en la bd
                //guarda la foto
                    $NewImg = $request->file('foto')->store('public/recetas');
                    $recetaImg->url = $request->file('foto')->hashName();
            }
            
            $recetaImg->save();
            DB::commit();

        //REDIRECCIONA A LA VISTA DE RECETA
        return \Redirect::route('admin.recetas')->with('success', 'La receta ha sido creada con éxito!');
        } catch (\Exception $e) {
            DB::rollBack();
            if($NewImg)
                \Storage::delete($NewImg);

            return \Redirect::route('admin.recetas')->with('error', 'Ha ocurrido un error al intentar crear la receta, inténtelo más tarde.');
        }
    }

    public function recetaEliminar($id){
        DB::beginTransaction();
        try {
            $receta = Recipe::findOrFail($id);
            // buscar y eliminar las imagenes y los productos
            DB::table('product_recipe')->where('recipe_id',$id)->delete();
            $recetaImg = Img::where('recipe_id',$id)->first();
            \Storage::delete('public/recetas/'.$recetaImg->url);

            DB::table('imgs')->where('recipe_id',$id)->delete();

            $receta->delete();
            DB::commit();
            $status = "Receta eliminada con éxito";
            return redirect()->route('admin.recetas')->with('success','Receta eliminada con éxito.');
        } catch (\Throwable $th) {
            DB::rollBack();
            $status = "Hubo un problema al procesar tu solicitud. Inténtalo más tarde";
            return redirect()->route('admin.recetas')->with('error','Ocurrió un problema, vuelva a intentarlo más tarde.');
        }
    }

    public function storeCosa(Request $request){
        $validated = $request->validate([
            'nombre' => ['required', 'max:100', 'regex:/^[A-Za-z0-9À-ÖØ-öø-ÿ_! \"#$%&\'()*+,\-.\\:\/;=?@^_]+$/'],
            'cosa' => ['required','in:marca,categoria,tipo']
        ]);

        
        //COMIENZA LA TRANSACCION
        DB::beginTransaction();

        //variables para comprobar la subida de archivos
        $foto = null;

        try {
            if($request->cosa=='marca'){
                $validated = $request->validate([
                    'link' => 'required|url',
                    'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:51200',
                ]);
                $supplier= new Supplier();
                $supplier->nombre=$request->nombre;
                $supplier->responsable=\Auth::user()->email;
                $supplier->save();

                $brand= new Brand();
                $brand->name=$request->nombre;
                //guarda la foto
                $foto = $request->file('foto')->store('public/logos');
                $brand->logo = $request->file('foto')->hashName();
                $brand->supplier_id=$supplier->id;
                $brand->link=$request->link;
                $brand->save();

                DB::commit();
                return \Redirect::back()->with('success', 'Marca agregada con éxito.');
            }
            else if($request->cosa=='tipo'){
                $type=new Type();
                $type->name=$request->nombre;
                $type->save();

                DB::commit();
                return \Redirect::back()->with('success', 'Tipo agregado con éxito.');
            }
            else{
                $validated = $request->validate([
                    'foto' => 'required|image|mimes:png|max:51200',
                ]);
                $category=new Category();
                $category->name=strtoupper($request->nombre);

                $foto = $request->file('foto')->store('public/categories');
                $category->icono = $request->file('foto')->hashName();
                $category->save();

                DB::commit();
                return \Redirect::back()->with('success', 'Categoría agregada con éxito.');
            }
        } catch (\Exception $e) {
            DB::rollBack();
            //si hay foto se elimina del servidor
            if ($foto) {
                \Storage::delete($foto);
            }

            return \Redirect::back()->with('error', 'Ha ocurrido un error, inténtelo más tarde, el formato de la imagen debe ser PNG.');
        }
    }

    public function recetaPatch(Request $request, $id){
        $validated = $request->validate([
            'foto' => ['nullable','image','mimes:jpeg,png,jpg,gif','max:51200'],
            'nombre' => ['required', 'max:250', 'regex:/^[A-Za-z0-9À-ÖØ-öø-ÿ_! \"#$%&\'()*+,\-.\\:\/;=?@^_]+$/'],
            'descripcion' => ['required', 'max:250', 'regex:/^[A-Za-z0-9À-ÖØ-öø-ÿ_! \"#$%&\'()*+,\-.\\:\/;=?@^_]+$/'],
            'link' => 'required|url',
            'ingredientes' => 'required',
            'productosSelect' => 'required',
        ]);

        //variables para comprobar la subida de archivos
        $NewImg = null; 

        //COMIENZA LA TRANSACCION
        DB::beginTransaction();

        try {
            
            $receta = Recipe::findOrFail($id);

            $receta->nombre = $request->nombre;
            $receta->ingredientes = $request->ingredientes;
            $receta->preparacion = $request->preparacion;
            $receta->link = $request->link;

            $receta->save();
            
            $productosBefore = DB::table('product_recipe')
                ->join('products', 'product_recipe.product_id', '=', 'products.id')
                ->select('products.name', 'products.id', 'product_recipe.id as idRP')
                ->where('recipe_id', '=', $id)->get();
            $i= 0;
            $crearNuevo;

            // Aqui se añaden si no existian
            foreach ($request->productosSelect as $seleccionado){
                $crearNuevo=true;
                $productoNew = Product::where('name', $seleccionado)->select('id')->first();
                foreach ($productosBefore as $before){
                    if($productoNew->id == $before->id){
                        // dd($crearNuevo, $productoNew, $before);
                        $crearNuevo=false;
                    }
                }
                
                if($crearNuevo == true){
                    $values = array('product_id' => $productoNew->id,'recipe_id' => $id);
                    DB::table('product_recipe')->insert($values);
                }
                $i++;
            }
            // Aqui se eliminan los que se deseleccionaron
            $i= 0;
            $eliminar;
            foreach ($productosBefore as $before){
                $eliminar=true;
                foreach ($request->productosSelect as $seleccionado){
                    $productoNew = Product::where('name', $seleccionado)->select('id')->first();
                    
                    if($before->id == $productoNew->id){
                        $eliminar=false;
                    }
                }
                
                // borrado
                if($eliminar == true){
                     $productoBorrar = DB::table('product_recipe')->where('recipe_id',$id)->where('product_id',$before->id)->delete();
                }
                $i++;
            }


            $recetaImg = Img::where('recipe_id',$id)->first();
            $recetaImg->descripcion = $request->descripcion;
            
            if(!is_null($request->file('foto'))){
                
                // Eliminar la foto del servidor
                // Cambiar el nombre de la img con carbon?
                // Guardar la img en el server
                // Guardar el url en la bd
                //guarda la foto
                    \Storage::delete('public/recetas/'.$recetaImg->url);
                    $NewImg = $request->file('foto')->store('public/recetas');
                    $recetaImg->url = $request->file('foto')->hashName();
                
            }

            $recetaImg->save();
            DB::commit();

        //REDIRECCIONA A LA VISTA DE RECETA
        return \Redirect::route('admin.receta',$id)->with('success', 'La receta ha sido actualizada con éxito!');
        } catch (\Exception $e) {
            DB::rollBack();
            if($NewImg)
                \Storage::delete($NewImg);

            return \Redirect::route('admin.receta',$id)->with('error', 'Ha ocurrido un error al intentar actualizar la receta, inténtelo más tarde.');
        }
    }
}
