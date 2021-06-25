import React from 'react';
import Layout from '../../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { InertiaLink } from '@inertiajs/inertia-react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

//css
import '/css/QuienesSomos.css';
import Paginacion from '../../components/common/paginacion';
import Product from '../../components/Product'
import route from 'ziggy-js';

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
}));

const Products = ({products, categories, request}) => {
    const classes = useStyles();

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
                            <Grid item>
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
        </>
    )
}


Products.layout = page => <Layout children={page} title="Comepasto - Productos" pageTitle="Productos" />

export default Products