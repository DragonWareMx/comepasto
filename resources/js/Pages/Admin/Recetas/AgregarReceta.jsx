import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import IconButton from '@material-ui/core/IconButton';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PublishIcon from '@material-ui/icons/Publish';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
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

const AgregarReceta = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const classes = useStyles();

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

    return ( 
        <>
        <Container> 
            <Grid container style={{paddingTop:'34px'}}>
                {/* TOP PAGE, BACK BUTTON */}
                <Grid item xs={12} className="top-admin">
                    <InertiaLink href={route('admin.recetas')} className="title-page subtitle-page"><ArrowBackIcon style={{marginRight:'9px'}} />Recetas</InertiaLink>
                </Grid>

                <form noValidate autoComplete="off">
                <Grid item xs={12} style={{marginBottom:'25px',display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={12} md={8} className="grid-section">
                        <Grid item xs={12} className="section-top-grid">
                            <Grid>Agregar receta</Grid>
                        </Grid>
                        {/* contenido */}
                        <Grid item xs={12} style={{padding:'20px',display:'flex',alignItems:'flex-start',flexWrap:'wrap'}}>
                            <Grid item xs={12} style={{display:'flex',alignItems:'flex-end',flexWrap:'wrap'}}>
                                <Grid item xs={12} md={6}>
                                    <img src="/img/RECETAS/default.png" className="img-receta-admin" />
                                </Grid>
                                <Grid className="grid-derecho-title-re" style={{paddingBottom:'5px'}}>
                                    <input
                                        accept="image/*"
                                        id="contained-button-file"
                                        type="file"
                                        style={{display:'none'}}
                                    />
                                    <label htmlFor="contained-button-file" style={{marginTop:'20px'}}>
                                        <Button variant="contained" className="button-add" startIcon={<PublishIcon />} component="span">
                                        Subir img
                                        </Button>
                                    </label>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <MuiThemeProvider theme={theme}>
                                    <Grid item xs={12} style={{marginBottom:'26px',marginTop:'20px'}}>
                                        <TextField 
                                            id="nombre" 
                                            type="text"
                                            label="Nombre" 
                                            style={{width:'100%'}}
                                            InputProps={{className: classes.input,}}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.formTextLabel
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{marginBottom:'32px'}}>
                                        <TextField 
                                            id="descripcion" 
                                            type="text"
                                            label="Descripción" 
                                            multiline
                                            style={{width:'100%'}}
                                            InputProps={{className: classes.input,}}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.formTextLabel
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{marginBottom:'32px'}}>
                                    {/* https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html */}
                                        <Grid item xs={12} className="txt-pre-ckeditor">Instrucciones</Grid>
                                        <CKEditor
                                            editor={ ClassicEditor }
                                            data="<p>Hello from CKEditor 5!</p>"
                                            config={ {
                                                language: 'es',
                                            } }
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                console.log( { event, editor, data } );
                                            } }
                                        />
                                            
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item xs={12} className="txt-pre-ckeditor">Preparación</Grid>
                                        <CKEditor
                                            editor={ ClassicEditor }
                                            data="<p>Hello from CKEditor 5!</p>"
                                            config={ {
                                                language: 'es',
                                            } }
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                console.log( { event, editor, data } );
                                            } }
                                        />
                                            
                                    </Grid>
                                </MuiThemeProvider>
                            </Grid>

                        </Grid>
                    </Grid>

                    {/* GRID CONFIG STOCK */}
                    <Grid item xs={12} sm={6} md={4} className="grid-spacing-20">
                        <Grid className="grid-section">
                            <Grid item xs={12} className="section-top-grid" style={{padding:'23px'}}>
                                <Grid>Productos de comepasto</Grid>
                            </Grid>

                            <Grid item xs={12} className="item-pro-receta" style={{flexWrap:'wrap'}}> 
                                <Grid item xs={12} style={{display:'flex'}}>
                                    <Grid item xs={2} className="img-pro-receta">
                                        <img src="/img/PRODUCTOS/1.png" />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Tooltip title="Nombre completo del producto" arrow placement="top-start">
                                            <InertiaLink href={route('admin.producto',1)} style={{textDecoration:'none'}}>
                                                <Typography xs={12} className="title-pro-receta" noWrap>
                                                    lorem ipsum dolor sit amet consectetur...
                                                </Typography>
                                            </InertiaLink>
                                        </Tooltip>
                                        <Typography xs={12} className="type-pro-receta">Carníco, lorem ipsum</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                                    <IconButton aria-label="delete">
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} className="item-pro-receta" style={{flexWrap:'wrap'}}> 
                                <Grid item xs={12} style={{display:'flex'}}>
                                    <Grid item xs={2} className="img-pro-receta">
                                        <img src="/img/PRODUCTOS/2.png" />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Tooltip title="Nombre completo del producto" arrow placement="top-start">
                                            <InertiaLink href={route('admin.producto',1)} style={{textDecoration:'none'}}>
                                                <Typography xs={12} className="title-pro-receta" noWrap>
                                                    lorem ipsum dolor sit amet consectetur...
                                                </Typography>
                                            </InertiaLink>
                                        </Tooltip>
                                        <Typography xs={12} className="type-pro-receta">Carníco, lorem ipsum</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                                    <IconButton aria-label="delete">
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} className="item-pro-receta" style={{flexWrap:'wrap'}}> 
                                <Grid item xs={12} style={{display:'flex'}}>
                                    <Grid item xs={2} className="img-pro-receta">
                                        <img src="/img/PRODUCTOS/3.png" />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Tooltip title="Nombre completo del producto" arrow placement="top-start">
                                            <InertiaLink href={route('admin.producto',1)} style={{textDecoration:'none'}}>
                                                <Typography xs={12} className="title-pro-receta" noWrap>
                                                    lorem ipsum dolor sit amet consectetur...
                                                </Typography>
                                            </InertiaLink>
                                        </Tooltip>
                                        <Typography xs={12} className="type-pro-receta">Carníco, lorem ipsum</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                                    <IconButton aria-label="delete">
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} className="item-pro-receta"> 
                                <Grid item xs={2} className="img-pro-receta">
                                    <img src="/img/icons/imgDefault.png" />
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        id="producto"
                                        select
                                        label="Selecciona un producto"
                                        style={{width:'100%'}}
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

                            <Grid className="input-admin-100" style={{display:'flex',justifyContent:'flex-end',alignItems:'center',padding:'8px 24px',marginBottom:'10px',paddingRight:'0px',marginTop:'20px'}}>
                                <InertiaLink href={route('admin.recetas')} className="btn-cancelar-op">CANCELAR</InertiaLink>
                                <Button
                                    className="button-filter button-update btn-second"
                                    type="submit"
                                    startIcon={<ArrowRightAltIcon />}
                                >
                                    Guardar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </form>
            </Grid>
        </Container>

        <Dialog
            open={open}
            onClose={handleCloseModal}
        >
            <DialogTitle  className="title-dialog">{"¿Estás seguro que deseas eliminar esta receta?"}</DialogTitle>
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

AgregarReceta.layout = page => <Layout children={page} title="Comepasto - Recetas" pageTitle="Recetas" />

export default AgregarReceta