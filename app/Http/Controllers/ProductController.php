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
        $products = Product::with('brand:id,name,logo,link')
                            ->when($request->categoria, function ($query, $categoria) {
                                switch ($categoria) {
                                    case 'SIN SOYA':
                                        return $query->where('products.soyaFree', true)->select('products.name','products.foto','products.precio','products.brand_id','products.id','products.descuento', 'products.trigoFree', 'products.soyaFree');
                                        break;
                                    case 'SIN GLUTEN':
                                            return $query->where('products.trigoFree', true)->select('products.name','products.foto','products.precio','products.brand_id','products.id','products.descuento', 'products.trigoFree', 'products.soyaFree');
                                            break;
                                    case 'DESTACADOS':
                                        return $query
                                                ->leftJoin('product_sale', 'products.id', '=', 'product_sale.product_id')
                                                ->selectRaw('products.name, products.foto, products.precio, products.brand_id, products.id, products.descuento, products.trigoFree, products.soyaFree, COALESCE(sum(product_sale.cantidad),0) total')
                                                ->groupBy('products.name','products.foto','products.precio','products.brand_id','products.id','products.descuento', 'products.trigoFree', 'products.soyaFree')
                                                ->orderBy('total','desc');
                                        break;
                                    
                                    default:
                                        return $query->whereHas('category', function ($query) use($categoria) {
                                            $query->where('categories.name', 'like', '%'. $categoria .'%');
                                        })->select('products.name','products.foto','products.precio','products.brand_id','products.id','products.descuento', 'products.trigoFree', 'products.soyaFree');
                                        break;
                                }
                                return $query;
                            }, function ($query) {
                                return $query
                                ->leftJoin('product_sale', 'products.id', '=', 'product_sale.product_id')
                                ->selectRaw('products.name, products.foto, products.precio, products.brand_id, products.id, products.descuento, products.trigoFree, products.soyaFree, COALESCE(sum(product_sale.cantidad),0) total')
                                ->groupBy('products.name','products.foto','products.precio','products.brand_id','products.id','products.descuento', 'products.trigoFree', 'products.soyaFree')
                                ->orderBy('total','desc');
                            })
                            ->when($request->order, function ($query, $order) {
                                switch ($order) {
                                    case '':
                                        return $query->orderBy('products.precio','ASC');
                                        break;
                                    case 'descp':
                                            return $query->orderBy('products.precio','DESC');
                                            break;
                                    case 'descn':
                                        return $query->orderBy('products.name','DESC');
                                        break;
                                    case 'ascn':
                                        return $query->orderBy('products.name','ASC');
                                        break;
                                    
                                    default:
                                        return $query->orderBy('products.precio','ASC');
                                        break;
                                }
                                return $query->orderBy('products.precio','ASC');
                            }, function ($query) {
                                //dd($query->orderBy(\DB::raw("`products`.`precio` - `products`.`precio`*(`products`.`descuento`/100)"),'ASC')->toSql());
                                return $query->orderBy(\DB::raw("`products`.`precio` - `products`.`precio`*(`products`.`descuento`/100)"),'ASC');
                            })
                            ->where('stock','>',0)
                            ->paginate(8)
                            ->withQueryString();

        $categories = Category::get(['id','name','icono']);

        return Inertia::render('Products/Products',[
            'products' => $products,
            'categories' => $categories,
            'request' => $request
        ]);
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
