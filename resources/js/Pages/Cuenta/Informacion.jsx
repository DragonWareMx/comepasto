import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import '/css/cuenta.css';

import Layout from '../../layouts/Layout';
import BlueInformation from '../../components/common/BlueInformation';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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


function editInfo() {
    document.getElementById('info-grid').style.display = "none";
    document.getElementById('edit-grid').style.display = "block";
}
function cancelar() {
    document.getElementById('info-grid').style.display = "block";
    document.getElementById('edit-grid').style.display = "none";
    document.getElementById('pass-grid').style.display = "none";
}
function changePass() {
    if (document.getElementById('pass-grid').style.display == "flex") {
        document.getElementById('pass-grid').style.display = "none";
    } else {
        document.getElementById('pass-grid').style.display = "flex";
    }

}

const Informacion = () => {
    const { errors } = usePage().props

    const { auth, flash } = usePage().props
    const classes = useStyles();

    const [values, setValues] = React.useState({
        correo: auth.user.email,
        nombre: auth.user.name,
        password: '',
        password_confirmation: '',
        telefono: auth.user.tel,
        error: false
    });

    function handleSubmit(e) {
        e.preventDefault()
        // ruta
        Inertia.post(route('informacion.editar'), values,
            {
                onSuccess: () => {
                    //algo
                },
                onError: () => {
                    setValues(values => ({
                        ...values,
                        error: true
                    }));
                }
            }
        )
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // MODAL
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/* <BlueInformation></BlueInformation> */}

            <Container>
                <Grid container direction="row" flexwrap="wrap">
                    <Grid item xs={12} style={{ padding: '25px', display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <Grid item xs={12} className="title-section">
                            <InertiaLink href={route('cuenta')} style={{ color: '#1DA3A8', textDecoration: 'none' }}>MI CUENTA</InertiaLink>&nbsp;
                            <Grid style={{ fontWeight: 300 }}>INFORMACIÓN</Grid>
                        </Grid>

                        <Grid container direction="row" justify="space-between" style={{ marginTop: 20 }}>
                            <Grid item xs={12} className="info-txt-datos info-little-envio" >Consulta información acerca del uso de tus datos personales en nuestro&nbsp;
                                <a href="/politica-y-privacidad" target="_blank">Política de privacidad</a> y <a href="/terminos-y-condiciones" target="_blank">Términos y Condiciones</a> de Comepasto.
                            </Grid>

                            <Grid item xs={12} sm={9} md={6} style={{ marginTop: 26 }} id="info-grid">
                                <Grid item xs={12} className="grid-gray-name">{auth.user.name}</Grid>
                                <Grid item xs={12} className="grid-white-info">
                                    <Grid item xs={12} className="title-info-data">CORREO ELECTRÓNICO</Grid>
                                    <Grid item xs={12} className="info-data">{auth.user.email}</Grid>
                                    <Grid item xs={12} className="title-info-data">TELÉFONO</Grid>
                                    <Grid item xs={12} className="info-data">{auth.user.tel}</Grid>
                                    <a className="link-edit-info" onClick={editInfo}>Editar información</a>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={9} md={6} style={{ marginTop: 26, display: 'none' }} id="edit-grid">
                                <Grid item xs={12} className="grid-gray-name">{auth.user.name}</Grid>
                                <Grid item xs={12} className="grid-white-info">
                                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <MuiThemeProvider theme={theme}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="correo"
                                                    onChange={handleChange('correo')}
                                                    required
                                                    value={values.correo}
                                                    label="Correo electrónico"
                                                    className="input-edit-info"
                                                    error={errors.correo && values.error == true && true}
                                                    helperText={values.error == true && errors.correo}
                                                    InputProps={{ className: classes.input, }}
                                                    InputLabelProps={{
                                                        classes: {
                                                            root: classes.formTextLabel
                                                        }
                                                    }}
                                                    type="email" />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField
                                                    id="nombre"
                                                    onChange={handleChange('nombre')}
                                                    required
                                                    value={values.nombre}
                                                    label="Nombre"
                                                    className="input-edit-info"
                                                    error={errors.nombre && values.nombre == true && true}
                                                    helperText={values.error == true && errors.nombre}
                                                    InputProps={{ className: classes.input, }}
                                                    InputLabelProps={{
                                                        classes: {
                                                            root: classes.formTextLabel
                                                        }
                                                    }}
                                                    type="text" />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField
                                                    id="telefono"
                                                    onChange={handleChange('telefono')}
                                                    required
                                                    value={values.telefono}
                                                    label="Teléfono"
                                                    className="input-edit-info"
                                                    error={errors.telefono && values.error == true && true}
                                                    helperText={values.error == true && errors.telefono}
                                                    InputProps={{ className: classes.input, }}
                                                    InputLabelProps={{
                                                        classes: {
                                                            root: classes.formTextLabel
                                                        }
                                                    }}
                                                    type="phone" />
                                            </Grid>

                                            <a className="link-edit-info" onClick={changePass}>Cambiar contraseña</a>

                                            <Grid item xs={12} style={{ display: 'none', flexWrap: 'wrap' }} id="pass-grid">
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        id="password"
                                                        onChange={handleChange('password')}
                                                        required
                                                        value={values.password}
                                                        label="Contraseña"
                                                        className="input-edit-info input-50"
                                                        error={errors.password && values.error == true && true}
                                                        helperText={values.error == true && errors.password}
                                                        InputProps={{ className: classes.input, }}
                                                        InputLabelProps={{
                                                            classes: {
                                                                root: classes.formTextLabel
                                                            }
                                                        }}
                                                        type="password" />
                                                </Grid>
                                                <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <TextField
                                                        id="password_confirmation"
                                                        onChange={handleChange('password_confirmation')}
                                                        required
                                                        value={values.password_confirmation}
                                                        label="Confirmar contraseña"
                                                        className="input-edit-info input-50"
                                                        error={errors.password_confirmation && values.error == true && true}
                                                        helperText={values.error == true && errors.password_confirmation}
                                                        InputProps={{ className: classes.input, }}
                                                        InputLabelProps={{
                                                            classes: {
                                                                root: classes.formTextLabel
                                                            }
                                                        }}
                                                        type="password" />
                                                </Grid>
                                            </Grid>

                                            <Grid style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', alignItems: 'center', marginTop: 30 }}>
                                                <Button className="button-cancel" onClick={cancelar}>CANCELAR</Button>
                                                <Button type="submit" variant="contained" className="button-ok">GUARDAR</Button>
                                            </Grid>

                                            <a className="link-edit-info" style={{ color: '#DD5656' }} onClick={handleClickOpen}>Eliminar cuenta</a>
                                        </MuiThemeProvider>
                                    </form>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="title-dialog">{"¿Estás seguro de que deseas eliminar esta cuenta?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className="dialog-content">
                        Toda tu información personal, así como tus pedidos y direcciones serán eliminados y no podrán recuperarse.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Grid style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', alignItems: 'center', margin: 15 }}>
                        <Button className="button-cancel" onClick={handleClose}>CANCELAR</Button>
                        <InertiaLink className="button-ok" onClick={handleClose} method="delete" href="#!" as="button">ELIMINAR</InertiaLink>
                    </Grid>
                </DialogActions>
            </Dialog>

        </>
    )
}


Informacion.layout = page => <Layout children={page} title="Comepasto - Información" pageTitle="Información" />

export default Informacion