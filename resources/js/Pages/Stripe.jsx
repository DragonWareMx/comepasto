import { React, useState } from 'react';
import Layout from '../layouts/Layout';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

import { Container, Grid, Paper } from '@material-ui/core';

import StripeContainer from '../components/stripe/StripeContainer'

import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

import { Button, ButtonBase, Divider, Typography } from '@material-ui/core';
//iconos
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '20px',
        color: '#1DA3A8'
    },
    card: {
        width: "100%",
        maxWidth: 375,
        maxHeight: 900,
        overflow: 'auto'
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: 66,
        maxHeight: 72,
        marginRight: '15px'
    },
    nombreProducto: {
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "15px",
        lineHeight: "19px",

        color: "#474747",
        marginRight: 10,
        width: "fit-content",
    },
    precio: {
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "18px",

        color: "#1DA3A8",
    },
    precioDescuento: {
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "12px",
        lineHeight: "15px",
        textDecorationLine: "line-through",

        color: "#ABABAB",
    },
    cantidad: {
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "16px",

        color: "#595959",
    },
    precioProducto: {
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "16px",

        color: "#595959",
    },
    precioTotal: {
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "15px",
        lineHeight: "19px",

        color: "#1DA3A8",
        marginTop: 1,
    },
    cardInicioSesion: {
        width: "100%",
        maxWidth: "400px",
        height: "fit-content",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonDial: {
        background: '#1DA3A8',
        color: '#FFFFFF',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '13px',
        lineHeight: '21px',

        minWidth: '220px',
        maxWidth: '319px',
        height: '45px',
        width: "100%",

        border: "1px solid #E3E3E3",

        '&:hover': {
            background: '#1DA3A8',
            color: '#FFFFFF',
        },
    },
    inertiaButton: {
        width: "90%",
        minWidth: '220px',
        maxWidth: '319px',

        height: "fit-content",
        backgroundColor: "transparent",

        marginTop: "12px",
        marginBottom: "20px",

        padding: "0px",
        border: "none",
    },
    cardText: {
        color: '#626262',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '23px',
        width: "90%",
        textAlign: "center"
    },
    cardLink: {
        color: '#1DA3A8',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '23px',
        textAlign: "center",
        textDecoration: "none",
        marginRight: "2px",
        cursor: 'pointer'
    },
    carritoVacioTitulo: {
        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '20px',
        lineHeight: '49px',
        color: '#1DA3A8',
    },
    carritoVacio: {
        color: '#626262',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '20px',
        width: "90%",
        textAlign: "center"
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

const Stripe = ({ costoEnvio }) => {
    const classes = useStyles();
    const { auth, flash } = usePage().props

    function calcularTotalProducto(producto) {
        let precioDescuento

        if (producto.descuento <= 100)
            precioDescuento = (producto.precio - producto.precio * (producto.descuento / 100)).toFixed(2)
        else
            precioDescuento = 0

        if (precioDescuento < 0)
            precioDescuento = 0

        return (precioDescuento * producto.pivot.cantidad)
    }

    function calcularTotal(carrito) {
        let total = 0

        carrito.forEach(producto => {
            total += calcularTotalProducto(producto)
        });

        return "$" + parseFloat(total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }

    function calcularCantidadDeProductos(carrito) {
        let cantidad = 0
        carrito.forEach(producto => {
            cantidad += producto.pivot.cantidad ?? 0
        });

        return cantidad
    }

    function calcularDescuento(precio, descuento) {
        let precioDescuento

        if (descuento <= 100)
            precioDescuento = precio - precio * (descuento / 100)
        else
            precioDescuento = 0

        return "$" + parseFloat(precioDescuento).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " MXN"
    }

    function sacarSubtotal(subtotal) {
        return parseFloat(subtotal.substring(1))
    }

    return (
        <>
            <Container>
                <Grid container spacing={8} wrap={'wrap-reverse'}>
                    <Grid item xs={12} md={6}>
                        <div className={classes.title} style={{ marginTop: "30px" }}>INFORMACIÓN DE LA TARJETA</div>
                        <StripeContainer />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className={classes.title} style={{ marginTop: "30px" }}>RESUMEN DE TU COMPRA</div>
                        {auth && auth.user && auth.cart && auth.cart.length > 0 ?
                            <>
                                {auth.cart.map(producto => (
                                    <div key={producto.id + "carrito"}>
                                        {/* PRODUCTO */}
                                        <Grid container style={{ margin: 10. }}>
                                            {/* Imagen del producto */}
                                            <Grid item>
                                                <ButtonBase>
                                                    {producto.foto &&
                                                        <img className={classes.img} alt="complex" src={"/storage/products/" + producto.foto} />
                                                    }
                                                </ButtonBase>
                                            </Grid>

                                            <Grid item xs container>
                                                {/* NOMBRE DEL PRODUCTO */}
                                                <Grid item xs={12}>
                                                    <InertiaLink href="/producto" style={{ textDecoration: "none" }}>
                                                        <Typography gutterBottom className={classes.nombreProducto}>
                                                            {producto.name.length > 100 ?
                                                                producto.name.substring(0, 100 - 3) + "..."
                                                                :
                                                                producto.name
                                                            }
                                                        </Typography>
                                                    </InertiaLink>
                                                </Grid>

                                                {/* Precios */}
                                                <Grid item xs={12} container spacing={1}>
                                                    {producto.descuento > 0 ?
                                                        <>
                                                            <Grid item >
                                                                <Typography gutterBottom className={classes.precioDescuento} align="left">
                                                                    {"$" + parseFloat(producto.precio).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " MXN"}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item >
                                                                <Typography gutterBottom className={classes.precio} align="left">
                                                                    {calcularDescuento(producto.precio, producto.descuento)}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                        :
                                                        <>
                                                            <Grid item style={{ padding: 0 }}>
                                                                <Typography gutterBottom className={classes.precioDescuento} align="left" style={{ padding: 0 }} >

                                                                </Typography>
                                                            </Grid>
                                                            <Grid item >
                                                                <Typography gutterBottom className={classes.precio} align="left">
                                                                    {"$" + parseFloat(producto.precio).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " MXN"}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                    }
                                                </Grid>

                                                {/* Cantidad */}
                                                <Grid item xs={8} container spacing={1}>
                                                    <Grid item xs container alignItems="center" justify="flex-end">
                                                        <Typography gutterBottom className={classes.cantidad} align="right">
                                                            Cantidad: {producto.pivot.cantidad}
                                                        </Typography>
                                                    </Grid>


                                                </Grid>

                                                {/* Precio */}
                                                <Grid item xs={4}>
                                                    <Typography gutterBottom className={classes.precioProducto} align="right">
                                                        {producto.pivot.cantidad + "x$" + calcularTotalProducto(producto).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Divider variant="middle" style={{ marginBottom: 10 }} />
                                    </div>
                                ))}
                                {/* SUBTOTAL */}
                                <Grid item xs={12} container justify="space-between">
                                    <Grid item>
                                        <Typography gutterBottom className={classes.precioTotal} align="left">
                                            Subtotal:
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Typography gutterBottom className={classes.precioTotal} align="right">
                                            {calcularTotal(auth.cart)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                {/* Envio */}
                                <Grid item xs={12} container justify="space-between">
                                    <Grid item>
                                        <Typography gutterBottom className={classes.precioTotal} align="left">
                                            Envío:
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Typography gutterBottom className={classes.precioTotal} align="right">
                                            {'$'}{costoEnvio}{'.00'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                {/* TOTAL */}
                                <Grid item xs={12} container justify="space-between">
                                    <Grid item>
                                        <Typography gutterBottom className={classes.precioTotal} align="left">
                                            Total:
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Typography gutterBottom className={classes.precioTotal} align="right">
                                            ${costoEnvio + sacarSubtotal(calcularTotal(auth.cart))}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </>
                            :
                            <>
                                {/* CARRITO VACIO */}
                                <Grid container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{ marginTop: 30 }}
                                >
                                    <Grid item>
                                        <ShoppingCartOutlinedIcon style={{ fontSize: 50, color: "#1DA3A8" }} />
                                    </Grid>

                                    <Grid item>
                                        <div className={classes.carritoVacioTitulo} style={{ marginTop: "0px" }}>
                                            TU CARRITO ESTÁ VACÍO
                                        </div>
                                        <div className={classes.carritoVacio} style={{ marginTop: "0px" }}>
                                            Agrega productos a tu carrito
                                        </div>
                                    </Grid>

                                    <Grid item>
                                        <InertiaLink href={route('inicio')} as="button" style={{ textDecoration: "none" }} className={classes.inertiaButtonCart} preserveScroll>
                                            <Button variant="contained" color="primary" component="div" disableElevation className={classes.buttonCart}>
                                                IR A LA TIENDA
                                            </Button>
                                        </InertiaLink>
                                    </Grid>
                                </Grid>
                            </>
                        }
                    </Grid>
                </Grid>

            </Container>
        </>
    );
};

Stripe.layout = (page) => (
    <Layout children={page} title="Comepasto - Finalizar Compra" pageTitle="" />
);

export default Stripe;