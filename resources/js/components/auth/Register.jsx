import { React, useState } from 'react';
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Dialog, Button, TextField, Snackbar, Portal } from '@material-ui/core';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import StepBar from './StepBar';

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
    cardRegistro: {
        width: "100%",
        maxWidth: "400px",
        height: "fit-content",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "15px 25px"
    },
    buttonDial: {
        background: '#1DA3A8',
        color: '#FFFFFF',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '13px',
        lineHeight: '21px',

        minWidth: '90px',
        maxWidth: '120px',
        height: '45px',
        width: "100px",

        border: "1px solid #E3E3E3",

        '&:hover': {
            background: '#1DA3A8',
            color: '#FFFFFF',
        },
    },
    buttonText: {
        color: '#7E7E7E',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '13px',
        lineHeight: '21px',

        minWidth: '90px',
        maxWidth: '120px',
        height: '45px',
        width: "100px",
        marginRight: '10px',

        '&:hover': {
            background: '#d9d9d9',
            color: '#1E1E1E',
        },
    },
    inertiaButton: {
        width: "90%",
        minWidth: '220px',
        maxWidth: '319px',

        height: "fit-content",
        backgroundColor: "transparent",

        marginTop: "12px",
        marginBottom: "5px",

        padding: "0px",
        border: "none",
        display: 'flex',
        justifyContent: 'flex-end'
    },
    cardText: {
        color: '#878787',
        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '15px',
        lineHeight: '24px',
        width: "85%",
        textAlign: "center"
    },
    cardTitle: {
        color: '#1DA3A8',
        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '18px',
        lineHeight: '29px',
        width: "100%",
        textAlign: "left"
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
        flexWrap: 'wrap',
        width: '100%',
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
        marginTop: '18px',
        marginBottom: '18px',
        "&:not(.Mui-disabled):hover::before": {
            borderColor: "#1DA3A8"
        },
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
    downStep: {
        display: 'flex',
        width: '100%',
        fontFamily: 'Oxygen',
        fontSize: '10px',
        fontWeight: 'normal',
        justifyContent: 'space-between',
        color: '#9E9E9E'
    },
    textDireccion: {
        fontFamily: 'Oxygen',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '13px',
        lineHeight: '20px'
    }
}));

export default function Register({ dialog, handleClose }) {
    const { errors } = usePage().props
    const classes = useStyles();
    const [values, setValues] = useState({
        fullName: '',
        password: '',
        password_confirmation: '',
        email: '',
        phone: '',
        direction: '',
        step: 0,
        percent: 1,
        error: false
    });

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        handleClose();
        setOpen(false);
    };

    const handleClick2 = () => {
        setOpen2(true);
    };

    const handleCloseSnack2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen2(false);
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
        Inertia.post('/register', values, {
            preserveScroll: true,
            onSuccess: () => {
                handleClick();
            },
            onError: () => {
                setValues(values => ({
                    ...values,
                    error: true,
                    step: 0,
                    percent: 1,
                }));
            }
        })
    }

    function handleCerrar() {
        setValues(values => ({
            fullName: '',
            password: '',
            password_confirmation: '',
            email: '',
            phone: '',
            direction: '',
            step: 0,
            percent: 1,
            error: false
        }))
        handleClose();
    }

    function nextStep() {
        if (values.fullName != '' && values.email != '' && values.phone != ''
            && values.password != '' && values.password_confirmation != '') {
            setValues(values => ({
                ...values,
                percent: 100,
                step: 1
            }));
        }
        else {
            handleClick2();
        }
    }

    function backStep() {
        setValues(values => ({
            ...values,
            percent: 1,
            step: 0
        }));
    }

    function closeSnackSuccess() {
        handleClose();
        setTimeout(handleCloseSnack, 4000);
    }

    return (
        <>
            <Dialog
                open={dialog}
                onClose={handleCerrar}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className={classes.cardRegistro}>
                    <div className={classes.cardTitle} style={{ marginTop: "10px" }}>
                        REGISTRARSE
                    </div>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleCerrar}>
                        <CloseIcon />
                    </IconButton>
                    <div className={classes.cardText} style={{ marginTop: "12px", marginBottom: '10px' }}>
                        <StepBar percent={values.percent} />
                    </div>
                    <div className={classes.downStep} style={{ marginBottom: '15px' }}>
                        <div>INFORMACIÓN</div>
                        <div>DIRECCIONES</div>
                    </div>
                    {values.step == 0 &&
                        <form className={classes.formulario} id="login-form">
                            <MuiThemeProvider theme={theme}>
                                <TextField required id="fullName" label="Nombre completo"
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
                                    value={values.fullName}
                                    onChange={handleChange}
                                    error={errors.fullName && values.error == true && true}
                                    helperText={values.error == true && errors.fullName}
                                />

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

                                <TextField required id="phone" label="Teléfono"
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
                                    value={values.phone}
                                    onChange={handleChange}
                                    error={errors.phone && values.error == true && true}
                                    helperText={values.error == true && errors.phone}
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
                                <Button variant="text" color="primary" type="button" disableElevation className={classes.buttonText} onClick={handleCerrar}>
                                    CANCELAR
                                </Button>
                                <Button variant="contained" color="primary" type="button" disableElevation className={classes.buttonDial} onClick={nextStep}>
                                    SIGUIENTE
                                </Button>
                            </div>
                        </form>
                    }
                    {values.step == 1 &&
                        <form className={classes.formulario} onSubmit={handleSubmit} id="login-form">
                            <div className={classes.textDireccion} style={{ color: '#7C7C7C' }}>
                                Ingresa tu dirección para solicitar los datos del costo de envío en futuras compras.
                            </div>
                            <div className={classes.textDireccion} style={{ color: '#d1d1d1', fontSize: '12px' }}>
                                Si deseas recoger tu producto podrás seleccionarlo antes de concluir tu compra.
                            </div>
                            <MuiThemeProvider theme={theme}>
                                <TextField required id="direction" label="Dirección"
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
                                    value={values.direction}
                                    onChange={handleChange}
                                    error={errors.direction && values.error == true && true}
                                    helperText={values.error == true && errors.direction}
                                />
                            </MuiThemeProvider>

                            <div style={{ textDecoration: "none", marginTop: '120px' }} className={classes.inertiaButton} >
                                <Button variant="text" color="primary" type="button" disableElevation className={classes.buttonText} onClick={backStep}>
                                    VOLVER
                                </Button>
                                <Button variant="contained" color="primary" type="submit" disableElevation className={classes.buttonDial} onClick={nextStep}>
                                    REGISTRARME
                                </Button>
                            </div>
                        </form>
                    }
                </div>
            </Dialog>



            <Portal>
                <Snackbar open={open} autoHideDuration={2000} onClose={closeSnackSuccess}>
                    <Alert onClose={handleCloseSnack} severity="success">
                        Te has registrado con éxito!
                    </Alert>
                </Snackbar>
                <Snackbar open={open2} autoHideDuration={6000} onClose={handleCloseSnack2}>
                    <Alert onClose={handleCloseSnack2} severity="error">
                        Por favor llena todos los campos antes de continuar.
                    </Alert>
                </Snackbar>
            </Portal>
        </>
    )
}