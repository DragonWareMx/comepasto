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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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

const EditarReceta = ({receta, productosBefore, productos}) => {
    const { errors } = usePage().props;
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


    function readURL() {
        var input = document.getElementById("foto");
        if (input.files && input.files[0]) {
            setValues((values) => ({
                ...values,
                foto: input.files[0],
            }));
            var reader = new FileReader();
            var preview = document.getElementById("imgContainer");
            reader.onload = function (e) {
                preview.src = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function seleccionados(){
        var disponibles = [];
        var i=0;
        productosBefore.forEach(function (producto){
            disponibles[i]=producto.name;
            i++;
        })
        return disponibles;
    }


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const [values, setValues] = React.useState({
        foto: null,
        nombre: receta.nombre || '',
        descripcion: receta.descripcion || '',
        link: receta.link || '',
        ingredientes: receta.ingredientes || '',
        preparacion: receta.preparacion || '',
        productosSelect: seleccionados(),
        error: false,
    });

    function handleSubmit(e) {
        e.preventDefault();

        Inertia.post(route("admin.receta.patch",receta.recipe_id), values, {
            onError: () => {
                setValues((values) => ({
                    ...values,
                    error: true,
                }));
            },
        });
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    return ( 
        <>
        <Container> 
            <Grid container style={{paddingTop:'34px'}}>
                {/* TOP PAGE, BACK BUTTON */}
                <Grid item xs={12} className="top-admin">
                    <InertiaLink href={route('admin.recetas')} className="title-page subtitle-page"><ArrowBackIcon style={{marginRight:'9px'}} />Recetas</InertiaLink>
                </Grid>

                <Grid item xs={12}>
                    {
                        errors.foto &&
                        <Alert severity="error" style={{marginBottom: 10}}>{errors.foto}</Alert> 
                    }
                    </Grid>

                <form onSubmit={handleSubmit}>
                <Grid item xs={12} style={{marginBottom:'25px',display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={12} md={8} className="grid-section">
                        <Grid item xs={12} className="section-top-grid">
                            <Grid>Editar receta</Grid>
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
                            <Grid item xs={12} style={{display:'flex',alignItems:'flex-end',flexWrap:'wrap'}}>
                                <Grid item xs={12} md={6}>
                                    <img id='imgContainer' src={"/storage/recetas/" + receta.url} className="img-receta-admin" />
                                </Grid>
                                <Grid className="grid-derecho-title-re" style={{paddingBottom:'5px'}}>
                                    <input
                                        accept="image/*"
                                        id="foto"
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange={readURL}
                                        />
                                    <label htmlFor="foto" style={{marginTop:'20px'}}>
                                        <Button variant="contained" className="button-add" startIcon={<PublishIcon />} component="span">
                                        Editar
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
                                            required
                                            style={{width:'100%'}}
                                            InputProps={{className: classes.input,}}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.formTextLabel
                                                }
                                            }}
                                            onChange={handleChange('nombre')} 
                                            value={values.nombre}
                                            error={
                                                errors.nombre &&
                                                values.error == true &&
                                                true
                                            }
                                            helperText={
                                                values.error == true &&
                                                errors.nombre
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{marginBottom:'32px'}}>
                                        <TextField 
                                            id="descripcion" 
                                            type="text"
                                            label="Descripción" 
                                            required
                                            multiline
                                            style={{width:'100%'}}
                                            InputProps={{className: classes.input,}}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.formTextLabel
                                                }
                                            }}
                                            onChange={handleChange('descripcion')} 
                                            value={values.descripcion}
                                            error={
                                                errors.descripcion &&
                                                values.error == true &&
                                                true
                                            }
                                            helperText={
                                                values.descripcion == true &&
                                                errors.nombre
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{marginBottom:'32px'}}>
                                        <TextField 
                                            id="link" 
                                            type="url"
                                            label="link" 
                                            required
                                            style={{width:'100%'}}
                                            InputProps={{className: classes.input,}}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.formTextLabel
                                                }
                                            }}
                                            onChange={handleChange('link')} 
                                            value={values.link}
                                            error={
                                                errors.link &&
                                                values.error == true &&
                                                true
                                            }
                                            helperText={
                                                values.error == true &&
                                                errors.link
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{marginBottom:'32px'}}>
                                    {/* https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html */}
                                        <Grid item xs={12} className="txt-pre-ckeditor">Ingredientes</Grid>
                                        <CKEditor
                                            editor={ ClassicEditor }
                                            data={receta.ingredientes}
                                            config={ {
                                                language: 'es',
                                            } }
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                setValues(values => ({
                                                    ...values,
                                                    ingredientes: data,
                                                }))
                                            } }
                                        />
                                            
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item xs={12} className="txt-pre-ckeditor">Preparación</Grid>
                                        <CKEditor
                                            editor={ ClassicEditor }
                                            data={receta.preparacion}
                                            config={ {
                                                language: 'es',
                                            } }
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                setValues(values => ({
                                                    ...values,
                                                    preparacion: data,
                                                }))
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

                            <Grid item xs={12} className="item-pro-receta"> 
                                <Select
                                id="productosSelect"
                                multiple
                                style={{width:'100%'}}
                                value={values.productosSelect}
                                onChange={handleChange('productosSelect')}
                                input={<Input />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                error={
                                    errors.productosSelect &&
                                    values.error == true &&
                                    true
                                }
                                helperText={
                                    values.error == true &&
                                    errors.productosSelect
                                }
                                >
                                {productos.map((producto) => (
                                    <MenuItem key={producto.id} value={producto.name}>
                                    <Checkbox 
                                        style={{color:'#1DA3A8'}}
                                        checked={values.productosSelect.indexOf(producto.name) > -1} />
                                    <ListItemText primary={producto.name} />
                                    </MenuItem>
                                ))}
                                </Select>
                            </Grid>

                            <Grid className="input-admin-100" style={{display:'flex',justifyContent:'flex-end',alignItems:'center',padding:'0px 0px 0px 0px',marginBottom:'10px',marginTop:'20px'}}>
                                <InertiaLink href={route('admin.receta',receta.id)} className="btn-cancelar-op">CANCELAR</InertiaLink>
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

EditarReceta.layout = page => <Layout children={page} title="Comepasto - Recetas" pageTitle="Recetas" />

export default EditarReceta