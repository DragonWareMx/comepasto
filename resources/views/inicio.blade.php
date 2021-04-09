<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    {{-- <!-- UIkit CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.6.16/dist/css/uikit.min.css" />

     <!-- UIkit JS -->
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.6.16/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.6.16/dist/js/uikit-icons.min.js"></script>
     --}}
    
    
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    {{-- css --}}
    <link href="{{ asset('/css/a.css') }}" rel="stylesheet">

    <link rel="icon" href="{{ asset('storage/ico/logopng.png') }}">
    <link rel="image_src" href="{{ asset ('storage/img/1.png')}}" />
    
    {{-- fonts --}}
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
    <title>Comepasto-Bienvenido</title>
</head>

<body style="background-color: #1DA3A8">
   
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
    
    <a href="/menu" style="text-decoration: none">
        <div id="menu" style="height: 150px; margin: 30px; width:100px">
            <div id="prueba" style="width:100px; text-align: center">
                <p id="menutxt" style="font-family: 'Fredoka One'; color: white; font-size:20px">Menú</p>
            </div> 
            <div id="bagdiv">
                <img id="imgbag" src="{{asset('storage/ico/Bag.png')}}" width="100px" style="margin: 5px">    
            </div>
        </div>
    </a>

    <div class="conteiner" style="text-align: center">
        <div class="logo" style="width:100%"> 
            <h1 class="title" style="font-family: 'Fredoka One'; color: #FFDE59; font-size:100px">Comepasto</h1>
        </div>
           
        <div  style="">
            <a href="https://facebook.com/comepastov" target="_blank" style="text-decoration: none">
                <img class="redes" id="iconofb" class="" src="{{asset('storage/ico/FB.png')}}" width="40px" style="margin: 20px" >
            </a>
            <a  href="https://instagram.com/comepastov/" target="_blank" style="text-decoration: none">
                <img class="redes" id="iconoig" class="" src="{{asset('storage/ico/IG.png')}}" width="40px" style="margin: 20px">    
            </a>
            <a href="https://api.whatsapp.com/send?phone=524432431668" target="_blank" style="text-decoration: none">
                <img class="redes" id="iconowa" src="{{asset('storage/ico/WA.png')}}" width="40px" style="margin: 20px">
            </a>
            <a  href="mailto: comepastov@gmail.com" target="_blank" style="text-decoration: none">
                <img class="redes" id="iconomail" src="{{asset('storage/ico/MAIL.png')}}" width="40px" style="margin: 20px">
            </a>  
        </div>
        <div>
            <p style="font-family: 'Roboto'; color: white" >Distribuidor vegano</p>
            <p style="font-family: 'Roboto'; color: white" >Morelia, Michoacán, México</p>
            
        </div>
    </div>
</body>
</html>
<script>

</script>