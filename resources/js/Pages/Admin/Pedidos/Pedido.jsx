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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TuneIcon from '@material-ui/icons/Tune';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import UpdateIcon from '@material-ui/icons/Update';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Pedido = () => {
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
                    <InertiaLink href={route('admin.pedidos')} className="title-page subtitle-page"><ArrowBackIcon style={{marginRight:'9px'}} />Pedidos</InertiaLink>
                </Grid>

                <Grid item xs={12} style={{marginBottom:'25px',display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={12} md={8}>
                        <Grid item xs={12} className="grid-section">
                            <Grid item xs={12} className="section-top-grid">
                                <Grid>Información del pedido</Grid>
                                <MoreVertIcon onClick={handleClick} style={{cursor:'pointer'}} />
                                <Menu
                                    id="options-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <InertiaLink href="#!" style={{textDecoration:'none'}}> <MenuItem onClick={handleClose} className="option-menu">Editar <TuneIcon style={{marginleft:'5px', fontSize:'20px'}} /></MenuItem></InertiaLink>
                                    <MenuItem  onClick={handleClickOpenModal} className="option-menu">Eliminar <DeleteOutlineIcon style={{marginLeft:'5px', fontSize:'20px'}} /></MenuItem>
                                </Menu>
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
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>No aplica</Grid>
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
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>PRODUCTO</TableCell>
                                        <TableCell align="right">PRECIO</TableCell>
                                        <TableCell align="right">CANTIDAD</TableCell>
                                        <TableCell align="right">TOTAL</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow >
                                        <TableCell component="th" scope="row">
                                            name
                                        </TableCell>
                                        <TableCell align="right">sfs</TableCell>
                                        <TableCell align="right">sfsf</TableCell>
                                        <TableCell align="right">gfdg</TableCell>
                                        <TableCell align="right">fgfd</TableCell>
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
                                <Grid className="update-text">Última actualización: 20/08/2021  10:05</Grid>
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
                            <Grid item xs={12} style={{borderTop:'1px solid #DDDDDD',padding:'20px 23px'}}>
                                
                                <Grid item xs={12} className="item-timeline"><CheckCircleIcon style={{color:'#1DA3A8',fontSize:'38px',marginRight:'16px'}} /> PEDIDO EL 21/08/2021 14:59</Grid>
                                <hr className="hr-timeline" />
                                <Grid item xs={12} className="item-timeline"><CheckCircleIcon style={{color:'#1DA3A8',fontSize:'38px',marginRight:'16px'}} /> PROCESADO</Grid>
                                <hr className="hr-timeline" />
                                <Grid item xs={12} className="item-timeline"><CheckCircleIcon style={{color:'#1DA3A8',fontSize:'38px',marginRight:'16px'}} /> EN CAMINO</Grid>
                                <hr className="hr-timeline" />
                                <Grid item xs={12} className="item-timeline"><CheckCircleIcon style={{color:'#CCCCCC',fontSize:'38px',marginRight:'16px'}} /> COMPLETADO</Grid>
                            </Grid>

                            <Grid item xs={12} className="button-pay"><CheckCircleOutlineIcon style={{marginRight:'25px'}} />Marcar como pagado</Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Container>

        <Dialog
            open={open}
            onClose={handleCloseModal}
        >
            <DialogTitle  className="title-dialog">{"¿Estás seguro que deseas eliminar este pedido?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" className="dialog-content">
                Toda la información relacionada con este pedidos se verá afectada por esta acción.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <form noValidate autoComplete="off">
                <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end',alignItems:'center',padding:'8px 24px',marginBottom:'10px'}}>
                    <Grid className="btn-cancelar-op" onClick={handleCloseModal}>CANCELAR</Grid>
                    <Button
                        className="button-filter button-update btn-second"
                        type="submit"
                        startIcon={<DeleteOutlineIcon />}
                    >
                        Eliminar
                    </Button>
                </Grid>
                </form>
            </DialogActions>
        </Dialog>
    </>
    )
}

Pedido.layout = page => <Layout children={page} title="Comepasto - Pedidos" pageTitle="Pedidos" />

export default Pedido