<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class CuentaController extends Controller
{
    public function index()
    {
        if (Auth::guest()) {
            return redirect()->route('inicio')->with('info', 'Por favor primero inicia sesión.');
        }
        return Inertia::render('Cuenta/Cuenta');
    }

    public function misPedidos()
    {
        if (Auth::guest()) {
            return redirect()->route('inicio')->with('info', 'Por favor primero inicia sesión.');
        }
        $compras = Sale::with('product')->where('client_id', '=', Auth::id())->orderBy('created_at', 'DESC')->get();
        return Inertia::render('Cuenta/MisPedidos', ['compras' => $compras]);
    }

    public function informacion()
    {
        if (Auth::guest()) {
            return redirect()->route('inicio')->with('info', 'Por favor primero inicia sesión.');
        }
        return Inertia::render('Cuenta/Informacion');
    }

    public function infoEdit(Request $request)
    {
        //dd($request->all());
        if ($request->password) {
            $validated = $request->validate([
                'correo' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . Auth::id()],
                'password' => ['required', 'string', 'min:8', 'confirmed'],
                'telefono' => ['required', 'numeric', 'digits: 10', 'unique:users,tel,' . Auth::id()],
                'nombre' => ['required', 'string', 'max:255'],
            ]);
        } else {
            $validated = $request->validate([
                'correo' => ['required', 'string', 'email', 'max:255', 'unique:users,email,' . Auth::id()],
                'telefono' => ['required', 'numeric', 'digits: 10', 'unique:users,tel,' . Auth::id()],
                'nombre' => ['required', 'string', 'max:255'],
            ]);
        }
        DB::beginTransaction();
        try {
            $usuario = User::findOrFail(Auth::id());
            $usuario->email = $request->correo;
            $usuario->tel = $request->telefono;
            $usuario->name = $request->nombre;
            if ($request->password) {
                $usuario->password = Hash::make($request->password);
            }
            $usuario->save();

            DB::commit();
            return redirect()->back()->with('success', 'Tu información se ha actualizado correctamente.');
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return redirect()->back()->with('error', 'Ocurrió un error inesperado, intentalo más tarde.');
        }
    }

    public function direcciones()
    {
        return Inertia::render('Cuenta/Direcciones');
    }

    public function direccionesAdd()
    {
        return Inertia::render('Cuenta/Direcciones/AgregarDireccion');
    }

    public function direccionesEdit($id)
    {
        return Inertia::render('Cuenta/Direcciones/EditarDireccion');
    }

    public function misPagos()
    {
        return Inertia::render('Cuenta/MisPagos');
    }
}