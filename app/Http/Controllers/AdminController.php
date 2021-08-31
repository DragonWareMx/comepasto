<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; 

class AdminController extends Controller
{
    public function index(){
        return Inertia::render('Admin/Productos/Productos');
    }

    public function producto($id){
        return Inertia::render('Admin/Productos/Producto');
    }

    public function productoEditar($id){
        return Inertia::render('Admin/Productos/EditarProducto');
    }

    public function productoAgregar(){
        return Inertia::render('Admin/Productos/AgregarProducto');
    }

    public function pedidos(){
        return Inertia::render('Admin/Pedidos/Pedidos');
    }

    public function pedido($id){
        return Inertia::render('Admin/Pedidos/Pedido');
    }
}
