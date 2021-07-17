<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Seeder;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * 
     * @return void
     */
    public function run()
    {
        DB::table('recipes')->insert([
            'created_at' => '2021-07-14 21:18:44',
            'nombre' => 'Receta para la mejor maruchan del mundo con salsita valentina',
            'ingredientes' => '1 litro de agua
                1 tenedor
                1 limpon
                Salsa valentina
                1 plato
                Juego magui
                1 sopa maruchan',
            'preparacion' => 'Compras la sopa y despues le quitas el plastico, despues le quitas la tapita y pones a hervin awa en la esrufa, cuando este lista la pones en la sopa y bla',
            'link' => 'https://www.youtube.com/watch?v=5tDz3EwNFjE',
        ]);

        DB::table('recipes')->insert([
            'created_at' => '2021-07-13 21:18:44',
            'nombre' => 'Tacos crujientes de pollo',
            'ingredientes' => '½ Kg de pechuga de pollo cocida y desmenuzada, 1 Cucharada de condimento para tacos, 1 Taza de salsa roja, 1 Lata de frijoles refritos9 Carcasas de taco, 1 Taza de queso asadero rallado, 3 Cucharadas de Aceite Sabrosano, Ingredientes para acompañar, Lechuga rallada Guacamole, Crema, Cilantro',
            'preparacion' => '
            En un bowl, mezcla el pollo con la cebolla morada, el ajo en polvo, el cilantro, el queso crema, el chipotle molido, la sal y la pimienta hasta integrar. Reserva.
            Calienta las tortillas en un comal y rellena con la mezcla de pollo. Enrolla en forma de taco y si es necesario asegura con ayuda de un palillo.
            Fríe tus tacos con aceite en un sartén a fuego medio hasta dorar. Escúrrelos sobre papel absorbente.
            Sirve con la lechuga, la crema, el queso, el aguacate, el rábano y acompaña con la salsa de tu preferencia.',
            'link' => 'https://www.kiwilimon.com/receta/carnes-y-aves/tacos-dorados-de-pollo-cremoso',
        ]);

        DB::table('recipes')->insert([
            'created_at' => '2021-07-12 21:18:44',
            'nombre' => 'CARLOTA DE LIMÓN SIN AZÚCAR',
            'ingredientes' => '2 tazas de yogurt natural sin azúcar
            2 cucharadas de monk fruit
            1 cucharadita de esencia de vainilla
            1/4 tazas de jugo de limón
            1 cucharada de ralladura de limón amarillo
            14 gramos de grenetina, hidratada y fundida
            1 1/2 tazas de galletas de vainilla
            al gusto de limón amarillo, en rodajas, para decorar
            al gusto de limón verde, en rodajas, para decorar
            al gusto de mora azul, para decorar',
            'preparacion' => 'En un bowl mezcla el yogurt natural sin azúcar, el monk fruit, la esencia de vainilla, el jugo de limón, la ralladura de limón amarillo y la grenetina hasta obtener una mezcla homogénea.
            Forra la base de un aro de 16 centímetros de diámetro con plástico adherente, coloca acetatos alrededor del diámetro del mismo grosor que el aro. Después, coloca una capa de galletas, seguido de una capa de la mezcla de yogurt. Repite el proceso hasta llenar el molde. Refrigera 40 minutos.
            Decora con rodajas de limón amarillo, de limón verde y mora azul. Disfruta.',
            'link' => 'https://www.kiwilimon.com/receta/faciles/carlota-de-limon-sin-azucar',
        ]);

        DB::table('recipes')->insert([
            'created_at' => '2021-07-11 21:18:44',
            'nombre' => 'HAMBURGUESAS DE LENTEJAS Y AVENA',
            'ingredientes' => '2 tazas de lenteja, cocida
            1 huevo
            2 cucharadas de avena, copos
            60 gramos de cebolla, finamente picada
            1 cucharadita de orégano
            1 ajo, machacado
            200 gramos de harina
            2 gramos de sal
            2 gramos de pimienta
            100 mililitros de crema
            4 panes para hamburguesa
            100 gramos de lechuga, lavada y desinfectada
            100 gramos de cebolla, en aros
            100 gramos de jitomate, en rodajas',
            'preparacion' => 'En un recipiente mezcla lentejas, huevo, avena,cebolla, oregano y ajo, agrega harina hasta que la mezcla quede homogéna y puedas formar las hamburguesas, sazona con sal y pimienta.
            Haz bolitas y aplástalas; dándole forma a la hamburguesa, para después pasarlas por aceite caliente.
            Calienta el pan y monta la hamburguesa.
            Agrega cebolla en aros, lechuga y jitomate al gusto.',
            'link' => 'https://www.kiwilimon.com/receta/saludables/hamburguesas-de-lentejas-y-avena',
        ]);

        DB::table('recipes')->insert([
            'created_at' => '2021-07-10 21:18:44',
            'nombre' => 'Bowl de salmon terikayi',
            'ingredientes' => '1/2 tazas de mermelada Smucker´s® de naranja
            1/3 tazas de salsa teriyaki
            2 cucharadas de salsa Sriracha
            1/4 tazas de cebolla cambray, rabos, finamente picados
            1 cucharada de aceite de ajonjolí
            2 cucharadas de jengibre, finamente picado
            al gusto de sal
            al gusto de pimiento
            1 cucharadita de cebolla en polvo
            1 cucharadita de ajo en polvo
            600 gramos de salmón, fresco en lonja
            3 tazas de agua
            1 1/2 tazas de arroz de sushi
            1 cucharada de azúcar
            1/8 tazas de vinagre de arroz
            1/2 tazas de mermelada Smucker´s® de naranja
            1 taza de aguacate, en cubos
            1 taza de pepino, en rebanadas delgadas
            1 taza de edamame, cocido
            al gusto de ajonjolí negro, para decorar
            al gusto de ajonjolí, blanco, para decorar',
            'preparacion' => 'En un bowl mezcla la Mermelada Smucker’s® de naranja con la salsa teriyaki, la salsa sriracha, los rabos de cebolla cambray, el aceite de ajonjolí, el jengibre, la sal, la pimienta, la cebolla y el ajo en polvo. Cubre el salmón con la mezcla y deja marinar por 30 minutos.
            Calienta el agua una ollita a fuego medio y cocina el arroz durante 20 minutos con el azúcar y el vinagre de arroz hasta que esté suave. Reserva.
            En una parrilla a temperatura media cocina el salmón por 15 minutos, barniza a lo largo de la cocción con Mermelada Smucker’s® de naranja para caramelizar.
            Sirve en un tazón el arroz y encima el salmón teriyaki, el aguacate, el pepino y los edamames. Decora con ajonjolí negro y ajonjolí blanco y disfruta.',
            'link' => 'https://www.kiwilimon.com/receta/pescados-y-mariscos/bowl-de-salmon-teriyaki',
        ]);

        DB::table('recipes')->insert([
            'created_at' => '2021-07-09 21:18:44',
            'nombre' => 'Donas de chocolate con tocino',
            'ingredientes' => '3 1/2 tazas de harina, para la masa
            1 cucharada de levadura en polvo, para la masa
            1 cucharadita de sal, para la masa
            1 taza de azúcar mascabado, para la masa
            1/4 tazas de leche entera, para la masa
            4 huevos, para la masa
            1 taza de chocolate amargo, para la masa, picado
            10 rebanadas de tocino
            suficiente de aceite vegetal
            2 tazas de azúcar glass, para el glaseado
            1/2 tazas de miel de maple, para el glaseado
            al gusto de chocolate amargo, picado, para decorar',
            'preparacion' => 'Mezcla en un recipiente la harina, la levadura, la sal y el azúcar; agrega la leche entera y el huevo. Trabaja hasta incorporar bien los ingredientes, finalmente agrega el chocolate en trozos pequeños.
            Pasa la mezcla a un recipiente engrasado y cubre, reposa por una hora la masa hasta que doble su tamaño. Poncha la masa y estírala a un grosor de 1.5 cm para formar las donas y córtalas. Reposa las donas nuevamente por 15 minutos hasta que doblen su tamaño.
            Para freír las donas calienta suficiente aceite vegetal en una olla a temperatura media. Sumerge las donas en el aceite caliente y fríe por 5 minutos aproximadamente. Escurre el exceso de aceite sobre una servilleta absorbente.
            Calienta un sartén a temperatura media y fríe las rebanadas de tocino hasta obtener un color dorado. Deja enfriar y corta el tocino en trozos.
            Para el glaseado, mezcla el azúcar glass con la miel de maple hasta obtener una consistencia semiespesa.
            Una vez que se enfriaron las donas, glaséalas con la preparación que hiciste. Agrega trozos de tocino y chocolate amargo.',
            'link' => 'https://www.kiwilimon.com/receta/postres/donas-de-chocolate-con-tocino',
        ]);
    }
}
