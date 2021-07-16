<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Seeder;

class ProductRecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('product_recipe')->insert([
            'product_id' => 1,
            'recipe_id' => 1,
        ]);

        DB::table('product_recipe')->insert([
            'product_id' => 2,
            'recipe_id' => 2,
        ]);

        DB::table('product_recipe')->insert([
            'product_id' => 3,
            'recipe_id' => 3,
        ]);

        DB::table('product_recipe')->insert([
            'product_id' => 4,
            'recipe_id' => 4,
        ]);

        DB::table('product_recipe')->insert([
            'product_id' => 1,
            'recipe_id' => 5,
        ]);

        DB::table('product_recipe')->insert([
            'product_id' => 2,
            'recipe_id' => 6,
        ]);
    }
}
