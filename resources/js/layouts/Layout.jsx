import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/inertia-react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Layout({ title, pageTitle, children }) {
    const { flash } = usePage().props

    const [snackPack, setSnackPack] = React.useState([])
    const [alert, setAlert] = React.useState({
        openError: flash.error ? true : false,
        error: flash.error,
        openWarning: flash.message ? true : false,
        warning: flash.message,
        openSuccess: flash.success ? true : false,
        success: flash.success,
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert(state => ({
            ...state,
            openError: false,
            openWarning: false,
            openSuccess: false
        }));
    };

    useEffect(() => {
        document.title = title;
    }, [title])

    //se ejecuta cuando se monta el componente, inicializa materialize y el buscador
    useEffect(() => {
        if(flash.error){
            setAlert(state => ({
                ...state,
                openError: true,
                error: flash.error,
                openWarning: false,
                openSuccess: false
            }));
        }
        else if(flash.success){
            setAlert(state => ({
                ...state,
                openError: false,
                openWarning: false,
                openSuccess: true,
                success: flash.success
            }));
        }
        else if(flash.message){
            setAlert(state => ({
                ...state,
                openError: false,
                openWarning: true,
                warning: flash.message,
                openSuccess: false
            }));
        }
    }, [flash])

    return (
        <React.Fragment>
            <CssBaseline />
            <Navbar />
            {/* contenido */}
            <div className="content" id="content">
                {children}
            </div>
            {/* <MenuLateral />*/}

            {/* MENSAJES PARA EL CARRITO */}
            <Snackbar open={alert.openError} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {alert.error}
                </Alert>
            </Snackbar>

            <Snackbar open={alert.openSuccess} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {alert.success}
                </Alert>
            </Snackbar>
            <Snackbar open={alert.openWarning} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                    {alert.warning}
                </Alert>
            </Snackbar>

            <Footer />
        </React.Fragment>
    )
}