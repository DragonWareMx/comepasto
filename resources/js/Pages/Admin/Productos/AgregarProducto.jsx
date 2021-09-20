import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import route from 'ziggy-js';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../layouts/LayoutAdmin';
import ModalConfirmacion from '../../../components/common/modalConfirmacion';
import '/css/admin.css';
import '/css/adminProductos.css';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
import Autocomplete from '@material-ui/lab/Autocomplete';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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


const AgregarProducto = ({marcas,tipos,categorias}) => {

    const currencies = [
        {label:'1',
        label:'lorem ipsum'
        },
    ]

    const [anchorEl, setAnchorEl] = React.useState(null);

    //CHIPS
    const [inputValue, setInputValue] = React.useState('');
    const [autoCompleteValue, setAutoCompleteValue] = React.useState(null);

    const handleDelete = (chipToDelete) => () => {
        setValues({
            ...values, 
            categorias: values.categorias.filter((chip) => chip.id !== chipToDelete.id)
        });
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // MODAL AGREGAR MARCA
    const [openMarca, setOpenMarca] = React.useState(false);

    const handleClickOpenModalMarca = () => {
        setOpenMarca(true);
    };

    const handleCloseModalMarca = () => {
        setOpenMarca(false);
    };

    // MODAL AGREGAR TIPO
    const [openTipo, setOpenTipo] = React.useState(false);

    const handleClickOpenModalTipo = () => {
        setOpenTipo(true);
    };

    const handleCloseModalTipo = () => {
        setOpenTipo(false);
    };

    // MODAL AGREGAR CATEGORIA
    const [openCat, setOpenCat] = React.useState(false);

    const handleClickOpenModalCat = () => {
        setOpenCat(true);
    };

    const handleCloseModalCat = () => {
        setOpenCat(false);
    };

    // Select
    const [currency, setCurrency] = React.useState('1');

    const handleChange = (prop) => (event) => {
        if(prop == 'soyaFree' || prop == 'trigoFree'){
            setValues({ ...values, [prop]: event.target.checked });
        }
        else{
            setValues({ ...values, [prop]: event.target.value });
        }
    };

    // const handleDelete = () => {

    // };

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const classes = useStyles();

    function readURL() {
        var input=document.getElementById('imgProducto');
        if (input.files && input.files[0]) {
            setValues(values => ({
                ...values,
                imgProducto: input.files[0],
            }))
            var reader = new FileReader();
            var preview = document.getElementById('imgContainer');
            reader.onload = function (e) {
                preview.src = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    const addCategoria = (prop) => (event) => {
        // setValues.categorias.push(event.target.value)
        setValues(values => ({
            ...values,
            categorias: values.categorias.push(event.target.value),
        }))
    };

    const [values, setValues] = React.useState({
        imgProducto: null,
        nombre: '',
        presentacion: '',
        precio: '',
        descuento: '',
        ingredientes: '',
        marca: '',
        tipo: '',
        categorias: [],
        soyaFree: false,
        trigoFree: false
    });

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
                        <Grid>Agregar producto</Grid>
                    </Grid>
                    {/* contenido */}
                    <Grid item xs={12} style={{padding:'20px',display:'flex',alignItems:'flex-start',flexWrap:'wrap'}}>
                        <Grid item xs={4} sm={2} style={{marginBottom:'20px',display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
                            <img id='imgContainer' src="/img/icons/imgDefault.png" className="img-product-view" style={{objectFit:'cover'}}/>
                            <input
                                accept="image/*"
                                id="imgProducto"
                                type="file"
                                style={{display:'none'}}
                                onChange={readURL}
                            />
                            <label htmlFor="imgProducto" style={{marginTop:'20px'}}>
                                <Button variant="contained" className="button-add" startIcon={<PublishIcon />} component="span">
                                Subir img
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
                                    onChange={handleChange('nombre')} 
                                />
                            </Grid>

                            <Grid item xs={12} style={{display:'flex',flexWrap:'wrap'}}>
                                <Grid item xs={12} sm={6} style={{display:'flex',flexWrap:'wrap'}}>
                                <Autocomplete
                                    id="marca"
                                    options={marcas}
                                    getOptionLabel={(option) => option.name}
                                    style={{ width: 300 }}
                                    onChange={(event, newValue) => {
                                        setValues({ ...values, marca: newValue ? newValue.id : null });
                                    }}
                                    renderInput={
                                        (params) => 
                                        <TextField {...params}
                                            label="Marca"
                                            placeholder="Selecciona una opción"
                                            variant="outlined"
                                            className="input-admin-50" 
                                        />
                                    }
                                />
                                    <Grid className="link-add-bd" onClick={handleClickOpenModalMarca}>Agregar marca</Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} style={{display:'flex',flexWrap:'wrap'}}>
                                    <Autocomplete
                                        id="tipo"
                                        options={tipos}
                                        getOptionLabel={(option) => option.name}
                                        style={{ width: 300 }}
                                        onChange={(event, newValue) => {
                                            setValues({ ...values, tipo: newValue ? newValue.id : null });
                                        }}
                                        renderInput={
                                            (params) => 
                                            <TextField {...params}
                                                label="Tipo"
                                                placeholder="Selecciona una opción"
                                                variant="outlined"
                                                className="input-admin-50" 
                                            />
                                        }
                                    />
                                    <Grid className="link-add-bd" onClick={handleClickOpenModalTipo}>Agregar tipo</Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} style={{display:'flex',flexWrap:'wrap'}}>
                                <Grid item xs={12} sm={6} style={{display:'flex',flexWrap:'wrap'}}>
                                    <Autocomplete
                                        id="categorias"
                                        options={categorias}
                                        value={autoCompleteValue}
                                        getOptionLabel={(option) => option.name}
                                        style={{ width: 300 }}
                                        onChange={(event, newValue) => {
                                            if(newValue){
                                                setInputValue("");
                                                setAutoCompleteValue(null)
                                                if(!values.categorias.some(item => newValue.id === item.id))
                                                    setValues({ ...values, categorias: [...values.categorias, {id: newValue.id, name: newValue.name}] });
                                            }
                                        }}
                                        inputValue={inputValue}
                                        onInputChange={(event, newInputValue) => {
                                            setInputValue(newInputValue);
                                        }}
                                        renderInput={
                                            (params) => 
                                            <TextField {...params}
                                                label="Categorías"
                                                placeholder="Selecciona una opción"
                                                variant="outlined"
                                                className="input-admin-50" 
                                            />
                                        }
                                    />
                                    
                                    {values.categorias.map((data) => {
                                        return(<Chip
                                            label={data.name}
                                            onDelete={handleDelete(data)}
                                            className="chip-categoria"
                                        />)
                                    })}
                                    
                                    <Grid className="link-add-bd" onClick={handleClickOpenModalCat}>Agregar categoría</Grid>
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
                                        onChange={handleChange('presentacion')}
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
                                        onChange={handleChange('precio')}
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
                                        onChange={handleChange('descuento')}
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
                                    onChange={handleChange('ingredientes')}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox checked={values.soyaFree} className="checkbox-admin" onChange={handleChange('soyaFree')} name="checkedA" />}
                                    id="soyaFree"
                                    label="Producto libre de soya"
                                    className="checkbox-label"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={values.trigoFree} className="checkbox-admin" onChange={handleChange('trigoFree')} name="checkedB" />}
                                    id="trigoFree"
                                    label="Producto libre de gluten"
                                    className="checkbox-label"
                                />
                            </Grid>

                            <Grid className="input-admin-100" style={{display:'flex',justifyContent:'flex-end',alignItems:'center',padding:'8px 24px',marginBottom:'10px',paddingRight:'0px',marginTop:'20px'}}>
                                <InertiaLink href={route('admin.productos')} className="btn-cancelar-op">CANCELAR</InertiaLink>
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
        

        {/* MODAL AGREGAR MARCA */}
        <Dialog
            open={openMarca}
            onClose={handleCloseModalMarca}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
        >
        <form noValidate autoComplete="off">
            <DialogTitle  className="title-dialog">{"Agregar marca"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" className="dialog-content">
                <MuiThemeProvider>
                <Grid item xs={12} style={{marginBottom:'20px'}}>
                    <TextField 
                        id="newMarca" 
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
                <Grid item xs={12} style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                    <img src="/img/icons/imgDefault.png" style={{marginRight:'15px',width:'30%',minWidth:'80px',maxHeight:'150px',objectFit:'cover'}} />
                    <input
                        accept="image/*"
                        id="imgNewMarca"
                        type="file"
                        style={{display:'none'}}
                    />
                    <label htmlFor="imgNewMarca" style={{marginTop:'20px'}}>
                        <Button variant="contained" className="button-add" startIcon={<PublishIcon />} component="span">
                        Subir img
                        </Button>
                    </label>
                </Grid>
                </MuiThemeProvider>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end',alignItems:'center',padding:'8px 24px',marginBottom:'10px'}}>
                    <Grid className="btn-cancelar-op" onClick={handleCloseModalMarca}>CANCELAR</Grid>
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


        {/* MODAL AGREGAR TIPO */}
        <Dialog
            open={openTipo}
            onClose={handleCloseModalTipo}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
        >
        <form noValidate autoComplete="off">
            <DialogTitle  className="title-dialog">{"Agregar tipo"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" className="dialog-content">
                <MuiThemeProvider>
                <Grid item xs={12} style={{marginBottom:'20px'}}>
                    <TextField 
                        id="newTipo" 
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
                </MuiThemeProvider>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end',alignItems:'center',padding:'8px 24px',marginBottom:'10px'}}>
                    <Grid className="btn-cancelar-op" onClick={handleCloseModalTipo}>CANCELAR</Grid>
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

        {/* MODAL AGREGAR CATEGORIA */}
        <Dialog
            open={openCat}
            onClose={handleCloseModalCat}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
        >   
        <form noValidate autoComplete="off">
            <DialogTitle  className="title-dialog">{"Agregar categoría"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" className="dialog-content">
                
                <MuiThemeProvider>
                <Grid item xs={12} style={{marginBottom:'20px'}}>
                    <TextField 
                        id="newCat" 
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
                <Grid item xs={12} style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                    <img src="/img/icons/imgDefault.png" style={{marginRight:'15px',width:'30%',minWidth:'80px',maxHeight:'150px',objectFit:'cover'}} />
                    <input
                        accept="image/*"
                        id="imgNewCat"
                        type="file"
                        style={{display:'none'}}
                    />
                    <label htmlFor="imgNewCat" style={{marginTop:'20px'}}>
                        <Button variant="contained" className="button-add" startIcon={<PublishIcon />} component="span">
                        Subir img
                        </Button>
                    </label>
                </Grid>
                </MuiThemeProvider>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                
                <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end',alignItems:'center',padding:'8px 24px',marginBottom:'10px'}}>
                    <Grid className="btn-cancelar-op" onClick={handleCloseModalCat}>CANCELAR</Grid>
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

AgregarProducto.layout = page => <Layout children={page} title="Comepasto - Productos" pageTitle="Productos" />

export default AgregarProducto