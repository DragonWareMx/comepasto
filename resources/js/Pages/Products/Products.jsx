import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { InertiaLink } from '@inertiajs/inertia-react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MuiAlert from '@material-ui/lab/Alert';
import { usePage } from '@inertiajs/inertia-react'
import Button from "@material-ui/core/Button";

//css
import '/css/QuienesSomos.css';
import Paginacion from '../../components/common/paginacion';
import Product from '../../components/Product'
import route from 'ziggy-js';
import { Dialog, Snackbar } from '@material-ui/core';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    category: {
        fontFamily: "Atma",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "25px",
        lineHeight: "40px",

        color: "#FFDE59",
        userSelect: "none",
    },
    paper: {
        height: 150,
        width: 180,
        backgroundColor: "#1DA3A8",
        '& img': {
            height: "80px",
            width: "auto",
            margin: "auto",
            userSelect: "none"
        },
        '&:hover img':{
            height: "90px",
            width: "auto",
            transition: "all 1s",
        }
    },
    cardInicioSesion:{
        width: "100%",
        maxWidth: "400px",
        height: "fit-content",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
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
        marginRight: "2px"
    },
}));

const Products = ({products, categories, request}) => {
    const { flash,auth } = usePage().props
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [dialog, setDialog] = React.useState(false);

    const handleDialogClose = () => {
        setDialog(false);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function cantidadProducto(id){
        if(auth && auth.cart && auth.cart.length > 0){
            var cantidad = 0
            auth.cart.forEach(productInCart => {
                if(productInCart.id == id){
                    cantidad = productInCart.pivot.cantidad
                    return
                }
            });
            return cantidad
        }

        return 0
    }

    //se ejecuta cuando se monta el componente, inicializa materialize y el buscador
    useEffect(() => {
        if(flash.error || flash.success || flash.message){
            setOpen(true)
        }
        if(flash.info){
            setDialog(true)
        }
    }, [flash])

    return (
        <>
            {/* CATEGORIAS */}
            <Container>
                <Grid container direction="row" justify="center">
                    {/* TITULO TIENDA CATEGORIAS */}
                    <Grid item xs={12} container direction="row" justify="center" spacing={1} alignItems="center" className="quienes_marcas_title">
                        <Grid item className="quienes_marcas_title">TIENDA</Grid>
                        <Grid item className="quienes_marcas_title" style={{fontWeight: 100}}>CATEGORÍAS</Grid>
                    </Grid>

                    {/* TEXTO */}
                    <Grid item xs={12} className="quienes_marcas_text">
                        Encuentra los mejores productos del mercado
                    </Grid>

                    {/* CATEGORIAS */}
                    <Grid container justify="center" spacing={3} style={{marginTop: "36px", marginBottom: "50px"}}>
                        {categories && categories.length > 0 && categories.map(category => (
                            <Grid item key={category.id + category.name}>
                                <InertiaLink href={route('product.index')} data={{ categoria: category.name }} style={{textDecoration: "none"}} preserveScroll preserveState>
                                    <Paper className={classes.paper} elevation={0} square >
                                        <Grid container direction="column" justify="center" alignItems="center" style={{height: "100%"}}>
                                            <Grid item>
                                                <img className="quienes_marca" src={"/storage/categories/"+ category.icono +""} alt=""/>
                                            </Grid>
                                            <Grid item className={classes.category}>
                                                {category.name}
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </InertiaLink>
                            </Grid>
                        ))}

                        <Grid item>
                            <InertiaLink href={route('product.index')} data={{ categoria: "SIN GLUTEN" }} style={{textDecoration: "none"}} preserveScroll preserveState>
                                <Paper className={classes.paper} elevation={0} square >
                                    <Grid container direction="column" justify="center" alignItems="center" style={{height: "100%"}}>
                                        <Grid item>
                                            <img className="quienes_marca" src="/img/CATEGORIAS/icons/gluten3.png" alt=""/>
                                        </Grid>
                                        <Grid item className={classes.category}>
                                            SIN GLUTEN
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </InertiaLink>
                        </Grid>

                        <Grid item>
                            <InertiaLink href={route('product.index')} data={{ categoria: "SIN SOYA" }} style={{textDecoration: "none"}} preserveScroll preserveState>
                                <Paper className={classes.paper} elevation={0} square >
                                    <Grid container direction="column" justify="center" alignItems="center" style={{height: "100%"}}>
                                        <Grid item>
                                            <img className="quienes_marca" src="/img/CATEGORIAS/icons/soya3.png" alt=""/>
                                        </Grid>
                                        <Grid item className={classes.category}>
                                            SIN SOYA
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </InertiaLink>
                        </Grid>

                        <Grid item>
                            <InertiaLink href={route('product.index')} data={{ categoria: "DESTACADOS" }} style={{textDecoration: "none"}} preserveScroll preserveState>
                                <Paper className={classes.paper} elevation={0} square>
                                    <Grid container direction="column" justify="center" alignItems="center" style={{height: "100%"}}>
                                        <Grid item>
                                            <img className="quienes_marca" src="/img/CATEGORIAS/icons/destacados_white.png" alt=""/>
                                        </Grid>
                                        <Grid item className={classes.category}>
                                            DESTACADOS
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </InertiaLink>
                        </Grid>
                    </Grid>

                    {/* TITULO TIENDA CATEGORIAS */}
                    <Grid item xs={12} container direction="row" justify="center" spacing={1} alignItems="center" className="quienes_marcas_title" style={{marginBottom: "30px"}}>
                        <Grid item className="quienes_marcas_title">
                            NUESTROS PRODUCTOS
                        </Grid>
                        <Grid item className="quienes_marcas_title" style={{fontWeight: 100}}>
                            {request.categoria ?? "DESTACADOS"}
                        </Grid>
                    </Grid>

                    <Grid item xs={12} container direction="row" spacing={3} style={{marginBottom: "40px"}}>
                        {(products && products.data && products.data.length > 0) ? products.data.map((product) => (
                            <Product key={product.id} 
                                name={product.name} 
                                img={product.foto} 
                                price={product.precio} 
                                discount={product.descuento} 
                                brand={product.brand ? product.brand.name : "Sin marca"} 
                                logo={product.brand ? product.brand.logo : "Logo_color_Mesa-de-trabajo-1.png"} 
                                link={product.brand ? product.brand.link ?? "#" : "#"} 
                                id={product.id}
                                glutenFree={product.trigoFree}
                                soyaFree={product.soyaFree}
                                cantidad={cantidadProducto(product.id)}
                            />
                         ))
                        :
                        "Sin resultados"
                        }
                    </Grid>

                    <Grid item xs={12} container direction="row" spacing={3}>
                        <Paginacion links={products.links}/>
                    </Grid>
                </Grid>
            </Container>

            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                {flash.error ?
                    <Alert onClose={handleClose} severity="error">
                        {flash.error}
                    </Alert>
                :
                flash.message ?
                    <Alert onClose={handleClose} severity="warning">
                        {flash.message}
                    </Alert>
                :
                flash.success &&
                    <Alert onClose={handleClose} severity="success">
                        {flash.success}
                    </Alert>
                }
            </Snackbar>

            <Dialog 
                open={dialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className={classes.cardInicioSesion}>
                    <div className={classes.cardText} style={{marginTop: "30px"}}>
                        Inicia sesión en comepasto para comenzar a añadir productos a tu carrito
                    </div>

                    <InertiaLink href={route('login')} as="button" style={{textDecoration: "none"}} className={classes.inertiaButton} preserveScroll>
                        <Button variant="contained" color="primary" component="div" disableElevation className={classes.button}>
                            INICIAR SESIÓN
                        </Button>
                    </InertiaLink>

                    <div className={classes.cardText} style={{marginBottom: "30px"}}>
                        <InertiaLink href={route("register")} className={classes.cardLink}>
                            ¿Deseas registrarte?
                        </InertiaLink>
                        Esto agilizará tus procesos de compra
                    </div>
                </div>
            </Dialog>
        </>
    )
}


Products.layout = page => <Layout children={page} title="Comepasto - Productos" pageTitle="Productos" />

export default Products