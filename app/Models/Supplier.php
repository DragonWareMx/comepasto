<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;
    public function brand(){
        return $this->hasMany('App\Models\Brand');
    }
    public function buy(){
        return $this->hasMany('App\Models\Buy');
    }
}
