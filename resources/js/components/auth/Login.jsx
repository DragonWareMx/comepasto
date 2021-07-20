import { React, useState } from 'react';
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Dialog, Button, TextField } from '@material-ui/core';
import { InertiaLink } from '@inertiajs/inertia-react';

import teal from '@material-ui/core/colors/teal';

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
        maxWidth: "400px",
        height: "fit-content",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 33px"
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
    cardLink: {
        color: '#1DA3A8',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '23px',
        textAlign: "center",
        textDecoration: "none",
        marginRight: "2px",
        '&:hover': {
            fontWeight: "600"
        },
    },
    formulario: {
        padding: "0px",
        marginBottom: "20px",
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    textField: {
        minWidth: '250px',
        maxWidth: '319px',
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
    }
}));

export default function Login({ dialog, handleClose }) {
    const classes = useStyles();
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    return (
        <Dialog
            open={dialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className={classes.cardInicioSesion}>
                <div className={classes.cardTitle} style={{ marginTop: "15px" }}>
                    INICIAR SESIÓN
                </div>
                <div className={classes.cardText} style={{ marginTop: "2px", marginBottom: "15px" }}>
                    Agiliza tus procesos de compra
                </div>

                <form className={classes.formulario}>
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
                            fullWidth={true}
                            value={values.email}
                            onChange={handleChange}
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
                            fullWidth={true}
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                    </MuiThemeProvider>
                </form>

                <InertiaLink href={route('login')} as="button" style={{ textDecoration: "none" }} className={classes.inertiaButton} preserveScroll>
                    <Button variant="contained" color="primary" component="div" disableElevation className={classes.buttonDial}>
                        ACCEDER
                    </Button>
                </InertiaLink>

                <div className={classes.cardText} style={{ marginBottom: "3px" }}>
                    <InertiaLink href={route("register")} className={classes.cardLink}>
                        ¿Deseas registrarte?
                    </InertiaLink>
                </div>
                <div className={classes.cardText}>
                    <InertiaLink href={route("register")} className={classes.cardLink}>
                        ¿Olvidaste tu contraseña?
                    </InertiaLink>
                </div>
            </div>
        </Dialog>
    )
}