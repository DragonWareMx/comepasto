<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;

    public function brand(){
        return $this->belongsTo('App\Models\Brand');
    }

    
    public function category(){
        return $this->belongsTo('App\Models\Category');
    }

    public function type(){
        return $this->belongsTo('App\Models\Type');
    }
    
    public function buy(){
        return $this->belongsToMany('App\Models\Buy');
    }

    
    public function sales(){
        return $this->belongsToMany('App\Models\Sale');
    }

    public function recipe(){
        return $this->belongsToMany('App\Models\Recipe');
    }
    
    public function img(){
        return $this->hasMany('App\Models\Img');
    }

    public function user(){
        return $this->belongsToMany('App\Models\User')->withTimestamps();
    }
}
