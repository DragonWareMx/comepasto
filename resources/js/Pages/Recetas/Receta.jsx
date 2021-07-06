import React from 'react';
import '/css/QuienesSomos.css';
import '/css/recetas.css';
import Layout from '../../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Icon from '@material-ui/core/Icon';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Tooltip from '@material-ui/core/Tooltip';

const Recetas = () => {
    return (
        <>
            <Grid container direction="row" flexwrap="wrap">
                <Grid item xs={12} sm={6} style={{padding:'25px'}}>
                    {/* Titulo de la receta */}
                    <Grid container direction="row" alignItems="center" justify="space-between" className="sub-div-receta">
                        <Grid item xs={11}>BURRITOS VEGANOS Y DELICIOSOS</Grid>
                        <Grid item xs={1} className="navigate-back"><a href="#!"><NavigateBeforeIcon style={{fontSize:'30px'}}></NavigateBeforeIcon></a></Grid>
                    </Grid>
                    {/* Pequeña descripcion de la receta Limite de caracteres para esto */}
                    <Grid item xs={12} className="descrip-receta" style={{marginTop:'35px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. 
                    Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Grid>
                    <a href="#!" className="a-despla">INGREDIENTES Y PREPARACIÓN <ArrowForwardIcon></ArrowForwardIcon></a>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <img src="/img/imgs/img2.jpg" style={{width:'100%', height:'100%', objectFit:'cover', maxHeight:'600px'}}></img>
                </Grid>

                {/* Productos de la receta */}
                <Grid item xs={12} style={{padding:'25px'}}>
                    <Grid item xs={12} className="title-receta">PRODUCTOS</Grid>
                    <Grid container direction="row" justify="flex-start" spacing={0}>
                        <Grid item xs={1} className="grid-img-producto"><a href="#!"><Tooltip title="Nombre completo del producto"><img src="/img/PRODUCTOS/1.png"></img></Tooltip></a></Grid>
                        <Grid item xs={1} className="grid-img-producto"><a href="#!"><Tooltip title="Nombre completo del producto"><img src="/img/PRODUCTOS/2.png"></img></Tooltip></a></Grid>
                        <Grid item xs={1} className="grid-img-producto"><a href="#!"><Tooltip title="Nombre completo del producto"><img src="/img/PRODUCTOS/3.png"></img></Tooltip></a></Grid>
                        <Grid item xs={1} className="grid-img-producto"><a href="#!"><Tooltip title="Nombre completo del producto"><img src="/img/PRODUCTOS/4.png"></img></Tooltip></a></Grid>
                        <Grid item xs={1} className="grid-img-producto"><a href="#!"><Tooltip title="Nombre completo del producto"><img src="/img/PRODUCTOS/5.png"></img></Tooltip></a></Grid>
                        <Grid item xs={1} className="grid-img-producto"><a href="#!"><Tooltip title="Nombre completo del producto"><img src="/img/PRODUCTOS/6.png"></img></Tooltip></a></Grid>
                        
                    </Grid>
                </Grid>

                {/* Contenido de la receta */}
                <Grid item xs={12} style={{padding:'25px'}}>
                    <Grid item xs={4} className="title-receta grid-ingredientes">INGREDIENTES</Grid>
                </Grid>
            </Grid>

            
        </>
    )
}


Recetas.layout = page => <Layout children={page} title="Comepasto - Recetas" pageTitle="Recetas" />

export default Recetas