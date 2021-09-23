<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    public function product(){
        return $this->belongsToMany('App\Models\Product');
    }

    public function img(){
        return $this->hasMany('App\Models\Img');
    }
}
