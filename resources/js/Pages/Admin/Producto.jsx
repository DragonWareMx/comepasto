import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import { makeStyles } from '@material-ui/core/styles';
import route from 'ziggy-js';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../layouts/LayoutAdmin';
import '/css/admin.css';
import '/css/adminProductos.css';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import OwlCarousel from 'react-owl-carousel'; 
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {DataGrid}  from '@material-ui/data-grid';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TuneIcon from '@material-ui/icons/Tune';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import UpdateIcon from '@material-ui/icons/Update';

import Receta from '../../components/Recetas/Receta';

const Producto = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const responsiveRecetas = {
        0: {
            items: 1,
        },
        600: {
            items: 2,
        },
        800: {
            items: 2,
            margin: 70
        },
        980: {
            items: 3,
            margin: 10
        },
        1120: {
            items: 3,
            margin: 50
        } 
    }

    return ( 
        <>
        <Container> 
            <Grid container style={{paddingTop:'34px'}}>
                {/* TOP PAGE, BACK BUTTON */}
                <Grid item xs={12} className="top-admin">
                    <InertiaLink href={route('admin.productos')} className="title-page subtitle-page"><ArrowBackIcon style={{marginRight:'9px'}} />Productos</InertiaLink>
                </Grid>

                <Grid item xs={12} style={{marginBottom:'25px',display:'flex',flexWrap:'wrap',justifyContent:'space-between'}}>
                    <Grid item xs={12} sm={12} md={8} className="grid-section">
                        <Grid item xs={12} className="section-top-grid">
                            <Grid>Información general</Grid>
                            <MoreVertIcon onClick={handleClick} />
                            <Menu
                                id="options-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <InertiaLink href="#!" style={{textDecoration:'none'}}> <MenuItem onClick={handleClose} className="option-menu">Editar <TuneIcon style={{marginleft:'5px', fontSize:'20px'}} /></MenuItem></InertiaLink>
                                <MenuItem onClick={handleClose} className="option-menu">Eliminar <DeleteOutlineIcon style={{marginLeft:'5px', fontSize:'20px'}} /></MenuItem>
                            </Menu>
                        </Grid>
                        {/* contenido */}
                        <Grid item xs={12} style={{padding:'20px',display:'flex',alignItems:'flex-start',flexWrap:'wrap'}}>
                            <Grid item xs={4} sm={1} style={{marginRight:'20px',marginBottom:'20px'}}>
                                <img src="/img/PRODUCTOS/1.png" className="img-product-view" />
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                {/* ITEM DE INFO */}
                                <Grid item xs={12} className="item-product-data">
                                    <Grid item xs={4} sm={2} className="title-item-info">ID</Grid>
                                    <Grid item xs={12} sm={10} className="item-info-txt">1223881</Grid>
                                </Grid>

                                <Grid item xs={12} className="item-product-data">
                                    <Grid item xs={4} sm={2} className="title-item-info">NOMBRE</Grid>
                                    <Grid item xs={12} sm={10} className="item-info-txt"><b>Nombre del producto Lorem ipsum dolor sit amet consectetur adipiscing</b></Grid>
                                </Grid>

                                <Grid item xs={12} className="item-product-data">
                                    <Grid item xs={4} sm={2} className="title-item-info">MARCA</Grid>
                                    <Grid item xs={12} sm={10} className="item-info-txt">Beyond Meat</Grid>
                                </Grid>

                                <Grid item xs={12} className="item-product-data">
                                    <Grid item xs={4}xs={12} sm={10} sm={2} className="title-item-info">ATRIBUTOS</Grid>
                                    <Grid item xs={12} sm={10} className="item-info-txt">1223881</Grid>
                                </Grid>
                                
                                <Grid item xs={12} className="item-product-data">
                                    <Grid item xs={4} sm={2} className="title-item-info">CATEGORÍAS</Grid>
                                    <Grid item xs={12} sm={10} className="item-info-txt">Embutidos, carnícos</Grid>
                                </Grid>

                                <Grid item xs={12} className="item-product-data">
                                    <Grid item xs={4} sm={2} className="title-item-info">TIPO</Grid>
                                    <Grid item xs={12} sm={10} className="item-info-txt">Lorem ipsum</Grid>
                                </Grid>

                                <Grid item xs={12} className="item-product-data">
                                    <Grid item xs={4} sm={2} className="title-item-info">PRESENTACIÓN</Grid>
                                    <Grid item xs={12} sm={10} className="item-info-txt">250 gr</Grid>
                                </Grid>

                                <Grid item xs={12} className="item-product-data">
                                    <Grid item xs={4} sm={2} className="title-item-info">PRECIO</Grid>
                                    <Grid item xs={12} sm={10} className="item-info-txt">$ 250.00 MXN</Grid>
                                </Grid>

                                <Grid item xs={12} className="item-product-data">
                                    <Grid item xs={4} sm={2} className="title-item-info">DESCUENTO</Grid>
                                    <Grid item xs={12} sm={10} className="item-info-txt">-0%</Grid>
                                </Grid>

                                <Grid item xs={12} className="item-product-data">
                                    <Grid item xs={12} sm={2} className="title-item-info">INGREDIENTES</Grid>
                                    <Grid item xs={12} sm={10} className="item-info-txt">Aceite de coco, vino blanco, agua, almidón modificado, almidón, saborizante natural y artificial, sal, goma de celulosa, sorbato de potasio, achiote, betacaroteno, ácido cítrico, vitamina B12.</Grid>
                                </Grid>
                            </Grid>
                        </Grid>


                    </Grid>
                    {/* GRID CONFIG STOCK */}
                    <Grid item xs={12} sm={4} className="grid-spacing-20">
                        <Grid className="grid-section">
                            <Grid item xs={12} className="section-top-grid" style={{padding:'23px'}}>
                                <Grid>Estatus del producto</Grid>
                            </Grid>
                            {/* FORM DE ACTUALIZACION DE STOCK */}
                            <form noValidate autoComplete="off" style={{padding:'20px 23px'}}>
                                {/* <TextField className="input-stock" id="stock-product" label="Stock" type="number" InputLabelProps={{ shrink: true }} variant="outlined" /> */}
                                <Grid item xs={12} style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                    <Grid className="label-input-custom">STOCK</Grid>
                                    <input type="number" className="input-stock" />
                                </Grid>
                                <Grid item xs={12} style={{display:'flex', justifyContent:'flex-end'}}>
                                    <Button
                                        className="button-filter button-update"
                                        type="submit"
                                        startIcon={<UpdateIcon />}
                                    >
                                        Actualizar
                                    </Button>
                                </Grid>
                            </form >
                        </Grid>
                    </Grid>
                    {/* Recetas relacionadas */}
                    <Grid item xs={12} className="grid-section">
                        <Grid item xs={12} className="section-top-grid" style={{padding:'23px'}}>
                            <Grid>Recetas con este producto</Grid>
                        </Grid>
                        <Grid style={{padding:'20px'}}>
                            {/* Componente de recetas y carrousel */}

                            {/* <OwlCarousel 
                                responsive={responsiveRecetas}   
                                rewind
                                dots={true}
                                autoplay 
                                autoplayTimeout={10000} 
                                autoplayHoverPause
                                margin={10}
                                className='owl-theme'
                            > 
                            {recipes.map((recipe) => (
                                <div key={recipe.id + "receta"}>
                                    <Receta
                                        img={recipe.img.length > 0 ? recipe.img[0].url : "default.jpg"}
                                        nombre={recipe.nombre}
                                        id={recipe.id}
                                        descripcion={recipe.img[0].descripcion}
                                    />
                                </div>
                            ))
                            }
                            </OwlCarousel> */}
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Container>
    </>
    )
}

Producto.layout = page => <Layout children={page} title="Comepasto - Productos" pageTitle="Productos" />

export default Producto