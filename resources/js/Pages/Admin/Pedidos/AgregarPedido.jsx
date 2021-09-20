import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import { makeStyles } from '@material-ui/core/styles';
import route from 'ziggy-js';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../layouts/LayoutAdmin';
import '/css/admin.css';
import '/css/adminProductos.css';
import '/css/adminPedidos.css';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TuneIcon from '@material-ui/icons/Tune';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import UpdateIcon from '@material-ui/icons/Update';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const AgregarPedido = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return ( 
        <>
        <Container> 
            <Grid container style={{paddingTop:'34px'}}>
                {/* TOP PAGE, BACK BUTTON */}
                <Grid item xs={12} className="top-admin">
                    <InertiaLink href={route('admin.pedidos')} className="title-page subtitle-page"><ArrowBackIcon style={{marginRight:'9px'}} />Pedidos</InertiaLink>
                </Grid>

                <Grid item xs={12} style={{marginBottom:'25px',display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={12} md={8}>
                        <Grid item xs={12} className="grid-section">
                            <Grid item xs={12} className="section-top-grid">
                                <Grid>Agregar pedido</Grid>
                            </Grid>
                            {/* contenido */}
                            <Grid item xs={12} style={{padding:'20px',display:'flex',alignItems:'flex-start',flexWrap:'wrap'}}>
                                <Grid item xs={12} style={{display:'flex',flexWrap:'wrap'}}>
                                    <Grid item xs={12} sm={6}>
                                        <Grid item xs={12} className="title-item-info t-i-i-pedidos">ID</Grid>
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>#1223881</Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Grid item xs={12} className="title-item-info t-i-i-pedidos">PEDIDO REALIZADO DESDE</Grid>
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>Página web</Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{display:'flex',flexWrap:'wrap'}}>
                                    <Grid item xs={12} sm={6}>
                                        <Grid item xs={12} className="title-item-info t-i-i-pedidos">CLIENTE</Grid>
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>Lorem ipsum dolor sit amet</Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Grid item xs={12} className="title-item-info t-i-i-pedidos">TELÉFONO</Grid>
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>44 44 44 44 44</Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item xs={12} className="title-item-info t-i-i-pedidos">DIRECCIÓN</Grid>
                                    <Grid item xs={12}className="item-info-txt i-i-t-pedidos mg-0" style={{padding:'0px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</Grid>
                                </Grid>
                            </Grid>


                        </Grid>
                        
                        <Grid item xs={12} className="grid-section">
                            <Grid item xs={12} className="section-top-grid">
                                <Grid>Información de pago y entrega</Grid>
                            </Grid>
                            {/* contenido */}
                            <Grid item xs={12} style={{padding:'20px',display:'flex',alignItems:'flex-start',flexWrap:'wrap'}}>
                                <Grid item xs={12} style={{display:'flex',flexWrap:'wrap'}}>
                                    <Grid item xs={12} sm={6}>
                                        <Grid item xs={12} className="title-item-info t-i-i-pedidos">TIPO DE PAGOx</Grid>
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>Efectivo</Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Grid item xs={12} className="title-item-info t-i-i-pedidos">ESTATUS DEL PAGO</Grid>
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>Página web</Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{display:'flex',flexWrap:'wrap'}}>
                                    <Grid item xs={12} sm={6}>
                                        <Grid item xs={12} className="title-item-info t-i-i-pedidos">TIPO DE ENTREGA</Grid>
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>Lorem ipsum dolor sit</Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Grid item xs={12} className="title-item-info t-i-i-pedidos">COSTOS DE ENVÍO</Grid>
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>$90.00</Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item xs={12} className="title-item-info t-i-i-pedidos">OBSERVACIONES</Grid>
                                    <Grid item xs={12}className="item-info-txt i-i-t-pedidos mg-0" style={{padding:'0px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} className="grid-section">
                            <Grid item xs={12} className="section-top-grid">
                                <Grid>Items del pedido</Grid>
                            </Grid>
                            {/* contenido */}
                            <TableContainer >
                                <Table  aria-label="simple table">
                                    <TableHead style={{backgroundColor:'#F3F4F7'}}>
                                    <TableRow>
                                        <TableCell className="head-column-txt">PRODUCTO</TableCell>
                                        <TableCell align="right" className="head-column-txt">PRECIO</TableCell>
                                        <TableCell align="right" className="head-column-txt">CANTIDAD</TableCell>
                                        <TableCell align="right" className="head-column-txt">TOTAL</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow >
                                            <TableCell component="th" scope="row" className="body-row-txt" style={{display:'flex',alignItems:'center'}}>
                                                <Grid style={{width:'max-content'}} >
                                                    <InertiaLink href={route('admin.producto',1)}>
                                                        <img src="/img/PRODUCTOS/1.png" className="img-product-pedido" />
                                                    </InertiaLink>
                                                </Grid>
                                                <Grid>
                                                    {/* Max, 50 caracteres */}
                                                    <Tooltip title="Nombre completo del producto" placement="top-start">
                                                        <Grid item xs={12}>
                                                            <InertiaLink href={route('admin.producto',1)} style={{textDecoration:'none',color:'#474747'}}>
                                                                Lorem ipsum dolor sit amet consectetur adipisicing...
                                                            </InertiaLink>
                                                        </Grid>
                                                    </Tooltip>
                                                    <Grid item xs={12} className="txt-descuento">DESCUENTO 0%</Grid>
                                                </Grid>
                                                
                                            </TableCell>
                                            <TableCell align="right" className="body-row-txt">$55.00</TableCell>
                                            <TableCell align="right" className="body-row-txt">2</TableCell>
                                            <TableCell align="right" className="body-row-txt">$110.00</TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row" className="body-row-txt">Costos de envío</TableCell>
                                            <TableCell align="right" className="body-row-txt"> </TableCell>
                                            <TableCell align="right" className="body-row-txt"> </TableCell>
                                            <TableCell align="right" className="body-row-txt">$90.00</TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row" className="body-row-txt">Total</TableCell>
                                            <TableCell align="right" className="body-row-txt"> </TableCell>
                                            <TableCell align="right" className="body-row-txt"> </TableCell>
                                            <TableCell align="right" className="body-row-txt"><b>$200.00</b></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                </TableContainer>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                    {/* GRID CONFIG STOCK */}
                        <Grid item xs={12}  className="grid-spacing-20">
                            <Grid className="grid-section">
                                <Grid item xs={12} className="section-top-grid" style={{padding:'23px'}}>
                                    <Grid>Estatus del producto</Grid>
                                </Grid>
                                {/* FORM DE ACTUALIZACION DE STOCK */}
                                <form noValidate autoComplete="off" style={{padding:'20px 23px'}}>
                                    <Grid item xs={12}>
                                        <select type="number" className="input-stock" style={{width:'100%'}}>
                                            <option value="pendiente" selected>Pendiente</option>
                                            <option value="camino">En camino</option>
                                            <option value="entregado">Entregado</option>
                                        </select>
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
                    </Grid>
                </Grid>

            </Grid>
        </Container>

    </>
    )
}

AgregarPedido.layout = page => <Layout children={page} title="Comepasto - Pedidos" pageTitle="Pedidos" />

export default AgregarPedido