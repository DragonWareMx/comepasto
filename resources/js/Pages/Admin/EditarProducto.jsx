import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import route from 'ziggy-js';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../layouts/LayoutAdmin';
import '/css/admin.css';
import '/css/adminProductos.css';

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
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PublishIcon from '@material-ui/icons/Publish';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

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

const EditarProducto = () => {
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

    // Select
    const [currency, setCurrency] = React.useState('1');

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

    const handleDelete = () => {

    };

    const classes = useStyles();

    return ( 
        <>
        <Container> 
            <Grid container style={{paddingTop:'34px'}}>
                {/* TOP PAGE, BACK BUTTON */}
                <Grid item xs={12} className="top-admin">
                    <InertiaLink href={route('admin.productos')} className="title-page subtitle-page"><ArrowBackIcon style={{marginRight:'9px'}} />Productos</InertiaLink>
                </Grid>
               
                <Grid item xs={12} className="grid-section">
                    <Grid item xs={12} className="section-top-grid">
                        <Grid>Editar producto</Grid>
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
                        <Grid item xs={4} sm={2} style={{marginBottom:'20px',display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
                            <img src="/img/PRODUCTOS/1.png" className="img-product-view" />
                            <input
                                accept="image/*"
                                id="contained-button-file"
                                type="file"
                                style={{display:'none'}}
                            />
                            <label htmlFor="contained-button-file" style={{marginTop:'20px'}}>
                                <Button variant="contained" className="button-add" startIcon={<PublishIcon />} component="span">
                                Editar
                                </Button>
                            </label>
                        </Grid>
                        <Grid item xs={12} sm={10} className="container-inputs">
                        <form noValidate autoComplete="off">
                        <MuiThemeProvider theme={theme}>
                            <Grid item xs={12}>
                                <TextField 
                                    id="nombre" 
                                    type="text"
                                    label="Nombre" 
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
                                        id="marca"
                                        select
                                        label="Marca"
                                        placeholder="Selecciona una opción"
                                        className="input-admin-50"
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
                                    <InertiaLink className="link-add-bd">Agregar marca</InertiaLink>
                                </Grid>
                                <Grid item xs={12} sm={6} style={{display:'flex',flexWrap:'wrap'}}>
                                    <TextField
                                        id="tipo"
                                        select
                                        label="Tipo"
                                        className="input-admin-50"
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
                                    <InertiaLink className="link-add-bd">Agregar tipo</InertiaLink>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} style={{display:'flex',flexWrap:'wrap'}}>
                                <Grid item xs={12} sm={6} style={{display:'flex',flexWrap:'wrap'}}>
                                    <TextField
                                        id="categorias"
                                        select
                                        label="Categorías"
                                        className="input-admin-50"
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
                                    
                                    <Chip onDelete={handleDelete} label="Categoría 1" className="chip-categoria" />
                                    <Chip onDelete={handleDelete} label="Categoría 2" className="chip-categoria" />
                                    
                                    <InertiaLink className="link-add-bd">Agregar categoría</InertiaLink>
                                </Grid>
                                <Grid item xs={12} sm={6} style={{marginBottom:'20px'}}>
                                    <TextField
                                        id="presentacion"
                                        type="text"
                                        label="Presentación"
                                        className="input-admin-50"
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
                                <Grid item xs={12} sm={6} style={{marginBottom:'20px'}}>
                                    <TextField
                                        id="precio"
                                        type="number"
                                        label="Precio"
                                        className="input-admin-50"
                                        InputProps={{className: classes.input,}}
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.formTextLabel
                                            }
                                        }}
                                        >
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6} style={{marginBottom:'20px'}}>
                                    <TextField
                                        id="descuento"
                                        type="number"
                                        label="Descuento (%)"
                                        className="input-admin-50"
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
                                    id="ingredientes" 
                                    multiline
                                    label="Ingredientes" 
                                    className="input-admin-100"
                                    InputProps={{className: classes.input,}}
                                    InputLabelProps={{
                                    classes: {
                                        root: classes.formTextLabel
                                    }
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox checked={state.checkedA} className="checkbox-admin" onChange={handleChange} name="checkedA" />}
                                    id="soya"
                                    label="Producto libre de soya"
                                    className="checkbox-label"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={state.checkedB} className="checkbox-admin" onChange={handleChange} name="checkedB" />}
                                    id="gluten"
                                    label="Producto libre de gluten"
                                    className="checkbox-label"
                                />
                            </Grid>

                            <Grid className="input-admin-100" style={{display:'flex',justifyContent:'flex-end',alignItems:'center',padding:'8px 24px',marginBottom:'10px',paddingRight:'0px',marginTop:'20px'}}>
                                <InertiaLink href={route('admin.producto',1)} className="btn-cancelar-op">CANCELAR</InertiaLink>
                                <Button
                                    className="button-filter button-update btn-second"
                                    type="submit"
                                    startIcon={<ArrowRightAltIcon />}
                                >
                                    Guardar
                                </Button>
                            </Grid>
                        </MuiThemeProvider>
                        </form>
                        </Grid>
                        
                    </Grid>



                </Grid>
            </Grid>
        </Container>
        <Dialog
            open={open}
            onClose={handleCloseModal}
            // aria-labelledby="alert-dialog-title"
            // aria-describedby="alert-dialog-description"
        >
            <DialogTitle  className="title-dialog">{"¿Estás seguro que deseas eliminar este producto?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" className="dialog-content">
                Toda la información relacionada con este producto se verá afectada por esta acción.
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

EditarProducto.layout = page => <Layout children={page} title="Comepasto - Productos" pageTitle="Productos" />

export default EditarProducto