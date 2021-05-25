import React from 'react';

import Logo from '../../../../public/img/icons/dragonBlanco1.png'

export default function Navbar() {
    return (
        <div>
            {/* footer de la pagina */}
            <div className="footer-copyright center-align">
                <div style={{ "color": "#707070" }}>
                    © 2021 Escuela Sindical   |   <a href="www.dragonware.com.mx" target="_blank"> Desarrollado por DragonWare <img src={Logo} alt="logo" /></a>
                </div>

            </div>
        </div>
    );
}