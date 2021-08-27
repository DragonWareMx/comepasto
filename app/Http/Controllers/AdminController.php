<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; 

class AdminController extends Controller
{
    public function index(){
        return Inertia::render('Admin/Productos');
    }

    public function producto($id){
        return Inertia::render('Admin/Producto');
    }

    public function productoEditar($id){
        return Inertia::render('Admin/EditarProducto');
    }

    public function pedidos(){
        return Inertia::render('Admin/Pedidos');
    }
}
