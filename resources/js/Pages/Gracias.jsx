import { React } from 'react';
import Layout from '../layouts/Layout';
import { Container, Grid, Hidden, Paper, Button } from '@material-ui/core';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    cardInicioSesion: {
        width: "100%",
        height: "fit-content",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 33px"
    },
    container: {
        paddingTop: '20px',
        paddingBottom: '20px'
    },
    cardText: {
        color: '#878787',
        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '15px',
        lineHeight: '24px',
        width: "90%",
        textAlign: "center"
    },
    cardTitle: {
        color: '#1DA3A8',
        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '18px',
        lineHeight: '29px',
        width: "90%",
        textAlign: "center"
    },
    image: {
        width: '90%',
    },
    inertiaButtonCart: {
        width: "fit-content",
        height: "fit-content",
        backgroundColor: "transparent",
        marginTop: "12px",
        marginBottom: "20px",
        padding: "0px",
        border: "none"
    },
    buttonCart: {
        background: 'transparent',
        color: '#9F9F9F',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '13px',
        lineHeight: '21px',

        width: '100%',
        height: '38px',

        border: "1px solid #E3E3E3",

        '&:hover': {
            background: '#1DA3A8',
            color: '#FFFFFF',
        },
    },
}));

const Gracias = ({ token, email }) => {
    const { errors, flash } = usePage().props
    const classes = useStyles();

    return (
        <>
            <Container>
                <div className={classes.container}>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        spacing={4}
                    >
                        <Grid item sm={4} md={6} xs={12}>
                            <img src="/img/ilustraciones/Successful_purchase.gif" alt="Gracias por tu compra" className={classes.image} />
                        </Grid>

                        <Grid item sm={8} md={6} xs={12}>
                            <Paper elevation={3} className={classes.cardInicioSesion}>
                                {flash.data ?
                                    <>
                                        <div className={classes.cardTitle} style={{ marginTop: "15px", color: 'red' }}>
                                            {flash.data}
                                        </div>
                                        <InertiaLink href={route('inicio')} as="button" style={{ textDecoration: "none" }} className={classes.inertiaButtonCart} preserveScroll>
                                            <Button variant="contained" color="primary" component="div" disableElevation className={classes.buttonCart}>
                                                VOLVER AL INICIO
                                            </Button>
                                        </InertiaLink>
                                    </>
                                    :
                                    <>
                                        <div className={classes.cardTitle} style={{ marginTop: "15px" }}>
                                            Comepasto te agradece tu compra, en tu correo electrónico recibirás los detalles de tu compra. Conoce más productos en nuestra tienda.
                                        </div>
                                        <InertiaLink href={route('inicio')} as="button" style={{ textDecoration: "none" }} className={classes.inertiaButtonCart} preserveScroll>
                                            <Button variant="contained" color="primary" component="div" disableElevation className={classes.buttonCart}>
                                                IR A LA TIENDA
                                            </Button>
                                        </InertiaLink>
                                    </>
                                }
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    )
}

Gracias.layout = page => <Layout children={page} title="Comepasto - Gracias por tu compra" pageTitle="Gracias por tu compra" />

export default Gracias