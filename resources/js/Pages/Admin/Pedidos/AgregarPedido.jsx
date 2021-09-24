import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import route from 'ziggy-js';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../layouts/LayoutAdmin';
import '/css/admin.css';
import '/css/adminProductos.css';
import '/css/adminPedidos.css';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles((theme) => ({
    input: {
        fontFamily: "Oxygen",
        fontStyle: 'normal',
        fontSize: '15px',
        color: '#333333',
        borderColor: "#1DA3A8",
        "&:not(.Mui-disabled):hover::before": {
            borderColor: "#1DA3A8"
        }
    },
    formTextLabel: {
        fontFamily: 'Atma',
        fontSize: '15px',
        color: '#9E9E9E'
    }
}));

const theme = createMuiTheme({
    palette: {
        secondary: {
            // light: will be calculated from palette.primary.main,
            main: '#ff4400',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        primary: {
            light: '#0066ff',
            main: '#9c9c9c',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // error: will use the default color
    },
    status: {
        danger: 'orange',
    },
});

const currencies = [
    {
      value: '1',
      label: 'Lorem ipsum 1',
    },
    {
      value: '2',
      label: 'Lorem ipsum 2',
    },
    {
      value: '3',
      label: 'Lorem ipsum 3',
    },
    {
      value: '4',
      label: 'Lorem ipsum 4',
    },
  ];

const AgregarPedido = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // MODAL AGREGAR CLIENTE
    const [open, setOpen] = React.useState(false);

    const handleClickOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const classes = useStyles();

    return ( 
        <>
        <Container> 
            <Grid container style={{paddingTop:'34px'}}>
                {/* TOP PAGE, BACK BUTTON */}
                <Grid item xs={12} className="top-admin">
                    <InertiaLink href={route('admin.pedidos')} className="title-page subtitle-page"><ArrowBackIcon style={{marginRight:'9px'}} />Pedidos</InertiaLink>
                </Grid>

                <Grid item xs={12} >
                <form noValidate autoComplete="off" style={{marginBottom:'25px',display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <MuiThemeProvider theme={theme}>
                    <Grid item xs={12} sm={12} md={8}>
                        <Grid item xs={12} className="grid-section">
                            <Grid item xs={12} className="section-top-grid">
                                <Grid>Agregar pedido</Grid>
                            </Grid>
                            {/* contenido */}
                            <Grid item xs={12} style={{padding:'20px',display:'flex',alignItems:'flex-start',flexWrap:'wrap'}}>
                                <Grid item xs={12} style={{display:'flex',flexWrap:'wrap'}}>
                                    <TextField
                                        id="cliente"
                                        select
                                        label="Cliente"
                                        placeholder="Selecciona una opción"
                                        // style={{width:'100%'}}
                                        className="input-admin-100"
                                        InputProps={{className: classes.input,}}
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.formTextLabel
                                            }
                                        }}
                                        >
                                        {currencies.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <Grid className="link-add-bd" style={{width:'95%', margin:'0px 0px 15px 0px'}} onClick={handleClickOpenModal}>Agregar cliente</Grid>
                                </Grid>

                                {/* LOS 3 DATOS SIGUIENTES SE CARGARAN DEPENDIENDO DEL CLIENTE QUE SE AGREGUE O SELECCIONE, SI SE PUEDE, SI NO QUE NO SALGA TELEFONO Y DIRECCION */}
                                <Grid item xs={12} style={{display:'flex',flexWrap:'wrap'}}>
                                    <Grid item xs={12} sm={6}>
                                        <Grid item xs={12} className="title-item-info t-i-i-pedidos">PEDIDO REALIZADO DESDE</Grid>
                                        <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>Página de administración</Grid>
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
                                    <Grid item xs={12} sm={6} style={{display:'flex',flexWrap:'wrap'}}>
                                        <TextField
                                            id="tipoPago"
                                            select
                                            label="Tipo de pago"
                                            placeholder="Selecciona una opción"
                                            className="input-admin-50"
                                            style={{marginBottom:'25px'}}
                                            InputProps={{className: classes.input,}}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.formTextLabel
                                                }
                                            }}
                                            >
                                            {currencies.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{display:'flex',flexWrap:'wrap'}}>
                                        <TextField
                                            id="estatusPago"
                                            select
                                            label="Estatus del pago"
                                            className="input-admin-50"
                                            style={{marginBottom:'25px'}}
                                            InputProps={{className: classes.input,}}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.formTextLabel
                                                }
                                            }}
                                            >
                                            {currencies.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} style={{display:'flex',flexWrap:'wrap'}}>
                                    <Grid item xs={12} sm={6} style={{display:'flex',flexWrap:'wrap'}}>
                                        <TextField
                                            id="tipoEntrega"
                                            select
                                            label="Tipo de entrega"
                                            placeholder="Selecciona una opción"
                                            className="input-admin-50"
                                            style={{marginBottom:'25px'}}
                                            InputProps={{className: classes.input,}}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.formTextLabel
                                                }
                                            }}
                                            >
                                            {currencies.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{display:'flex',flexWrap:'wrap'}}>
                                        <TextField
                                            id="costosEnvio"
                                            type="number"
                                            label="Costos de envío"
                                            className="input-admin-50"
                                            style={{marginBottom:'25px'}}
                                            InputProps={{className: classes.input,}}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.formTextLabel
                                                }
                                            }}
                                            >
                                        </TextField>
                                    </Grid>
                                </Grid>



                                <Grid item xs={12} style={{display:'flex',flexWrap:'wrap'}}>
                                    <TextField
                                        id="observaciones"
                                        multiline
                                        label="Observaciones"
                                        className="input-admin-100"
                                        InputProps={{className: classes.input,}}
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.formTextLabel
                                            }
                                        }}
                                        >
                                    </TextField>
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
                                                <Grid>
                                                    <IconButton aria-label="delete">
                                                        <DeleteOutlineIcon />
                                                    </IconButton>
                                                </Grid>
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
                                            <TableCell align="right" className="body-row-txt">
                                                <TextField
                                                    id="cantidad"
                                                    type="number"
                                                    defaultValue="1"
                                                    style={{width:'50px'}}
                                                    InputProps={{className: classes.input,}}
                                                    InputLabelProps={{
                                                        classes: {
                                                            root: classes.formTextLabel
                                                        }
                                                    }}
                                                    >
                                                </TextField>
                                            </TableCell>
                                            <TableCell align="right" className="body-row-txt">$110.00</TableCell>
                                        </TableRow>

                                        <TableRow >
                                            <TableCell component="th" scope="row" className="body-row-txt" style={{display:'flex',alignItems:'center'}}>
                                                <Grid style={{width:'max-content'}} >
                                                    <InertiaLink href={route('admin.producto',1)}>
                                                        <img src="/img/icons/imgDefault.png" className="img-product-pedido" />
                                                    </InertiaLink>
                                                </Grid>
                                                <Grid style={{width:'90%'}}>
                                                    <Grid item xs={12}>
                                                            <TextField
                                                                id="newProduct"
                                                                select
                                                                label="Selecciona un producto"
                                                                style={{width:'100%'}}
                                                                InputProps={{className: classes.input,}}
                                                                InputLabelProps={{
                                                                    classes: {
                                                                        root: classes.formTextLabel
                                                                    }
                                                                }}>
                                                                {currencies.map((option) => (
                                                                    <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                    </MenuItem>
                                                                ))}
                                                                
                                                            </TextField>
                                                    </Grid>
                                                    <Grid item xs={12} className="txt-descuento">DESCUENTO 0%</Grid>
                                                </Grid>
                                                
                                            </TableCell>
                                            <TableCell align="right" className="body-row-txt">$0.00</TableCell>
                                            <TableCell align="right" className="body-row-txt">
                                                <TextField
                                                    id="cantidad"
                                                    type="number"
                                                    defaultValue="0"
                                                    style={{width:'50px'}}
                                                    InputProps={{className: classes.input,}}
                                                    InputLabelProps={{
                                                        classes: {
                                                            root: classes.formTextLabel
                                                        }
                                                    }}
                                                    >
                                                </TextField>
                                            </TableCell>
                                            <TableCell align="right" className="body-row-txt">$0.00</TableCell>
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
                                <div style={{padding:'20px 23px'}}>
                                    <Grid item xs={12}>
                                        <select type="number" className="input-stock" style={{width:'100%'}}>
                                            <option value="pendiente" selected>Pendiente</option>
                                            <option value="camino">En camino</option>
                                            <option value="entregado">Entregado</option>
                                        </select>
                                    </Grid>
                                    <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end',alignItems:'center',padding:'8px 24px',marginBottom:'10px',paddingRight:'0px',marginTop:'20px'}}>
                                        <InertiaLink href={route('admin.receta',1)} className="btn-cancelar-op">CANCELAR</InertiaLink>
                                        <Button
                                            className="button-filter button-update btn-second"
                                            type="submit"
                                            startIcon={<ArrowRightAltIcon />}
                                        >
                                            Guardar
                                        </Button>
                                    </Grid>
                                
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    </MuiThemeProvider>
                </form >
                </Grid>

            </Grid>
        </Container>

        {/* MODAL AGREGAR CLIENTE */}
        <Dialog
            open={open}
            onClose={handleCloseModal}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
        >
        <form noValidate autoComplete="off">
            <DialogTitle  className="title-dialog">{"Agregar cliente"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" className="dialog-content">
                <MuiThemeProvider>
                <Grid item xs={12}>
                    <TextField 
                        id="nombre" 
                        type="text"
                        label="Nombre completo" 
                        className="input-admin-100"
                        InputProps={{className: classes.input,}}
                        InputLabelProps={{
                            classes: {
                                root: classes.formTextLabel
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} style={{display:'flex',flexWrap:'wrap'}}>
                    <Grid item xs={12} sm={6} style={{display:'flex',flexWrap:'wrap'}}>
                        <TextField
                            id="correo"
                            label="Correo electrónico"
                            className="input-admin-50"
                            style={{marginBottom:'25px'}}
                            InputProps={{className: classes.input,}}
                            InputLabelProps={{
                                classes: {
                                    root: classes.formTextLabel
                                }
                            }}
                            >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{display:'flex',flexWrap:'wrap'}}>
                        <TextField
                            id="telefono"
                            type="phone"
                            label="Teléfono"
                            className="input-admin-50"
                            style={{marginBottom:'25px'}}
                            InputProps={{className: classes.input,}}
                            InputLabelProps={{
                                classes: {
                                    root: classes.formTextLabel
                                }
                            }}
                            >
                        </TextField>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{display:'flex',flexWrap:'wrap'}}>
                    <Grid item xs={12} sm={6} style={{display:'flex',flexWrap:'wrap'}}>
                        <TextField
                            id="password"
                            type="password"
                            label="Contraseña"
                            className="input-admin-50"
                            style={{marginBottom:'25px'}}
                            InputProps={{className: classes.input,}}
                            InputLabelProps={{
                                classes: {
                                    root: classes.formTextLabel
                                }
                            }}
                            >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{display:'flex',flexWrap:'wrap'}}>
                        <TextField
                            id="passConfi"
                            type="password"
                            label="Confirmar contraseña"
                            className="input-admin-50"
                            style={{marginBottom:'25px'}}
                            InputProps={{className: classes.input,}}
                            InputLabelProps={{
                                classes: {
                                    root: classes.formTextLabel
                                }
                            }}
                            >
                        </TextField>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        id="direccion" 
                        multiline
                        label="Dirección" 
                        className="input-admin-100"
                        InputProps={{className: classes.input,}}
                        InputLabelProps={{
                            classes: {
                                root: classes.formTextLabel
                            }
                        }}
                    />
                </Grid>





                </MuiThemeProvider>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end',alignItems:'center',padding:'8px 24px',marginBottom:'10px'}}>
                    <Grid className="btn-cancelar-op" onClick={handleCloseModal}>CANCELAR</Grid>
                    <Button
                        className="button-filter button-update btn-second"
                        type="submit"
                        startIcon={<ArrowRightAltIcon />}
                    >
                        Agregar
                    </Button>
                </Grid>
            </DialogActions>
        </form>
        </Dialog>

    </>
    )
}

AgregarPedido.layout = page => <Layout children={page} title="Comepasto - Pedidos" pageTitle="Pedidos" />

export default AgregarPedido