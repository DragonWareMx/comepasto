<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Banner;
use App\Models\Category;
use App\Models\Product;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function inicio(Request $request)
    {
        $banners = Banner::where('activo', 1)->orderBy('orden', 'asc')->get();

        //TIENDA
        $products = Product::with('brand:id,name,logo,link')
            ->leftJoin('product_sale', 'products.id', '=', 'product_sale.product_id')
            // ->leftJoin('categories', 'categories.id', '=', 'products.category_id')
            // ->leftJoin('types', 'types.id', '=', 'products.type_id')
            // ->leftJoin('brands', 'brands.id', '=', 'products.brand_id')
            ->selectRaw('products.name, products.foto, products.precio, products.brand_id, products.id, products.descuento, products.trigoFree, products.soyaFree, products.uuid, products.stock, COALESCE(sum(product_sale.cantidad),0) total, (`products`.`precio` - `products`.`precio`*(`products`.`descuento`/100)) AS precio_descuento')
            ->groupBy('products.name', 'products.foto', 'products.precio', 'products.brand_id', 'products.id', 'products.descuento', 'products.trigoFree', 'products.soyaFree', 'products.uuid', 'products.stock')
            ->when($request->categoria, function ($query, $categoria) {
                switch ($categoria) {
                    case 'SIN SOYA':
                        return $query->where('products.soyaFree', true);
                        break;
                    case 'SIN GLUTEN':
                        return $query->where('products.trigoFree', true);
                        break;
                    case 'DESTACADOS':
                        return $query;
                        break;

                    default:
                        return $query->whereHas('category', function ($query) use ($categoria) {
                            $query->where('categories.name', 'like', '%' . $categoria . '%');
                        });
                        break;
                }
                return $query;
            }, function ($query) {
                return $query;
            })
            ->when($request->order, function ($query, $order) {
                switch ($order) {
                    case '':
                        return $query->orderBy('total', 'desc');
                        break;
                    case 'ascp':
                        return $query->orderBy('precio_descuento', 'ASC');
                        break;
                    case 'descp':
                        return $query->orderBy('precio_descuento', 'DESC');
                        break;
                    case 'descn':
                        return $query->orderBy('products.name', 'DESC');
                        break;
                    case 'ascn':
                        return $query->orderBy('products.name', 'ASC');
                        break;

                    default:
                        return $query->orderBy('total', 'desc');
                        break;
                }
                return $query->orderBy('total', 'desc');
            }, function ($query) {
                return $query->orderBy('total', 'desc');
            })
            ->when($request->filter, function ($query, $filter) use ($request) {
                //el filtro depende de la categoria
                switch ($request->categoria) {
                    case 'SIN SOYA':
                        //las opciones son:
                        //SIN GLUTEN
                        //CUALQUIER OTRA CATEGORIA
                        if ($filter == 'sg')
                            return $query->where('products.trigoFree', true);

                        //si no es sg entonces es una cetogria

                        //verifica que exista la categoria
                        $bCategoria = Category::where('name', $filter)->first('id');

                        if ($bCategoria) {
                            return $query->whereHas('category', function ($query) use ($filter) {
                                $query->where('categories.name', 'like', '%' . $filter . '%');
                            });
                        }

                        //si no existe se ignora el filtro
                        return $query;
                        break;
                    case 'SIN GLUTEN':
                        //las opciones son:
                        //SIN SOYA
                        //CUALQUIER OTRA CATEGORIA
                        if ($filter == 'ss')
                            return $query->where('products.soyaFree', true);

                        //si no es sg entonces es una cetogria

                        //verifica que exista la categoria
                        $bCategoria = Category::where('name', $filter)->first('id');

                        if ($bCategoria) {
                            return $query->whereHas('category', function ($query) use ($filter) {
                                $query->where('categories.name', 'like', '%' . $filter . '%');
                            });
                        }

                        //si no existe se ignora el filtro
                        return $query;
                        break;

                    default:
                        //las opciones son
                        //SIN SOYA
                        //SIN GLUYEN
                        //SIN SOYA Y SIN GLUTEN
                        switch ($filter) {
                            case 'ss':
                                return $query->where('products.soyaFree', true);
                                break;
                            case 'sg':
                                return $query->where('products.trigoFree', true);
                                break;
                            case 'sssg':
                                return $query->where('products.soyaFree', true)
                                    ->where('products.trigoFree', true);
                                break;

                            default:
                                //si no es ninguna opcion se ignora el filtro
                                return $query;
                                break;
                        }
                        return $query;
                        break;
                }
                return $query;
            }, function ($query) {
                return $query;
            })
            //cuando hay busqueda
            ->when($request->busqueda, function ($query, $busqueda) use ($request) {
                //se separa la busqueda por palabras
                $searchValues = preg_split('/\s+/', $busqueda, -1, PREG_SPLIT_NO_EMPTY);

                $query->where(function ($q) use ($searchValues) {
                    foreach ($searchValues as $value) {
                        $pos = strpos($value, 'sin');

                        $q->orWhere('products.name', 'LIKE', '%' . $value . '%')
                            ->orWhereHas('category', function ($query) use ($value) {
                                $query->where('name', 'LIKE', '%' . $value . '%');
                            })
                            ->orWhereHas('type', function ($query) use ($value) {
                                $query->where('name', 'LIKE', '%' . $value . '%');
                            })
                            ->orWhereHas('brand', function ($query) use ($value) {
                                $query->where('name', 'LIKE', '%' . $value . '%');
                            });
                    }
                });
            })
            ->when(stripos($request->busqueda, 'sin') !== false || stripos($request->busqueda, 'no') !== false, function ($querySin) use ($request) {
                if (stripos($request->busqueda, 'soya') !== false) {
                    return $querySin->where('soyaFree', true);
                }
                if (stripos($request->busqueda, 'gluten') !== false || stripos($request->busqueda, 'trigo') !== false || stripos($request->busqueda, 'glúten') !== false) {
                    return $querySin->where('trigoFree', true);
                }
            })
            ->paginate(8)
            ->withQueryString();

        $categories = Category::get(['id', 'name', 'icono']);

        return Inertia::render('Inicio', [
            'banners' => $banners,
            'products' => fn () => $products,
            'categories' => fn () => $categories,
            'request' => fn () => $request,
        ]);
    }
}