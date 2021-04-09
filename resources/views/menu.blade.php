<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="{{ asset('storage/ico/logopng.png') }}">
    <link rel="image_src" href="{{ asset ('storage/img/1.png')}}" />
    <link href="{{ asset('/css/a.css') }}" rel="stylesheet">
    {{-- font --}}
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet">

    {{-- OWL CAROUSEL --}}
    <link rel="stylesheet" href="{{ asset('storage/plugins/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css') }}">
    <link rel="stylesheet" href="{{ asset('storage/plugins/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css') }}">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="{{ asset('storage/plugins/OwlCarousel2-2.3.4/dist/owl.carousel.min.js') }}"></script>
    
    <!-- Load Facebook SDK for JavaScript -->
    <div id="fb-root"></div>
    <script>
    window.fbAsyncInit = function() {
        FB.init({
        xfbml            : true,
        version          : 'v10.0'
        });
    };

    (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/es_LA/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>

    <!-- Your Chat Plugin code -->
    <div class="fb-customerchat"
    attribution="setup_tool"
    page_id="104279224835805"
    theme_color="#FFDE59"
    logged_in_greeting="Hola, ¿en qué podemos ayudarte?"
    logged_out_greeting="Hola, ¿en qué podemos ayudarte?">
    </div>    

   <title>Comepasto - Menú</title>
</head>
<body style="background-color: #1DA3A8">
    
    <div class="menu" style="text-align:center">
        <a href="/" style="text-decoration: none">
            <div style="width:100%">
                <h1 style="font-family: 'Fredoka One'; color: #FFDE59;">Comepasto</h1>
            </div>
        </a>
    </div>
    <hr class="linea">
    <div class="owl-carousel owl-theme" style="margin-top:5%;">
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/1.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/2.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/3.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/4.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/5.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/6.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/7.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/8.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/9.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/10.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/11.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/12.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/13.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/14.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/15.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/16.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/17.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/18.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/19.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/20.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/21.png')}}" alt="">
            </div>
            <div class="olw-item" style="">
                <img src="{{asset('storage/img/22.png')}}" alt="">
            </div>
    </div>
    <div>
        <div style="width:100%; text-align:center">
            <h1 style="font-family: 'Fredoka One'; color: #FFDE59;">Tienda</h1>
            <img src="{{asset('storage/ico/cart.png')}}" width="100px">
            <h1 style="font-family: 'Indie Flower', cursive; color: white;"> Productos destacados</h1>
        </div>
        
    </div>
    <div class="cont_tienda">
        <div class="producto">
            <img class="img_product" src="{{asset('storage/img/productos/salchichaBeyond.jpg')}}">
            <div class="info_product">
                <div class="title_product">Salchicha Beyond</div>
                <div class="precio_product">$206</div>
            </div>
        </div>
        
        <div class="producto">
            <img class="img_product" src="{{asset('storage/img/productos/salchichaBeyond.jpg')}}">
        </div>

        
        <div class="producto">
            <img class="img_product" src="{{asset('storage/img/productos/salchichaBeyond.jpg')}}">
        </div>

    </div>
    <div style="text-align: center">
        
        <a href="https://api.whatsapp.com/send?phone=524432431668" target="_blank">
            <img  id="doit" src="{{asset('storage/ico/WA.png')}}" width="80px" style="" >
        </a>
        <p style="font-family: 'Fredoka One'; color: #FFDE59; font-size:20px">¡Haz tu pedido!</p>
    </div>
</body>

</html>
<script>
    $('.owl-carousel').owlCarousel({
    loop:true,
    margin:15,
    nav:false,
    autoplay:true,
    autoplayTimeout:2500,
    autoplayHoverPause:true,
    
    responsive:{
        0:{
            items:1,
            dots:false,
            nav:true
        },
        600:{
            items:1
        },
        1000:{
            items:2
        },
        1400: {
            items:3
        }
    }
    });
</script>

