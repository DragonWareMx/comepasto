<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    public function brand(){
        return $this->belongsTo('App\Models\Brand');
    }

    
    public function category(){
        return $this->belongsTo('App\Models\Category');
    }

    public function Type(){
        return $this->belongsTo('App\Models\Type');
    }
    
    public function buy(){
        return $this->belongsToMany('App\Models\Buy');
    }

    
    public function sale(){
        return $this->belongsToMany('App\Models\Sale');
    }

    
}
