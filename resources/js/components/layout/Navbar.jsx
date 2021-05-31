import React, { useEffect } from 'react';


import Cart from '../layout/Cart'
import SearchIcon from '@material-ui/icons/Search';

export default function Navbar() {
    useEffect(() => {
        window.addEventListener('scroll', (e) => {
            var navbar = document.getElementById('main-navbar');
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                console.log('aqui se debe achicar we');
                navbar.classList.add('shrinked');
            } else {
                console.log('aqui otra vez grande we');
                navbar.classList.remove('shrinked');
            }
        })
    })

    return (
        <div>
            <nav className="main-navbar" id="main-navbar">
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