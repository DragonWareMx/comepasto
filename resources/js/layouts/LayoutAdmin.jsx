import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Navbar from '../components/layout/NavbarAdmin';
import Footer from '../components/layout/FooterAdmin';

export default function LayoutAdmin({ title, pageTitle, children }) {
    useEffect(() => {
        document.title = title;
    }, [title])

    return (
        <React.Fragment>
            <CssBaseline />
            {/* Navbar */}
            <Navbar />

            {/* <div style={{width:'250px', position:'sticky', borderRight:'1px solid #E1E3EA',height:'593px'}}>
                MENU LATERAL
            </div> */}



            {/* contenido */}
            <div className="content" id="content">
                {children}
            </div>

            {/* <Footer /> */}
        </React.Fragment>
        )
}