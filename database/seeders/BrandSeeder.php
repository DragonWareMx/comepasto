<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('brands')->insert([
            'name' => 'Leaf',
            'supplier_id' => 1,
            'logo' => 'Logo_color_Mesa-de-trabajo-1.png',
            'link' => 'www.google.com',
        ]);
    }
}
