<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Question;

class QuestionController extends Controller
{
    public function preguntas(){
        $questions=Question::where('type','producto')->get();
        return Inertia::render('Preguntas',
        [
            'questions'=>$questions
        ]);
    }
}
