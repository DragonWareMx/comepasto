<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('inicio');
});
Route::get('/menu', function () {
    return view('menu');
});

Route::get('/inertia', function () {
    return Inertia::render('Ejemplo');
});

Route::get('/terminos-y-condiciones', function () {
    return Inertia::render('Terminos');
});

Route::get('/politica-y-privacidad', function () {
    return Inertia::render('Politica');
});

// RUTAS DE AUTH
//Auth::routes();
Route::post('login', [App\Http\Controllers\Auth\LoginController::class, 'login']);
Route::post('logout', [App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');

Route::post('register',  [App\Http\Controllers\Auth\RegisterController::class, 'register'])->name('register');

Route::post('password/email', [App\Http\Controllers\Auth\ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
Route::get('password/reset/{token}', [App\Http\Controllers\Auth\ResetPasswordController::class, 'showResetForm'])->name('password.reset');
Route::post('password/reset', [App\Http\Controllers\Auth\ResetPasswordController::class, 'reset'])->name('password.update');

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

//PAGOS
Route::post('/cotizar', [App\Http\Controllers\PaymentController::class, 'cotizar'])->name('cotizar');
Route::post('/payment', [App\Http\Controllers\PaymentController::class, 'payment'])->name('payment');
Route::get('/payment/stripe', [App\Http\Controllers\PaymentController::class, 'stripe'])->name('stripe.index');
Route::post('/payment/stripe/pay', [App\Http\Controllers\PaymentController::class, 'stripePay'])->name('stripe.pay');
Route::get('/payment/gracias/{id}', [App\Http\Controllers\PaymentController::class, 'showGreetings'])->name('gracias');
Route::get('/payment/paypal', [App\Http\Controllers\PaypalController::class, 'status'])->name('paypal.payment');

// Route::get('/payment/test', [App\Http\Controllers\PaymentController::class, 'mandarCorreo']);


//INICIO
Route::get('/inicio', [App\Http\Controllers\Controller::class, 'inicio'])->name('inicio');

Route::get('/quienessomos', [App\Http\Controllers\quienesSomosController::class, 'index'])->name('quienesSomos');

// RECETAS
Route::get('/recetas', [App\Http\Controllers\recetasController::class, 'index'])->name('recetas');
Route::get('/recetas/{id}', [App\Http\Controllers\recetasController::class, 'verReceta'])->name('ver-receta');

Route::name('cart.')->group(function () {
    //agrega al carrito
    Route::post('/producto/{id}', [App\Http\Controllers\CartController::class, 'store'])->name('store');
    Route::patch('/producto/{id}', [App\Http\Controllers\CartController::class, 'update'])->name('update');
    Route::post('/recetaCarrito/{id}', [App\Http\Controllers\CartController::class, 'recipe'])->name('recipe');
});

//PRODUCTO
Route::get('/producto/{id}', [App\Http\Controllers\ProductController::class, 'show'])->name('product.show');

// PREGUNTAS
Route::get('/preguntas', [App\Http\Controllers\QuestionController::class, 'preguntas'])->name('preguntas');

// CUENTA-----
Route::get('/cuenta', [App\Http\Controllers\CuentaController::class, 'index'])->name('cuenta');
Route::get('/mispedidos', [App\Http\Controllers\CuentaController::class, 'misPedidos'])->name('misPedidos');
Route::get('/informacion', [App\Http\Controllers\CuentaController::class, 'informacion'])->name('informacion');
Route::post('/informacion/editar', [App\Http\Controllers\CuentaController::class, 'infoEdit'])->name('informacion.editar');
Route::get('/direcciones', [App\Http\Controllers\CuentaController::class, 'direcciones'])->name('direcciones');
Route::get('/direcciones/agregar', [App\Http\Controllers\CuentaController::class, 'direccionesAdd'])->name('direcciones.agregar');
Route::get('/direcciones/editar/{id}', [App\Http\Controllers\CuentaController::class, 'direccionesEdit'])->name('direcciones.editar');
Route::get('/mispagos', [App\Http\Controllers\CuentaController::class, 'misPagos'])->name('misPagos');

// ADMIN ---------
Route::get('/admin', [App\Http\Controllers\AdminController::class, 'index'])->name('admin.productos');
Route::get('/admin/productos/{id}', [App\Http\Controllers\AdminController::class, 'producto'])->name('admin.producto');
Route::delete('/admin/productos/{id}', [App\Http\Controllers\AdminController::class, 'productoDelete'])->name('admin.producto.delete');
Route::put('/admin/productos/{id}/restore', [App\Http\Controllers\AdminController::class, 'productoRestore'])->name('admin.producto.restore');
Route::get('/admin/productos/editar/{id}', [App\Http\Controllers\AdminController::class, 'productoEditar'])->name('admin.producto.editar');
Route::get('/admin/productos-agregar', [App\Http\Controllers\AdminController::class, 'productoAgregar'])->name('admin.producto.agregar');
Route::post('/admin/productos-agregar', [App\Http\Controllers\AdminController::class, 'storeProducto'])->name('admin.producto.store');
Route::post('/admin/productos/{id}/inventario', [App\Http\Controllers\AdminController::class, 'productoInventario'])->name('admin.producto.inventario');
Route::post('/admin/productos/patch/{id}', [App\Http\Controllers\AdminController::class, 'productoPatch'])->name('admin.producto.patch');
Route::post('/admin/cosa/store', [App\Http\Controllers\AdminController::class, 'storeCosa'])->name('admin.cosa.store');

Route::get('/admin/pedidos', [App\Http\Controllers\AdminController::class, 'pedidos'])->name('admin.pedidos');
Route::get('/admin/pedidos/{id}', [App\Http\Controllers\AdminController::class, 'pedido'])->name('admin.pedido');
Route::get('/admin/pedidos-agregar', [App\Http\Controllers\AdminController::class, 'pedidosAgregar'])->name('admin.pedidos.agregar');
Route::patch('/admin/pedidos/{id}/estatus', [App\Http\Controllers\AdminController::class, 'pedidoEstatus'])->name('admin.pedido.patch');
Route::patch('/admin/pedidos/{id}/pagado', [App\Http\Controllers\AdminController::class, 'pedidoPagado'])->name('admin.pedido.pagado');
Route::delete('/admin/pedidos/{id}/delete', [App\Http\Controllers\AdminController::class, 'pedidoDelete'])->name('admin.pedido.delete');
Route::put('/admin/pedidos/{id}/restore', [App\Http\Controllers\AdminController::class, 'pedidoRestore'])->name('admin.pedido.restore');

Route::get('/admin/clientes', [App\Http\Controllers\AdminController::class, 'clientes'])->name('admin.clientes');
Route::get('/admin/clientes/{id}', [App\Http\Controllers\AdminController::class, 'cliente'])->name('admin.cliente');

Route::get('/admin/preguntas', [App\Http\Controllers\AdminController::class, 'preguntas'])->name('admin.preguntas');
Route::post('/admin/preguntas/eliminar/{id}', [App\Http\Controllers\AdminController::class, 'preguntasEliminar'])->name('admin.preguntas.eliminar');
Route::post('/admin/preguntas/create', [App\Http\Controllers\AdminController::class, 'preguntasCreate'])->name('admin.preguntas.create');

Route::get('/admin/banners', [App\Http\Controllers\AdminController::class, 'banners'])->name('admin.banners');
Route::post('/admin/banners', [App\Http\Controllers\AdminController::class, 'newBanner'])->name('admin.banners.new');
Route::post('/admin/banners/ordenar', [App\Http\Controllers\AdminController::class, 'ordenarBanner'])->name('admin.banners.ordenar');
Route::delete('/admin/banners/eliminar/{id}', [App\Http\Controllers\AdminController::class, 'deleteBanner'])->name('admin.banners.delete');
Route::post('/admin/banners/recienborrados', [App\Http\Controllers\AdminController::class, 'updateBanner'])->name('admin.banners.update');

Route::get('/admin/recetas', [App\Http\Controllers\AdminController::class, 'recetas'])->name('admin.recetas');
Route::get('/admin/recetas/{id}', [App\Http\Controllers\AdminController::class, 'receta'])->name('admin.receta');
Route::get('/admin/recetas/editar/{id}', [App\Http\Controllers\AdminController::class, 'recetaEditar'])->name('admin.receta.editar');
Route::post('/admin/recetas/editar/{id}', [App\Http\Controllers\AdminController::class, 'recetaPatch'])->name('admin.receta.patch');
Route::get('/admin/recetas-agregar', [App\Http\Controllers\AdminController::class, 'recetasAgregar'])->name('admin.recetas.agregar');
Route::post('/admin/recetas-agregar', [App\Http\Controllers\AdminController::class, 'recetasStore'])->name('admin.recetas.agregar.store');
Route::delete('/admin/recetas/eliminar/{id}', [App\Http\Controllers\AdminController::class, 'recetaEliminar'])->name('admin.receta.eliminar');

