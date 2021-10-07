<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->timestamps();
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('type_id');
            $table->unsignedBigInteger('brand_id');
            // $table->unsignedDecimal('costo');
            $table->unsignedDecimal('precio');
            $table->unsignedBigInteger('stock')->default(0);
            $table->string('name',100);
            $table->text('ingredientes')->nullable();
            $table->string('presentacion',250)->nullable();
            $table->text('descripcion')->nullable();
            $table->boolean('soyaFree')->default(False);
            $table->boolean('trigoFree')->default(False);
            $table->text('tablaNutri')->nullable();
            $table->unsignedDecimal('descuento', 5, 2)->default(0.0);
            $table->string('foto',250);

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('type_id')->references('id')->on('types')->onDelete('cascade');
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('cascade');

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
