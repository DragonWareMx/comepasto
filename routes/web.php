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