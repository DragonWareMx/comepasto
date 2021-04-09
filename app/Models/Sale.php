<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    public function client(){
        return $this->belongsTo('App\Models\Client');
    }

    public function product(){
        return $this->belongsToMany('App\Models\Product');
    }
}
