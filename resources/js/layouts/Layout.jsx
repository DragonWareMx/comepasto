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

    const [open, setOpen] = React.useState({
        tipo: null
    })
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

    //detecta cuando un nuevo mensaje es recibido, cierra todas las alertas y cambia el mensaje
    useEffect(() => {
        if(flash.error){
            setAlert(state => ({
                ...state,
                openError: false,
                error: flash.error,
                openWarning: false,
                openSuccess: false
            }));
            setTimeout(function(){ setOpen({tipo: "error"}) }, 100);
        }
        else if(flash.success){
            setAlert(state => ({
                ...state,
                openError: false,
                openWarning: false,
                openSuccess: false,
                success: flash.success
            }));
            setTimeout(function(){ setOpen({tipo: "success"}) }, 100);
        }
        else if(flash.message){
            setAlert(state => ({
                ...state,
                openError: false,
                openWarning: false,
                warning: flash.message,
                openSuccess: false
            }));
            setTimeout(function(){ setOpen({tipo: "warning"}) }, 100);
        }
    }, [flash])

    //abre de nuevo la alerta
    useEffect(() => {
        switch (open.tipo) {
            case "error":
                setAlert(state => ({
                    ...state,
                    openError: true,
                }));
                setOpen({tipo: null})
                break;
            case "success":
                setAlert(state => ({
                    ...state,
                    openSuccess: true,
                }));
                setOpen({tipo: null})
                break;
            case "warning":
                setAlert(state => ({
                    ...state,
                    openWarning: true,
                }));
                setOpen({tipo: null})
                break;
            default:
                break;
        }
    }, [open])

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