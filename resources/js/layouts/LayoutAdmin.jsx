import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { usePage } from '@inertiajs/inertia-react'
import Container from '@material-ui/core/Container';
import Header from './parts/Header';
import Footer from './parts/Footer';
import { Navbar } from "./parts/Navbar";
import styled from 'styled-components';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Grid = styled.div`
    display: grid;
    grid: "header header" min-content
                          "nav main" 1fr / min-content 1fr;
    min-height: 100vh;
`;

const GridNav = styled.nav`
    grid-area: nav;
    z-index: 2000;
`;

const GridHeader = styled.div`
    grid-area: header;
`;

const GridMain = styled.div`
    grid-area: main;
    background-color: #fafafa;
    position: relative;
`;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    titulo: {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '18px',
        lineHeight: '22px',
        color: 'white',
        marginTop: '25px',
        textTransform: 'uppercase'
    }
}));

export default function LayoutAdmin({ title, pageTitle, children }) {
    const [showNav, setShowNav] = useState(0);
    const toggle = () => {
        setShowNav(Number(!showNav));
        setCompact(0);
    };
    const [compact, setCompact] = React.useState(0);
    const handleCompact = () => setCompact(Number(!compact));

    const classes = useStyles();
    useEffect(() => {
        document.title = title;
    }, [title]);

    //FLASH Y ALERTS
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
            {/* contenido */}
            <Grid>
                <GridNav>
                    <Navbar visible={showNav} close={toggle} compact={compact} handleCompact={handleCompact} />
                </GridNav>
                <GridHeader>
                    <Header toggle={toggle} handleCompact={handleCompact} />
                </GridHeader>
                <GridMain>
                    <Container maxWidth={'lg'}>
                        {children}
                    </Container>
                    <Footer />
                </GridMain>
            </Grid>

            {/* MENSAJES DE ALERTA */}
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
        </React.Fragment>
    );
}