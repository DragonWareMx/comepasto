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
            $table->timestamps();
            $table->unsignedBigInteger('categoryId');
            $table->unsignedBigInteger('typeId');
            $table->unsignedBigInteger('brandId');
            $table->unsignedDecimal('costo');
            $table->unsignedDecimal('precio');
            $table->unsignedBigInteger('stock');
            $table->string('name',100);
            $table->text('ingredientes')->nullable();
            $table->string('presentacion',250)->nullable();
            $table->text('descripcion')->nullable();
            $table->boolean('soyaFree')->default(False);
            $table->boolean('trigoFree')->default(False);
            $table->text('tablaNutri')->nullable();
            $table->unsignedDecimal('descuento')->default(0.0);
            $table->string('foto',250);

            $table->foreign('categoryId')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('typeId')->references('id')->on('types')->onDelete('cascade');
            $table->foreign('brandId')->references('id')->on('brands')->onDelete('cascade');

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
