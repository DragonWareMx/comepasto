<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('categories')->insert([
            'name' => 'LÁCTEOS',
            'icono' => 'lacteos_white.png',
        ]);

        DB::table('categories')->insert([
            'name' => 'CÁRNICOS',
            'icono' => 'carnicos_white.png',
        ]);

        DB::table('categories')->insert([
            'name' => 'EMBUTIDOS',
            'icono' => 'embutidos_white.png',
        ]);
    }
}
