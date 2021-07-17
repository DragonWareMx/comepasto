<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Seeder;

class ImgSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('imgs')->insert([
            'recipe_id' => 1,
            'product_id' => null,
            'descripcion' => 'La mejor maruchan que probaras en tu vida, descrubrelo como hacerlo, en 3 minutos estará lista, perfecta para esos días con un antojo y poco tiempo de preparación, podrás hacer esta receta en cualquier lado',
            'url' => 'maruchan.jpg',
        ]);

        DB::table('imgs')->insert([
            'recipe_id' => 2,
            'product_id' => null,
            'descripcion' => 'Sabrosos taquitos de pollo vegano crujientes',
            'url' => 'tacos.jpg',
        ]);

        DB::table('imgs')->insert([
            'recipe_id' => 3,
            'product_id' => null,
            'descripcion' => 'Un dulce sabor',
            'url' => 'carlota.jpg',
        ]);

        DB::table('imgs')->insert([
            'recipe_id' => 4,
            'product_id' => null,
            'descripcion' => 'Mismo sabor, diferentes ingredientes, dejate consentir con unas deliciosas hamburguesas',
            'url' => 'burguir.jpg',
        ]);

        DB::table('imgs')->insert([
            'recipe_id' => 5,
            'product_id' => null,
            'descripcion' => 'Prueba los deliciosos sabores de la ultima receta',
            'url' => 'teriyaki.jpg',
        ]);

        DB::table('imgs')->insert([
            'recipe_id' => 6,
            'product_id' => null,
            'descripcion' => 'El perfecto postre facil y rapidisimo de hacer',
            'url' => 'galletas.jpg',
        ]);
    }
}
