<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            //marcas
            SupplierSeeder::class,
            BrandSeeder::class,

            //productos
            CategorySeeder::class,
            TypeSeeder::class,
            ProductSeeder::class,

            //usuarios
            UserSeeder::class,

            //Banners
            BannerSeeder::class,

            //recetas
            RecipeSeeder::class,
            ImgSeeder::class,
            ProductRecipeSeeder::class,

            //preguntas
            QuestionSeeder::class,
        ]);
    }
}
