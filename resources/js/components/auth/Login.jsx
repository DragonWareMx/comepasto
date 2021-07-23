import { React, useState } from 'react';
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Dialog, Button, TextField, Snackbar } from '@material-ui/core';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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
        maxWidth: '350px',
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
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

export default function Login({ dialog, handleClose, openRegister }) {
    const { errors } = usePage().props
    const classes = useStyles();
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: false
    });

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

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
        Inertia.post('/login', values, {
            preserveScroll: true,
            onSuccess: () => {
                handleClick();
                handleCerrar();
            },
            onError: () => {
                setValues(values => ({
                    ...values,
                    error: true
                }));
            }
        })
    }

    function handleCerrar() {
        setValues(values => ({
            email: '',
            password: '',
            error: false
        }))
        handleClose();
    }

    return (
        <>
            <Dialog
                open={dialog}
                onClose={handleCerrar}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className={classes.cardInicioSesion}>
                    <div className={classes.cardTitle} style={{ marginTop: "15px" }}>
                        INICIAR SESIÓN
                    </div>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleCerrar}>
                        <CloseIcon />
                    </IconButton>
                    <div className={classes.cardText} style={{ marginTop: "2px", marginBottom: "15px" }}>
                        Agiliza tus procesos de compra
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
                                fullWidth={true}
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                            />
                        </MuiThemeProvider>

                        <div style={{ textDecoration: "none" }} className={classes.inertiaButton} >
                            <Button variant="contained" color="primary" type="submit" disableElevation className={classes.buttonDial}>
                                ACCEDER
                            </Button>
                        </div>
                    </form>

                    <div className={classes.cardText} style={{ marginBottom: "3px" }}>
                        <Button type='button' className={classes.cardLink} onClick={openRegister}>
                            ¿Deseas registrarte?
                        </Button>
                    </div>
                    <div className={classes.cardText}>
                        <InertiaLink href={route("register")} className={classes.cardLink}>
                            ¿Olvidaste tu contraseña?
                        </InertiaLink>
                    </div>
                </div>
            </Dialog>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleCloseSnack} severity="success">
                    Sesión iniciada con éxito!
                </Alert>
            </Snackbar>
        </>
    )
}