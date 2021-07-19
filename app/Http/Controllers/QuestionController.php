<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Question;

class QuestionController extends Controller
{
    public function preguntas(Request $request){

        //Vemos si existe la pregunta
        if($request->pregunta){
            $pregunta=$request->pregunta;
        }
        else{
            $pregunta='';
        }

        //Vemos si existe el tipo
        if($request->tipo){
            if($request->tipo != 'productos' && $request->tipo != 'pagos' && $request->tipo !='envios')
                $request->tipo = 'productos';
            $tipo=$request->tipo;
        }
        else{
            $tipo='productos';
        }

        //obtenemos las preguntas que coinciden con la búsqueda
        $questions=Question::where('type',$tipo)
        ->where(function ($query) use ($pregunta) {
            $query->where('question', 'like', '%'.$pregunta.'%')
                  ->orWhere('answer', 'like', '%'.$pregunta.'%');
        })->get();

        return Inertia::render('Preguntas',
        [
            'questions'=>$questions,
            'tipo'=>$tipo,
            'pregunta'=>$pregunta,
        ]);
    }
}
