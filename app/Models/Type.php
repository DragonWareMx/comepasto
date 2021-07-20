<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    use HasFactory;
    public function type(){
        return $this->hasMany('App\Models\Type');
    }

    public function products(){
        return $this->hasMany('App\Models\Product');
    }
}
