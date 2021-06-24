<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    public function product(){
        return $this->hasMany('App\Models\Product');
    }

    public function supplier(){
        return $this->belongsTo('App\Models\Supplier');
    }

    // public function product(){
    //     return $this->hasMany('App\Models\Banner');
    // }
}
