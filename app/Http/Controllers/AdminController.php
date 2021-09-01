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

    public function pedidosAgregar(){
        return Inertia::render('Admin/Pedidos/AgregarPedido');
    }

    public function clientes(){
        return Inertia::render('Admin/Clientes/Clientes');
    }

    public function cliente(){
        return Inertia::render('Admin/Clientes/Cliente');
    }

    public function preguntas(){
        return Inertia::render('Admin/Preguntas/Preguntas');
    }
}
