import React, { useEffect } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Grid from '@material-ui/core/Grid';
import '/css/proceso.css'

//iconos
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function Proceso() {
    return (
        <div className='proceso'>
            <div className='proceso_item'>
                <div className='proceso_icono'><SearchIcon fontSize='large'></SearchIcon></div>
                <div style={{width:173}}>
                    <div className='proceso_title'>1. Explora</div>
                    <div className='proceso_info'>Descubre nuestros todos los productos mediante las categorías </div>
                </div>
            </div>
            <div className='proceso_item'>
                <div className='proceso_icono'><ShoppingCartIcon fontSize='large'></ShoppingCartIcon></div>
                <div style={{width:173}}>
                    <div className='proceso_title'>2. Selecciona</div>
                    <div className='proceso_info'>Únicamente da clic en el botón “AGREGAR AL CARRITO”</div>
                </div>
            </div>
            <div className='proceso_item'>
                <div className='proceso_icono'><AttachMoneyIcon fontSize='large'></AttachMoneyIcon></div>
                <div style={{width:173}}>
                    <div className='proceso_title'>3. Realiza tu pago</div>
                    <div className='proceso_info'>Puedes pagar con tarjeta de crédito, débito o efectivo</div>
                </div>
            </div>
            <div className='proceso_item'>
                <div className='proceso_icono'><FavoriteIcon fontSize='large'></FavoriteIcon></div>
                <div style={{width:173}}>
                    <div className='proceso_title'>4. Disfruta tus productos</div>
                    <div className='proceso_info'>Recibe tu pedido a la puerta de tu domicilio ¡Mejor que salir de casa!</div>
                </div>
            </div>
        </div>
    )
}