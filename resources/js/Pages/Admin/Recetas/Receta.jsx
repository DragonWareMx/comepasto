import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import { makeStyles } from '@material-ui/core/styles';
import route from 'ziggy-js';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../layouts/LayoutAdmin';
import '/css/admin.css';
import '/css/adminRecetas.css';
import '/css/adminPedidos.css';
import '/css/adminProductos.css';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TuneIcon from '@material-ui/icons/Tune';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';


const Receta = ({receta, productos}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // MODAL
    const [open, setOpen] = React.useState(false);

    const handleClickOpenModal = () => {
        setOpen(true);
        setAnchorEl(null);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    return ( 
        <>
        <Container> 
            <Grid container style={{paddingTop:'34px'}}>
                {/* TOP PAGE, BACK BUTTON */}
                <Grid item xs={12} className="top-admin">
                    <button onClick={() => {history.back()}} className="title-page subtitle-page" style={{background: "none", border: "none", cursor: "pointer", padding: 0}} ><ArrowBackIcon style={{marginRight:'9px'}} />Recetas</button>
                </Grid>

                <Grid item xs={12} style={{marginBottom:'25px',display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={12} md={8} className="grid-section">
                        <Grid item xs={12} className="section-top-grid">
                            <Grid>Información general</Grid>
                            <MoreVertIcon onClick={handleClick} style={{cursor:'pointer'}} />
                            <Menu
                                id="options-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <InertiaLink href={route('admin.receta.editar',receta.recipe_id)} style={{textDecoration:'none'}}> <MenuItem onClick={handleClose} className="option-menu">Editar <TuneIcon style={{marginleft:'5px', fontSize:'20px'}} /></MenuItem></InertiaLink>
                                <MenuItem  onClick={handleClickOpenModal} className="option-menu">Eliminar <DeleteOutlineIcon style={{marginLeft:'5px', fontSize:'20px'}} /></MenuItem>
                            </Menu>
                        </Grid>
                        {/* contenido */}
                        <Grid item xs={12} style={{padding:'20px',display:'flex',alignItems:'flex-start',flexWrap:'wrap'}}>
                            <Grid item xs={12} md={6}>
                                <img src={"/storage/recetas/" + receta.url} className="img-receta-admin" />
                            </Grid>
                            <Grid item xs={12} md={6} className="grid-derecho-title-re"> 
                                <Grid item xs={12} style={{marginBottom:'36px'}}>
                                    <Grid item xs={12} className="title-item-info t-i-i-pedidos">NOMBRE</Grid>
                                    <Grid item xs={12}className="item-info-txt i-i-t-pedidos mg-0" style={{padding:'0px'}}>{receta.nombre}</Grid>
                                </Grid>
                                <Grid item xs={12} style={{marginBottom:'36px'}}>
                                    <Grid item xs={12} className="title-item-info t-i-i-pedidos">DESCRIPCIÓN</Grid>
                                    <Grid item xs={12}className="item-info-txt i-i-t-pedidos mg-0" style={{padding:'0px'}}>{receta.descripcion}</Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{marginBottom:'36px'}}>
                                <Grid item xs={12} className="title-item-info t-i-i-pedidos">INGREDIENTES</Grid>
                                <Grid item xs={12}className="item-info-txt i-i-t-pedidos mg-0" style={{padding:'0px'}}>
                                    {receta.ingredientes && <div dangerouslySetInnerHTML={{ __html: receta.ingredientes }} />}
                                    </Grid>
                            </Grid>
                            <Grid item xs={12} style={{marginBottom:'36px'}}>
                                <Grid item xs={12} className="title-item-info t-i-i-pedidos">PREPARACIÓN</Grid>
                                <Grid item xs={12}className="item-info-txt i-i-t-pedidos mg-0" style={{padding:'0px'}}>
                                    {receta.preparacion && <div dangerouslySetInnerHTML={{ __html: receta.preparacion }} />}
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item xs={12} className="title-item-info t-i-i-pedidos">LINK</Grid>
                                <Grid item xs={12}className="item-info-txt i-i-t-pedidos mg-0" style={{padding:'0px'}}>
                                    <a href={receta.link} target="_blank" style={{color:"#1DA3A8"}}>{receta.link}</a>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* GRID CONFIG STOCK */}
                    <Grid item xs={12} sm={6} md={4} className="grid-spacing-20">
                        <Grid className="grid-section">
                            <Grid item xs={12} className="section-top-grid" style={{padding:'23px'}}>
                                <Grid>Productos de comepasto</Grid>
                            </Grid>

                            {productos && productos.map(producto=>(
                            <Grid item xs={12} className="item-pro-receta" key={producto.id + "producto"} id={producto.id}>
                                <Grid item xs={2} className="img-pro-receta">
                                    <img src={"/storage/products/" + producto.foto} />
                                </Grid>
                                <Grid item xs={10}>
                                    <Tooltip title={producto.name} arrow placement="top-start">
                                        <InertiaLink href={route('admin.producto',1)} style={{textDecoration:'none'}}>
                                            <Typography xs={12} className="title-pro-receta" noWrap>
                                                {producto.name}
                                            </Typography>
                                        </InertiaLink>
                                    </Tooltip>
                                    <Typography xs={12} className="type-pro-receta" style={{textTransform:'capitalize'}}>{producto.categoria}</Typography>
                                </Grid>
                            </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Container>

        <Dialog
            open={open}
            onClose={handleCloseModal}
        >
            <DialogTitle  className="title-dialog">{"¿Estás seguro que deseas eliminar esta receta?"}</DialogTitle>
            <DialogActions>
                <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end',alignItems:'center',padding:'8px 24px',marginBottom:'10px'}}>
                    <Grid className="btn-cancelar-op" onClick={handleCloseModal}>CANCELAR</Grid>
                    <InertiaLink
                        href={route('admin.receta.eliminar',receta.id)}
                        method="delete"
                        className="button-filter button-update btn-second"
                        style={{display:'flex',alignItems:'center', textDecoration: 'none', borderRadius:'4px'}}
                    >
                        <DeleteOutlineIcon style={{marginRight:'8px', fontSize:'20px'}}></DeleteOutlineIcon>
                        ELIMINAR
                    </InertiaLink>
                </Grid>
            </DialogActions>
        </Dialog>
    </>
    )
}

Receta.layout = page => <Layout children={page} title="Comepasto - Recetas" pageTitle="Recetas" />

export default Receta