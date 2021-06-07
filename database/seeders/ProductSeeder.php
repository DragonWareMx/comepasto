<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('products')->insert([
            'category_id' => 1,
            'type_id' => 1,
            'brand_id' => 1,
            'costo' => '15.00',
            'precio' => '99.99',
            'stock' => 15,
            'name' => 'QUESO RANCHERO QUESO VEGANO',
            'ingredientes' => 'Ingredientes: Aceite de coco, vino blanco, agua, almidón modificado, almidón, saborizante natural y artificial, sal, goma de celulosa, sorbato de potasio, achiote, betacaroteno, ácido cítrico, vitamina B12.',
            'presentacion' => '250g',
            'soyaFree' => true,
            'trigoFree' => false,
            'descuento' => '10.00',
            'foto' => '1.png',
        ]);
    }
}
