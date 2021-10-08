<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('direccion', 250);
            $table->string('tel', 10)->unique()->nullable();
            $table->string('fb', 250)->nullable();
            $table->enum('rol', ['cliente', 'admin'])->default('cliente');
            $table->enum('preferPayment', ['paypal', 'stripe', 'efectivo', 'transferencia'])->nullable(); //forma de pago preferida
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}