<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sale extends Model
{
    use HasFactory;
    use SoftDeletes;

    public function client()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function product()
    {
        return $this->belongsToMany('App\Models\Product')->withPivot('precio', 'descuento', 'cantidad');
    }
}