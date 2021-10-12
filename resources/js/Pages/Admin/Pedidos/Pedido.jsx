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
import Tooltip from '@material-ui/core/Tooltip';
import Alert from '@material-ui/lab/Alert';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import UpdateIcon from '@material-ui/icons/Update';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Pedido = ({pedido}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // MODAL
    const [open, setOpen] = React.useState(false);
    const [openConfirmacion, setOpenConfirmacion] = React.useState(false);

    const handleClickOpenModal = () => {
        setOpen(true);
        setAnchorEl(null);
    };

    const handleClickOpenModalConfirmacion = () => {
        setOpenConfirmacion(true);
    }

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleCloseModalConfirmacion = () => {
        setOpenConfirmacion(false);
    };

    const [values, setValues] = React.useState({
        estatus: pedido.status || '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.patch(route('admin.pedido.patch',pedido.id),values)
    }

    function handlePago(e) {
        e.preventDefault()
        Inertia.patch(route('admin.pedido.pagado',pedido.id))
        setOpenConfirmacion(false);
    }

    function pedidoDelete(e){
        e.preventDefault()
        Inertia.delete(route('admin.pedido.delete',pedido.id))
        setOpen(false);
    }

    function dateFormat(date) {
        var date = new Date(date)
        var month = date.getMonth()
        if(month < 10) month = '0'+month
        var day = date.getDate()
        if(day < 10) day= '0'+day
        var year = date.getFullYear()
        var hours = date.getHours();
        if(hours < 10) hours= '0'+hours
        var minutes = date.getMinutes();
        if(minutes < 10) minutes= '0'+minutes
        return day + "/" + month + "/" + year + " " + hours + ":" + minutes 
    }

    return ( 
        <>
        <Container> 
            <Grid container style={{paddingTop:'34px'}}>
                {/* TOP PAGE, BACK BUTTON */}
                <Grid item xs={12} className="top-admin">
                    <InertiaLink href={route('admin.pedidos')} className="title-page subtitle-page"><ArrowBackIcon style={{marginRight:'9px'}} />Pedidos</InertiaLink>
                </Grid>

                {pedido.deleted_at &&
                    <Grid item xs={12} style={{marginBottom: 20}} >
                        <Alert severity="warning" 
                        action={
                            <Button color="inherit" size="small" onClick={() => { Inertia.put(route('admin.pedido.restore', pedido.id)) }}>
                                RESTAURAR
                            </Button>
                        }
                        >
                            Este pedido ha sido eliminado.
                        </Alert>
                    </Grid>
                }

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
                                    <MenuItem  onClick={handleClickOpenModal} className="option-menu">Eliminar <DeleteOutlineIcon style={{marginLeft:'5px', fontSize:'20px'}} /></MenuItem>
                                </Menu>
                            </Grid>
                            {/* contenido */}
                            <Grid item xs={12} style={{padding:'20px',display:'flex',alignItems:'flex-start',flexWrap:'wrap'}}>
                                <Grid item xs={12} style={{display:'flex',flexWrap:'wrap'}}>
                                    <Grid item xs={12} sm={6}>
                                        <Grid item xs={12} className="title-item-info t-i-i-pedidos">ID</Grid>
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>#{pedido.id}</Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Grid item xs={12} className="title-item-info t-i-i-pedidos">PEDIDO REALIZADO DESDE</Grid>
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>Página web</Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{display:'flex',flexWrap:'wrap'}}>
                                    <Grid item xs={12} sm={6}>
                                        <Grid item xs={12} className="title-item-info t-i-i-pedidos">CLIENTE</Grid>
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>{pedido.client.name}</Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Grid item xs={12} className="title-item-info t-i-i-pedidos">TELÉFONO</Grid>
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>{pedido.client.tel && pedido.client.tel}</Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item xs={12} className="title-item-info t-i-i-pedidos">DIRECCIÓN</Grid>
                                    <Grid item xs={12}className="item-info-txt i-i-t-pedidos mg-0" style={{padding:'0px'}}>{pedido.direccion ? pedido.direccion : 'En tienda'}</Grid>
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
                                        <Grid item xs={12} className="title-item-info t-i-i-pedidos">TIPO DE PAGO</Grid>
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>{pedido.formaPago}</Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Grid item xs={12} className="title-item-info t-i-i-pedidos">ESTATUS DEL PAGO</Grid>
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>{pedido.statusPago == 0 ? 'Pendiente' : 'Pagado'}</Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{display:'flex',flexWrap:'wrap'}}>
                                    <Grid item xs={12} sm={6}>
                                        <Grid item xs={12} className="title-item-info t-i-i-pedidos">TIPO DE ENTREGA</Grid>
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>{pedido.tipo_entrega}</Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Grid item xs={12} className="title-item-info t-i-i-pedidos">COSTO DE ENVÍO</Grid>
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>${pedido.costoEnvio}</Grid>
                                    </Grid>
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <Grid item xs={12} className="title-item-info t-i-i-pedidos">OBSERVACIONES</Grid>
                                    <Grid item xs={12}className="item-info-txt i-i-t-pedidos mg-0" style={{padding:'0px'}}>######################</Grid>
                                </Grid> */}
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
                                        {pedido.product && pedido.product.map((product, index)=>(
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row" className="body-row-txt" style={{display:'flex',alignItems:'center'}}>
                                                    <Grid style={{width:'max-content'}} >
                                                        <InertiaLink href={route('admin.producto',product.id)}>
                                                            <img src={product.foto && '/img/PRODUCTOS/'+product.foto} className="img-product-pedido" />
                                                        </InertiaLink>
                                                    </Grid>
                                                    <Grid>
                                                        {/* Max, 50 caracteres */}
                                                        <Tooltip title="Nombre completo del producto" placement="top-start">
                                                            <Grid item xs={12}>
                                                                <InertiaLink href={route('admin.producto',1)} style={{textDecoration:'none',color:'#474747'}}>
                                                                    {product.name}
                                                                </InertiaLink>
                                                            </Grid>
                                                        </Tooltip>
                                                        <Grid item xs={12} className="txt-descuento">DESCUENTO {product.pivot.descuento}%</Grid>
                                                    </Grid>  
                                                </TableCell>
                                                <TableCell align="right" className="body-row-txt">${product.pivot.precio}</TableCell>
                                                <TableCell align="right" className="body-row-txt">{product.pivot.cantidad}</TableCell>
                                                <TableCell align="right" className="body-row-txt">${product.pivot.precio * product.pivot.cantidad}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow >
                                            <TableCell component="th" scope="row" className="body-row-txt">Costo de envío</TableCell>
                                            <TableCell align="right" className="body-row-txt"> </TableCell>
                                            <TableCell align="right" className="body-row-txt"> </TableCell>
                                            <TableCell align="right" className="body-row-txt">${pedido.costoEnvio}</TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell component="th" scope="row" className="body-row-txt">Total</TableCell>
                                            <TableCell align="right" className="body-row-txt"> </TableCell>
                                            <TableCell align="right" className="body-row-txt"> </TableCell>
                                            <TableCell align="right" className="body-row-txt"><b>${pedido.total}</b></TableCell>
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
                            <form autoComplete="off" style={{padding:'20px 23px'}} onSubmit={handleSubmit}>
                                <Grid item xs={12}>
                                    <select type="number" className="input-stock" style={{width:'100%'}} value={values.estatus} onChange={handleChange('estatus')}>
                                        <option value="pendiente" selected>Pendiente</option>
                                        <option value="en camino">En camino</option>
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
                                
                                <Grid item xs={12} className="item-timeline"><CheckCircleIcon style={{color:'#1DA3A8',fontSize:'38px',marginRight:'16px'}} /> PEDIDO EL {pedido.created_at && dateFormat(pedido.created_at)}</Grid>
                                <hr className="hr-timeline" />
                                <Grid item xs={12} className="item-timeline"><CheckCircleIcon style={{color:'#1DA3A8',fontSize:'38px',marginRight:'16px'}} /> PROCESADO</Grid>
                                <hr className="hr-timeline" />
                                {(pedido.status == 'en camino' || pedido.status == 'entregado') ? 
                                    <Grid item xs={12} className="item-timeline"><CheckCircleIcon style={{color:'#1DA3A8',fontSize:'38px',marginRight:'16px'}} /> EN CAMINO</Grid>
                                    :
                                    <Grid item xs={12} className="item-timeline"><CheckCircleIcon style={{color:'#CCCCCC',fontSize:'38px',marginRight:'16px'}} /> EN CAMINO</Grid>
                                }
                                <hr className="hr-timeline" />
                                {pedido.status == 'entregado' ?
                                    <Grid item xs={12} className="item-timeline"><CheckCircleIcon style={{color:'#1DA3A8',fontSize:'38px',marginRight:'16px'}} /> COMPLETADO</Grid>
                                    :
                                    <Grid item xs={12} className="item-timeline"><CheckCircleIcon style={{color:'#CCCCCC',fontSize:'38px',marginRight:'16px'}} /> COMPLETADO</Grid>
                                }
                            </Grid>

                            {!pedido.statusPago &&
                                <Grid item xs={12} onClick={handleClickOpenModalConfirmacion} className="button-pay"><CheckCircleOutlineIcon style={{marginRight:'25px'}} />Marcar como pagado</Grid>
                            }
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
                Toda la información relacionada con este pedido se verá afectada por esta acción.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <form noValidate autoComplete="off" onSubmit={pedidoDelete}>
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

        <Dialog
            open={openConfirmacion}
            onClose={handleCloseModalConfirmacion}
        >
            <DialogTitle  className="title-dialog">{"¿Estás seguro que deseas marcar este pedido como pagado?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" className="dialog-content">
                Está acción no podrá ser revertida.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <form noValidate autoComplete="off" onSubmit={handlePago}>
                <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end',alignItems:'center',padding:'8px 24px',marginBottom:'10px'}}>
                    <Grid className="btn-cancelar-op" onClick={handleCloseModalConfirmacion}>CANCELAR</Grid>
                    <Button
                        className="button-filter button-update btn-second"
                        type="submit"
                        startIcon={<CheckCircleOutlineIcon />}
                    >
                        Marcar
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