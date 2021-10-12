<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SoyAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::guest()) {
            return redirect()->route('inicio')->with('info', 'Por favor primero inicia sesión.');
        } else {
            if (Auth::user()->rol == 'admin') {
                return $next($request);
            } else {
                return redirect()->route('inicio')->with('info', 'No estás autorizado para entrar ahí');
            }
        }
    }
}