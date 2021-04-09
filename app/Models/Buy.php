<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buy extends Model
{
    use HasFactory;

    public function supplier(){
        return $this->belongsTo('App\Models\Supplier');
    }

    public function product(){
        return $this->belongsToMany('App\Models\Product');
    }
    

}
