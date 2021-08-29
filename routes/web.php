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
Route::get('/direcciones', [App\Http\Controllers\CuentaController::class, 'direcciones'])->name('direcciones');
Route::get('/direcciones/agregar', [App\Http\Controllers\CuentaController::class, 'direccionesAdd'])->name('direcciones.agregar');
Route::get('/direcciones/editar/{id}', [App\Http\Controllers\CuentaController::class, 'direccionesEdit'])->name('direcciones.editar');
Route::get('/mispagos', [App\Http\Controllers\CuentaController::class, 'misPagos'])->name('misPagos');

// ADMIN ---------
Route::get('/admin/productos', [App\Http\Controllers\AdminController::class, 'index'])->name('admin.productos');
Route::get('/admin/productos/{id}', [App\Http\Controllers\AdminController::class, 'producto'])->name('admin.producto');
Route::get('/admin/productos/editar/{id}', [App\Http\Controllers\AdminController::class, 'productoEditar'])->name('admin.producto.editar');

Route::get('/admin/pedidos', [App\Http\Controllers\AdminController::class, 'pedidos'])->name('admin.pedidos');
Route::get('/admin/pedidos/{id}', [App\Http\Controllers\AdminController::class, 'pedido'])->name('admin.pedido');