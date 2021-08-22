import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import '/css/cuenta.css';

import Layout from '../../../layouts/Layout';
import BlueInformation from '../../../components/common/BlueInformation';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const useStyles = makeStyles((theme) => ({
    input: {
        fontFamily: "Oxygen",
        fontStyle: 'normal',
        fontSize: '16px',
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


function handleSubmit(e) {
    e.preventDefault()
    // ruta
    // Inertia.post('/', values,
    //     {
    //         onSuccess: () => {
    //             //algo
    //         },
    //         onError: () => {
    //             setValues(values => ({
    //                 ...values,
    //                 error: true
    //             }));
    //         }
    //     }
    // )
}

const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
};



const AgregarDireccion = () => {
    const { errors } = usePage().props

    const classes = useStyles();

    const [values, setValues] = React.useState({
        direccion: '',
        name: '',
        referencias: '',
        predeterminado: '',
    });

    const [state, setState] = React.useState({
        predeterminado: false,
      });

    return ( 
        <>
            <BlueInformation></BlueInformation>

            <Grid container direction="row" flexwrap="wrap">
                <Grid item xs={12} style={{padding:'25px',display:'flex',alignItems:'baseline',flexWrap:'wrap'}}>
                    <Grid item xs={12} className="title-section">
                        <InertiaLink href={route('cuenta')} style={{color:'#1DA3A8', textDecoration:'none'}}>CUENTA</InertiaLink>&nbsp;
                        <Grid style={{fontWeight:300}}>DIRECCIONES</Grid>
                    </Grid>
                
                    <Grid container direction="row" justify="space-between" style={{marginTop:20}}>
                        <Grid item xs={12} className="info-txt-datos info-little-envio" >Consulta información acerca del uso de tus datos personales en nuestro&nbsp;  
                            <a href="#!" target="_blank">Aviso de privacidad</a> y <a href="#!" target="_blank">Términos y Condiciones</a> de Comepasto.
                        </Grid>

                        <Grid item xs={12} sm={9} md={6} style={{marginTop:26}} id="edit-grid">
                            <Grid item xs={12} className="grid-gray-name">AGREGAR NUEVA DIRECCIÓN</Grid>
                            <Grid item xs={12} className="grid-white-info">
                                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                <MuiThemeProvider theme={theme}>
                                    <Grid item xs={12}>
                                        <TextField 
                                                id="direccion" 
                                                onChange={handleChange('direccion')}
                                                required
                                                label="Dirección" 
                                                placeholder="Ciudad, colonia, calle, # casa"
                                                className="input-edit-info" 
                                                error={errors.correo && values.error == true && true}
                                                helperText={values.error == true && errors.correo} 
                                                InputProps={{className: classes.input,}}
                                                InputLabelProps={{
                                                    classes: {
                                                        root: classes.formTextLabel
                                                    }
                                                }}
                                                type="email" />
                                    </Grid>

                                    <Grid item xs={12} style={{display:'flex', flexWrap:'wrap'}} id="pass-grid">
                                        <Grid item xs={12} sm={6}>
                                            <TextField 
                                                    id="name" 
                                                    onChange={handleChange('name')}
                                                    required
                                                    label="Nombre de la dirección" 
                                                    placeholder="Ej. Casa de los abuelos"
                                                    className="input-edit-info input-50" 
                                                    error={errors.pass && values.pass == true && true}
                                                    helperText={values.error == true && errors.pass} 
                                                    InputProps={{className: classes.input,}}
                                                    InputLabelProps={{
                                                        classes: {
                                                            root: classes.formTextLabel
                                                        }
                                                    }}
                                                    />
                                        </Grid>
                                        <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'flex-end'}}>
                                            <TextField 
                                                id="referencias" 
                                                onChange={handleChange('referencias')}
                                                required
                                                label="Referencias" 
                                                placeholder="Ej. Portón blanco"
                                                className="input-edit-info input-50" 
                                                error={errors.passC && values.passC == true && true}
                                                helperText={values.error == true && errors.passC} 
                                                InputProps={{className: classes.input,}}
                                                InputLabelProps={{
                                                    classes: {
                                                        root: classes.formTextLabel
                                                    }
                                                }}
                                                />
                                        </Grid>
                                    </Grid>

                                    <FormControlLabel className="label-check"
                                        control={
                                        <Checkbox
                                            onChange={handleChange}
                                            name="predeterminado"
                                            id="predeterminado"
                                            color="primary"
                                            className="check-pre"
                                        />
                                        }
                                        label="Establecer como predeterminada"
                                    />

                                    <Grid style={{display:'flex', justifyContent:'flex-end', flexWrap:'wrap', alignItems:'center',marginTop:30}}>
                                        <InertiaLink href={route('direcciones')} className="button-cancel" style={{textDecoration:'none'}}>CANCELAR</InertiaLink>
                                        <Button type="submit" variant="contained" className="button-ok">GUARDAR</Button>
                                    </Grid>

                                    
                                </MuiThemeProvider>
                                </form>                                
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
            
        </>
    )
}


AgregarDireccion.layout = page => <Layout children={page} title="Comepasto - Direcciones" pageTitle="Direcciones" />

export default AgregarDireccion