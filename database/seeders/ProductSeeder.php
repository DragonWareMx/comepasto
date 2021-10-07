<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

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
            // 'costo' => '15.00',
            'precio' => '99.99',
            'stock' => 15,
            'name' => 'QUESO RANCHERO QUESO VEGANO',
            'ingredientes' => 'Aceite de coco, vino blanco, agua, almidón modificado, almidón, saborizante natural y artificial, sal, goma de celulosa, sorbato de potasio, achiote, betacaroteno, ácido cítrico, vitamina B12.',
            'presentacion' => '250g',
            'soyaFree' => true,
            'trigoFree' => false,
            'descuento' => '10.00',
            'foto' => '1.png',
            'uuid' => Str::uuid(),
        ]);

        //ESTOS SIDERS QUITENLOS XD
        DB::table('products')->insert([
            'category_id' => 1,
            'type_id' => 1,
            'brand_id' => 1,
            // 'costo' => '15.00',
            'precio' => '99.99',
            'stock' => 15,
            'name' => 'QUESO RANCHERO QUESO VEGANO 2',
            'ingredientes' => 'Aceite de coco, vino blanco, agua, almidón modificado, almidón, saborizante natural y artificial, sal, goma de celulosa, sorbato de potasio, achiote, betacaroteno, ácido cítrico, vitamina B12.',
            'presentacion' => '250g',
            'soyaFree' => false,
            'trigoFree' => false,
            'descuento' => '0.00',
            'foto' => '2.png',
            'uuid' => Str::uuid(),
        ]);

        DB::table('products')->insert([
            'category_id' => 2,
            'type_id' => 1,
            'brand_id' => 1,
            // 'costo' => '15.00',
            'precio' => '99.99',
            'stock' => 15,
            'name' => 'CARNE MOLIDA',
            'ingredientes' => 'Aceite de coco, vino blanco, agua, almidón modificado, almidón, saborizante natural y artificial, sal, goma de celulosa, sorbato de potasio, achiote, betacaroteno, ácido cítrico, vitamina B12.',
            'soyaFree' => false,
            'trigoFree' => true,
            'descuento' => '0.00',
            'foto' => '3.png',
            'uuid' => Str::uuid(),
        ]);

        DB::table('products')->insert([
            'category_id' => 3,
            'type_id' => 1,
            'brand_id' => 1,
            // 'costo' => '15.00',
            'precio' => '99.99',
            'stock' => 15,
            'name' => 'SALCHICHA FACHERA FACHERITA VEGANA',
            'presentacion' => '250g',
            'soyaFree' => true,
            'trigoFree' => true,
            'descuento' => '0.00',
            'foto' => '4.png',
            'uuid' => Str::uuid(),
        ]);
    }
}
