<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_user', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('user_id');
            $table->enum('estatus',['ready','standby','onwatching']); //ready: el producto aparece en lista para dar 
                                                                    //pagar. Standby: está en lista de espera, 
                                                                    //es como el "guardar para después" de Amazón.
                                                                    //onwatching: lo tienen en la mira nomás LOL.
            $table->unsignedInteger('cantidad');


            $table->foreign('product_id')->references('id')->on('products');
            $table->foreign('user_id')->references('id')->on('users');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_user');
        
    }
}
