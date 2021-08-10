import { React, useState } from 'react';
import Layout from '../layouts/Layout';
import { Container, Grid, Hidden, Paper, Button, TextField, Snackbar, Portal } from '@material-ui/core';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

import teal from '@material-ui/core/colors/teal';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
            main: teal[500],
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // error: will use the default color
    },
    status: {
        danger: 'orange',
    },
});

const useStyles = makeStyles((theme) => ({
    cardInicioSesion: {
        width: "100%",
        height: "fit-content",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 33px"
    },
    container: {
        paddingTop: '20px',
        paddingBottom: '20px'
    },
    cardText: {
        color: '#878787',
        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '15px',
        lineHeight: '24px',
        width: "90%",
        textAlign: "center"
    },
    cardTitle: {
        color: '#1DA3A8',
        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '18px',
        lineHeight: '29px',
        width: "90%",
        textAlign: "center"
    },
    formulario: {
        padding: "0px 5%",
        marginBottom: "20px",
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    textField: {
        minWidth: '250px',
        fontFamily: "Atma",
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '15px',
        lineHeight: '23px',
        color: '#333333',
        marginTop: '20px',
        marginBottom: '20px',
        "&:not(.Mui-disabled):hover::before": {
            borderColor: "#1DA3A8"
        }
    },
    formTextLabel: {
        fontFamily: 'Atma',
        fontSize: '14px',
        lineHeight: '19.5px',
        color: '#9E9E9E'
    },
    helperText: {
        marginTop: '-12px',
        fontFamily: 'Atma',
        fontSize: '14px',
    },
    buttonDial: {
        background: '#1DA3A8',
        color: '#FFFFFF',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '13px',
        lineHeight: '21px',

        minWidth: '220px',
        maxWidth: '319px',
        height: '45px',
        width: "100%",

        border: "1px solid #E3E3E3",

        '&:hover': {
            background: '#1DA3A8',
            color: '#FFFFFF',
        },
    },
    inertiaButton: {
        width: "90%",
        minWidth: '220px',
        maxWidth: '319px',

        height: "fit-content",
        backgroundColor: "transparent",

        marginTop: "12px",
        marginBottom: "20px",

        padding: "0px",
        border: "none",
    },
    image: {
        width: '100%'
    }
}));

const ResetPassword = ({ token, email }) => {
    const { errors, flash } = usePage().props
    const classes = useStyles();
    const [values, setValues] = useState({
        _method: 'post',
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
        error: false
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post('/password/reset', values, {
            preserveScroll: true,
            onSuccess: () => {

            },
            onError: () => {
                setValues(values => ({
                    ...values,
                    error: true
                }));
            }
        })
    }

    return (
        <>
            <Container>
                <div className={classes.container}>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        spacing={3}
                    >
                        <Hidden xsDown>
                            <Grid item sm={4} md={6} xs={12}>
                                <img src="/img/ilustraciones/Forgot_password.gif" alt="Olvidé mi contraseña" className={classes.image} />
                            </Grid>
                        </Hidden>
                        <Grid item sm={8} md={6} xs={12}>
                            <Paper elevation={3} className={classes.cardInicioSesion}>
                                <div className={classes.cardTitle} style={{ marginTop: "15px" }}>
                                    ¿Olvidaste tu contraseña?
                                </div>
                                <div className={classes.cardText} style={{ marginTop: "2px", marginBottom: "15px" }}>
                                    Ingresa tu nueva contraseña.
                                </div>

                                <form className={classes.formulario} onSubmit={handleSubmit} id="login-form">
                                    <MuiThemeProvider theme={theme}>
                                        <TextField required id="email" label="Correo electrónico"
                                            InputProps={{
                                                className: classes.textField,
                                            }}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.formTextLabel
                                                }
                                            }}
                                            FormHelperTextProps={{
                                                className: classes.helperText
                                            }}
                                            fullWidth={true}
                                            value={values.email}
                                            onChange={handleChange}
                                            error={errors.email && values.error == true && true}
                                            helperText={values.error == true && errors.email}
                                        />

                                        <TextField required id="password" label="Contraseña"
                                            InputProps={{
                                                className: classes.textField,
                                            }}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.formTextLabel
                                                }
                                            }}
                                            FormHelperTextProps={{
                                                className: classes.helperText
                                            }}
                                            fullWidth={true}
                                            type="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            error={errors.password && values.error == true && true}
                                            helperText={values.error == true && errors.password}
                                        />

                                        <TextField required id="password_confirmation" label="Confirmar contraseña"
                                            InputProps={{
                                                className: classes.textField,
                                            }}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.formTextLabel
                                                }
                                            }}
                                            fullWidth={true}
                                            type="password"
                                            value={values.password_confirmation}
                                            onChange={handleChange}
                                        />
                                    </MuiThemeProvider>

                                    <div style={{ textDecoration: "none" }} className={classes.inertiaButton} >
                                        <Button variant="contained" color="primary" type="submit" disableElevation className={classes.buttonDial}>
                                            GUARDAR
                                        </Button>
                                    </div>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    )
}

ResetPassword.layout = page => <Layout children={page} title="Comepasto - Recuperar contraseña" pageTitle="Recuperar Contraseña" />

export default ResetPassword