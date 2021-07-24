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
Auth::routes();
// Route::post('login', 'App\Http\Controllers\Auth\LoginController@login');
// Route::post('logout', 'Auth\LoginController@logout')->name('logout');

// Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
// Route::post('register', 'Auth\RegisterController@register');

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

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
Route::get('/mispagos', [App\Http\Controllers\CuentaController::class, 'misPagos'])->name('misPagos');