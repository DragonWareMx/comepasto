<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('client_id')->nullable();
            $table->unsignedDecimal('costoProducto');
            $table->unsignedDecimal('costoEnvio');
            $table->enum('formaPago', ['paypal', 'stripe', 'efectivo', 'transferencia']);
            $table->unsignedDecimal('total');
            $table->unsignedDecimal('descuento')->default(0.0);
            $table->unsignedDecimal('ganancia');
            $table->enum('tipo_entrega', ['tienda', 'domicilio']);
            $table->boolean('statusPago')->default(false);
            $table->enum('status', ['pendiente', 'en camino', 'entregado'])->default('pendiente');
            $table->text('direccion')->nullable();
            $table->softDeletes();

            $table->foreign('client_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales');
    }
}