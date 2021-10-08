<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            'name' => 'Leonardo López Castillo',
            'email' =>  'test@dragonware.com.mx',
            'rol' => 'admin',
            'password' => Hash::make('viledruid9000'),
            'direccion' =>  'Enrique Segoviano',
        ]);
    }
}