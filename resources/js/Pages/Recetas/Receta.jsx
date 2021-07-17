import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js';
import { InertiaLink } from '@inertiajs/inertia-react';
import '/css/QuienesSomos.css';
import '/css/recetas.css';
import Layout from '../../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import YouTubeIcon from '@material-ui/icons/YouTube';

const Recetas = ({receta, productos}) => {
    return (
        <>
            <Grid container direction="row" flexwrap="wrap">
                <Grid item xs={12} sm={6} style={{padding:'25px'}} className="gridA">
                    {/* Titulo de la receta */}
                    <Grid container direction="row" alignItems="center" justify="space-between" className="sub-div-receta">
                        <Grid item xs={11}>{receta.nombre}</Grid>
                        <Grid item xs={1} className="navigate-back"><InertiaLink href={route('recetas')}><NavigateBeforeIcon style={{fontSize:'30px'}}></NavigateBeforeIcon></InertiaLink></Grid>
                    </Grid>
                    <Grid item xs={12} className="descrip-receta" style={{marginTop:'35px'}}>{receta.descripcion}</Grid>
                    <a href="#ingredientes_preparacion" className="a-despla">INGREDIENTES Y PREPARACIÓN <ArrowForwardIcon></ArrowForwardIcon></a>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <img src={"/storage/recetas/" + receta.url} style={{width:'100%', height:'100%', objectFit:'cover', maxHeight:'600px'}}></img>
                </Grid>

                {/* Productos de la receta */}
                <Grid item xs={12} style={{padding:'25px'}}>
                    <Grid item xs={12} className="title-receta">PRODUCTOS</Grid>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={0} style={{display:'flex',flexWrap:'wrap'}}>
                        
                        {productos && productos.map(producto=>(
                        <Grid  className="grid-img-producto" id={producto.id}><a href="#!"><Tooltip title={producto.name}><img src={"/storage/productos/" + producto.foto}></img></Tooltip></a></Grid>
                        ))}
                        
                        <a href="#!" style={{textDecoration:'none', margin:'25px', marginBottom:'0px'}}>
                            <Button  size="large" className="button-receta" endIcon={<ShoppingCartOutlinedIcon>send</ShoppingCartOutlinedIcon>}>
                                AGREGAR AL CARRITO
                            </Button>
                        </a>
                    </Grid>
                </Grid>
                <Grid id="ingredientes_preparacion"></Grid>
                {/* Contenido de la receta */}
                <Grid item xs={12} style={{padding:'25px',display:'flex',alignItems:'baseline',flexWrap:'wrap'}}>
                    <Grid item xs={12} md={4} className="title-receta grid-ingredientes">
                        INGREDIENTES
                        <Grid className="list-ingredients">{receta.ingredientes && <div dangerouslySetInnerHTML={{ __html: receta.ingredientes }} />}</Grid>
                            <Divider />
                            <List component="nav" aria-label="main mailbox folders" >
                                <a href={receta.link} target="_blank" style={{"textDecoration":"none"}}>
                                <ListItem button >
                                    <ListItemIcon>
                                        <YouTubeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Link video" />
                                </ListItem>
                                </a>
                            </List>
                    </Grid>
                    
                    <Grid item xs={12} md={8} className="title-receta grid-ingredientes" style={{"backgroundColor":"transparent"}}>
                        PREPARACIÓN
                        <Grid className="list-ingredients">{receta.preparacion && <div dangerouslySetInnerHTML={{ __html: receta.preparacion }} />}</Grid>
                    </Grid>

                </Grid>
            </Grid>
        </>
    )
}


Recetas.layout = page => <Layout children={page} title="Comepasto - Recetas" pageTitle="Recetas" />

export default Recetas