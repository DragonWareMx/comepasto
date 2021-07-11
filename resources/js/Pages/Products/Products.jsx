import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { InertiaLink } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { usePage } from '@inertiajs/inertia-react'
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

//css
import '/css/QuienesSomos.css';
import Paginacion from '../../components/common/paginacion';
import Product from '../../components/Product'
import route from 'ziggy-js';
import { Dialog, InputLabel, Select } from '@material-ui/core';

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
        maxWidth: 150,
    },
    orderText:{
        color: '#474747',

        fontFamily: 'Oxygen',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '15px',
        lineHeight: '19px',
    },
    selectOrder: {
        padding: "14px 14px",
    }
}));

const Products = ({products, categories, request}) => {
    const { flash,auth } = usePage().props
    
    const classes = useStyles();
    const [dialog, setDialog] = React.useState(false);
    const [order, setOrder] = React.useState(
        (request.order == 'ascp' || request.order == 'descp' || request.order == 'ascn' || request.order == 'descn') ? request.order : ''
    );
    const [filter, setFilter] = React.useState('');

    const handleChange = (event) => {
        setOrder(event.target.value);
        Inertia.reload({only: ['products','request','categories'], 
        data: {
            order: event.target.value},
            onFinish: () => { setOrder((request.order == 'ascp' || request.order == 'descp' || request.order == 'ascn' || request.order == 'descn') ? request.order : '') },
        })
    }

    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
        // Inertia.reload({only: ['products','request','categories'], 
        // data: {
        //     order: event.target.value},
        //     onFinish: () => { setOrder((request.order == 'ascp' || request.order == 'descp' || request.order == 'ascn' || request.order == 'descn') ? request.order : '') },
        // })
    }

    const handleDialogClose = () => {
        setDialog(false);
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

    function capitalize(word){
        const lower = word.toLowerCase()
        return word.charAt(0).toUpperCase() + lower.slice(1)
    }

    useEffect(() => {
        setOrder((request.order == 'ascp' || request.order == 'descp' || request.order == 'ascn' || request.order == 'descn') ? request.order : '')
    }, [request])

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
                    <Grid item xs={12} container direction="row" justify="center" spacing={1} alignItems="center" className="quienes_marcas_title" style={{marginBottom: "0px"}}>
                        <Grid item className="quienes_marcas_title">
                            NUESTROS PRODUCTOS
                        </Grid>
                        <Grid item className="quienes_marcas_title" style={{fontWeight: 100}}>
                            {request.categoria ?? "DESTACADOS"}
                        </Grid>
                    </Grid>

                    {/* FILTROS DE BUSQUEDA */}
                    <Grid item xs={12} container 
                        direction="row"
                        justify="flex-end"
                        alignItems="center" 
                    >
                        <Grid item container alignItems="center" style={{width: "fit-content"}}>
                            <Grid item className={classes.orderText} >
                                Filtrar
                            </Grid>

                            <Grid item>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <Select
                                        value={filter}
                                        onChange={handleChangeFilter}
                                        displayEmpty
                                        classes={{ root: classes.selectOrder }}
                                    >
                                    <MenuItem value="">
                                        Sin filtro
                                    </MenuItem>
                                    {request.categoria == 'SIN GLUTEN' ? 
                                        [
                                            <MenuItem value="ss">Sin soya</MenuItem>,
                                            categories && categories.length > 0 && categories.map(category => (
                                                <MenuItem value={category.name} key={category.id + category.name + "filter"}>{capitalize(category.name)}</MenuItem>
                                            ))
                                        ]
                                    :
                                    request.categoria == 'SIN SOYA' ?
                                        [
                                            <MenuItem value="sg">Sin gluten</MenuItem>,
                                            categories && categories.length > 0 && categories.map(category => (
                                                <MenuItem value={category.name} key={category.id + category.name + "filter"}>{capitalize(category.name)}</MenuItem>
                                            ))
                                        ]
                                    :
                                        [
                                            <MenuItem value="ss">Sin soya</MenuItem>,
                                            <MenuItem value="sg">Sin gluten</MenuItem>,
                                            <MenuItem value="sssg">Sin soya y sin gluten</MenuItem>,
                                        ]
                                    }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid item container alignItems="center" style={{width: "fit-content", padding: "5px"}}>
                            <Grid item className={classes.orderText} >
                                Ordenar por
                            </Grid>

                            <Grid item>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <Select
                                        value={order}
                                        onChange={handleChange}
                                        displayEmpty
                                        classes={{ root: classes.selectOrder }}
                                    >
                                    <MenuItem value="">
                                        Más vendidos
                                    </MenuItem>
                                    <MenuItem value="ascp">Menor a mayor precio</MenuItem>
                                    <MenuItem value="descp">Mayor a menor precio</MenuItem>
                                    <MenuItem value="ascn">A-Z nombre</MenuItem>
                                    <MenuItem value="descn">Z-A nombre</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
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