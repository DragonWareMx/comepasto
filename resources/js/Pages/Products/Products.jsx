import React from 'react';
import Layout from '../../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Tooltip from '@material-ui/core/Tooltip';
import { InertiaLink } from '@inertiajs/inertia-react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';



//css
import '/css/QuienesSomos.css';

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
        }
    },
}));

const Products = () => {
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
                    <Grid container justify="space-between" spacing={1} style={{marginTop: "36px", marginBottom: "50px"}}>
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                        <Grid key={value} item>
                            <InertiaLink href="/quienessomos" style={{textDecoration: "none"}}>
                                <Paper className={classes.paper} elevation={0} square >
                                    <Grid container direction="column" justify="center" alignItems="center" style={{height: "100%"}}>
                                        <Grid item>
                                            <img className="quienes_marca" src="/img/CATEGORIAS/icons/lacteos_white.png" alt=""/>
                                        </Grid>
                                        <Grid item className={classes.category}>
                                            LÁCTEOS
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </InertiaLink>
                        </Grid>
                    ))}
                    </Grid>

                    {/* TITULO TIENDA CATEGORIAS */}
                    <Grid item xs={12} container direction="row" justify="center" spacing={1} alignItems="center" className="quienes_marcas_title">
                        <Grid item className="quienes_marcas_title">NUESTROS PRODUCTOS</Grid>
                        <Grid item className="quienes_marcas_title" style={{fontWeight: 100}}>DESTACADOS</Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}


Products.layout = page => <Layout children={page} title="Comepasto - Productos" pageTitle="Productos" />

export default Products