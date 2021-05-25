import React from 'react';
import Logo from '../../../../public/img/icons/dragonBlanco.png'
import '../../Styles/menu.css';

export default function Footer() {
    return (
        <div>
            {/* footer de la pagina */}
            <div className="footer-main">
                <div className="footer-left">
                    <div>
                        <div className="footer-come">
                            Comepasto
                    </div>
                        <div className="footer-copy">
                            © Copyright 2021 comepasto
                    </div>
                    </div>
                </div>
                <div className="footer-middle">
                    <div className="footer-icons">
                        <a href="http://facebook.com" target="_blank">
                            <img src="/img/icons/fb2.png" alt="" srcset="" style={{ width: "20px", height: "20px" }} />
                        </a>
                        <a href="http://facebook.com" target="_blank">
                            <img src="/img/icons/ig2.png" alt="" srcset="" style={{ width: "20px", height: "20px" }} />
                        </a>
                        <a href="http://facebook.com" target="_blank">
                            <img src="/img/icons/whats.png" alt="" srcset="" style={{ width: "20px", height: "20px" }} />
                        </a>
                        <a href="http://facebook.com" target="_blank">
                            <img src="/img/icons/mail.png" alt="" srcset="" style={{ width: "20px", height: "20px" }} />
                        </a>
                    </div>
                    <div>Distribuidor vegano</div>
                    <div>Morelia, Michoacán, México</div>
                </div>
                <div className="footer-right">
                    <a href="www.dragonware.com.mx" target="_blank"> Desarrollado por DragonWare <img src={Logo} alt="logo" style={{ width: "20px", height: "14px" }} /></a>
                </div>
            </div>
        </div>
    );
}