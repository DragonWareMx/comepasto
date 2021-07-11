import React, { useEffect } from 'react';


import Cart from '../layout/Cart'
import SearchIcon from '@material-ui/icons/Search';

export default function Navbar() {
    useEffect(() => {
        window.addEventListener('scroll', (e) => {
            var navbar = document.getElementById('main-navbar');
            // var main = document.getElementById('content');
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                navbar.classList.add('shrinked');
                // main.classList.add('shrinked');
            } else {
                navbar.classList.remove('shrinked');
                // main.classList.remove('shrinked');
            }
        })
    })

    return (
        <div>
            <nav className="main-navbar" id="main-navbar" style={{zIndex: 999}}>
                <div className="navbar-sup">
                    <div className="div-redes">
                        <a className="icono" href="http://facebook.com/comepastov">
                            <img src="/img/icons/fb.png" alt="Facebok" width={"25px"} height={"25px"} />
                                Facebook
                        </a>
                        <a className="icono" href="https://instagram.com/comepastov/" style={{ marginLeft: "15px" }}>
                            <img src="/img/icons/ig.png" alt="Instagram" width={"25px"} height={"25px"} />
                                Instagram
                        </a>
                    </div>
                    <div className="div-logo">
                        Comepasto
                    </div>
                    <div className="links-hide">
                        <a href="#">TIENDA</a>
                        <a href="#">RECETAS</a>
                        <a href="#">QUIÉNES SOMOS</a>
                        <a href="#">PREGUNTAS FRECUENTES</a>
                    </div>
                    <div className="div-iconos">
                        <SearchIcon fontSize="large" style={{ color: '#1DA3A8' }} />
                        <Cart />
                    </div>
                </div>
                <div className="navbar-inf">
                    <div className="links">
                        <a href="#">TIENDA</a>
                        <a href="#">RECETAS</a>
                        <a href="#">QUIÉNES SOMOS</a>
                        <a href="#">PREGUNTAS FRECUENTES</a>
                    </div>
                </div>
            </nav>
        </div>
    );
}