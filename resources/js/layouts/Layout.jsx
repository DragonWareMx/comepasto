import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Layout({ title, pageTitle, children }) {
    useEffect(() => {
        document.title = title;
    }, [title])

    return (
        <React.Fragment>
            <CssBaseline />
            <Navbar />
            {/* contenido */}
            <div className="content">
                {children}
            </div>
            {/* <MenuLateral />*/}
            <Footer />
        </React.Fragment>
    )
}