import { React, useState, useEffect } from 'react';
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Dialog, Button, TextField, Snackbar, Portal, Radio, Grid, InputAdornment } from '@material-ui/core';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import MapPicker from 'react-google-map-picker'

import StepBarPago from '../auth/StepBarPago';

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
    overrides: {
        MuiRadio: {
            root: {
                color: teal[100],
            },
            colorSecondary: {
                '&$checked': {
                    color: teal[500],
                },
            },
        },
    },
});

const useStyles = makeStyles((theme) => ({
    cardRegistro: {
        width: "100%",
        maxWidth: "600px",
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
        maxWidth: '600px',

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
        width: "88%",
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
    textOption: {
        fontFamily: "Atma",
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '15px',
        lineHeight: '23px',
        color: '#333333',
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
    },
    formControl: {
        width: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    costo: {
        fontFamily: 'Oxygen',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '15px',
        lineHeight: '19px',
        color: '#1DA3A8',
        marginLeft: '0px',
        marginRight: 'auto'
    },
    pagoImg: {
        width: '100%',
        minWidth: '40px',
        maxWidth: '76px',
    },
}));

export default function Pago({ dialog, handleClose, subtotal, handleCloseCarrito }) {
    const { errors } = usePage().props
    const classes = useStyles();
    const [values, setValues] = useState({
        tipo_de_envio: '',
        phone: '',
        direction: '',
        costoEnvio: 0,
        tipo_de_pago: 'paypal',
        step: 0,
        percent: 1,
        error: false
    });

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);

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

    const handleClickInfo = () => {
        setOpenInfo(true);
    };

    const handleCloseSnackInfo = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenInfo(false);
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
        Inertia.post('/payment', values, {
            preserveScroll: true,
            onSuccess: () => {
                //aqui debería ir para cerrar el carrito xd
                handleCerrar();
                handleCloseCarrito();
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
            tipo_de_pago: '',
            phone: '',
            direction: '',
            step: 0,
            percent: 1,
            error: false
        }))
        handleClose();
    }

    function nextStep() {
        if (values.tipo_de_envio != '' && values.step == 0) {
            if (values.tipo_de_envio == 'domicilio') {
                setValues(values => ({
                    ...values,
                    percent: 50,
                    step: 1
                }));
                if (values.direction == '') {
                    getDirection(defaultLocation.lat, defaultLocation.lng);
                }
            }
            else {
                setValues(values => ({
                    ...values,
                    percent: 100,
                    step: 2,
                    costoEnvio: 0,
                }));
            }
        }
        else {
            handleClick2();
        }
    }

    function nextStep2() {
        setValues(values => ({
            ...values,
            percent: 100,
            step: 2
        }));
    }

    function backStep() {
        setValues(values => ({
            ...values,
            percent: 1,
            step: values.step - 1,
        }));
    }

    function backStep2() {
        if (values.tipo_de_envio == 'domicilio') {
            setValues(values => ({
                ...values,
                percent: 50,
                step: 1
            }));
        }
        else {
            setValues(values => ({
                ...values,
                percent: 0,
                step: 0
            }));
        }
    }

    function closeSnackSuccess() {
        handleClose();
        setTimeout(handleCloseSnack, 4000);
    }

    //funciones nuevas
    const handleChangeSelect = (event) => {
        setValues(values => ({
            ...values,
            tipo_de_envio: event.target.value,
        }));
        setTimeout(() => { setBloqueado(false); }, 2000);
    };

    const [bloqueado, setBloqueado] = useState(true)

    const handleChangeRadio = (event) => {
        setValues(values => ({
            ...values,
            tipo_de_pago: event.target.value,
        }));
    };

    //esto de abajo es para el mapa
    const DefaultZoom = 16;
    const [defaultLocation, setDefaultLocation] = useState({ lat: 19.705914384350006, lng: -101.19273489110634 });

    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunction);
        } else {
            handleClickInfo();
        }
    }, []);

    function successFunction(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        console.log('mi posicion: ', lat, long);
        getDirection(lat, long);
        setLocation({ lat: lat, lng: long });
        setDefaultLocation({
            lat: lat, lng: long
        })
    }

    function getDirection(lat, long) {
        var uri = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=AIzaSyDAsRsMlBifyC8uKaJMAskmREIdfLqBYyA';
        // console.log(uri);
        fetch(uri)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setValues(values => ({
                        ...values,
                        direction: result.results[0].formatted_address,
                    }))
                },
                // Nota: es importante manejar errores aquí y no en
                // un bloque catch() para que no interceptemos errores
                // de errores reales en los componentes.
                (error) => {
                    console.log(error)
                }
            )
    }

    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);

    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
        getDirection(lat, lng);
        setValues(values => ({
            ...values,
            costoEnvio: 0,
        }))
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    const [cotizar, setCotizar] = useState(false);

    function handleChangeDirection(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            costoEnvio: 0,
            [key]: value,
        }))
        setCotizar(true);
    }

    function handleResetLocation() {
        // setDefaultLocation({ ...DefaultLocation });
        // setZoom(DefaultZoom);
        var uri = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(values.direction) + '&key=AIzaSyDAsRsMlBifyC8uKaJMAskmREIdfLqBYyA';
        // console.log(uri);
        fetch(uri)
            .then(res => res.json())
            .then(
                (result) => {
                    var latitud = result.results[0].geometry.location.lat;
                    var longitud = result.results[0].geometry.location.lng;
                    setDefaultLocation({ lat: latitud, lng: longitud });
                    setZoom(DefaultZoom);
                    setValues(values => ({
                        ...values,
                        costoEnvio: 0,
                    }));
                },
                // Nota: es importante manejar errores aquí y no en
                // un bloque catch() para que no interceptemos errores
                // de errores reales en los componentes.
                (error) => {
                    console.log(error)
                }
            )

        setCotizar(false);
    }

    function cotizarEnvio(e) {
        e.preventDefault()
        Inertia.post('/cotizar', location, {
            preserveScroll: true,
            onSuccess: (data) => {
                setValues(values => ({
                    ...values,
                    costoEnvio: data.props.flash.data,
                }))
            },
            onError: () => {
                console.log('Intentalo mas tarde');
            }
        })
    }

    function sacarSubtotal(subtotal) {
        try {
            var numero = parseFloat(subtotal.substring(1));
        } catch (error) {
            var numero = 0
        }
        return numero;
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
                        PROCEDER PAGO
                    </div>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={handleCerrar}>
                        <CloseIcon />
                    </IconButton>
                    <div className={classes.cardText} style={{ marginTop: "12px", marginBottom: '12px' }}>
                        <StepBarPago percent={values.percent} />
                    </div>
                    <div className={classes.downStep} style={{ marginBottom: '15px' }}>
                        <div>ENTREGA</div>
                        <div style={{ marginLeft: '15px' }}>ENVÍO</div>
                        <div>TIPO DE PAGO</div>
                    </div>
                    {values.step == 0 &&
                        <form className={classes.formulario} id="login-form">
                            <MuiThemeProvider theme={theme}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel shrink id="demo-simple-select-placeholder-label-label" className={classes.formTextLabel}>
                                        Tipo de entrega
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-placeholder-label-label"
                                        id="demo-simple-select-placeholder-label"
                                        value={values.tipo_de_envio}
                                        onChange={handleChangeSelect}
                                        displayEmpty
                                        className={classes.textField}
                                    >
                                        <MenuItem value="" className={classes.textOption}>
                                            <em>Elige una opción</em>
                                        </MenuItem>
                                        <MenuItem value={'tienda'} className={classes.textOption}>Entrega en tienda</MenuItem>
                                        <MenuItem value={'domicilio'} className={classes.textOption}>Entrega a domicilio</MenuItem>
                                    </Select>
                                </FormControl>
                                {/* <TextField required id="fullName" label="Nombre completo"
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
                                /> */}
                            </MuiThemeProvider>

                            <div style={{ textDecoration: "none" }} className={classes.inertiaButton} >
                                <Button variant="text" color="primary" type="button" disableElevation className={classes.buttonText} onClick={handleCerrar}>
                                    CANCELAR
                                </Button>
                                <Button variant="contained" disabled={bloqueado} id='bloqueado' color="primary" type="button" disableElevation className={classes.buttonDial} onClick={nextStep}>
                                    SIGUIENTE
                                </Button>
                            </div>
                        </form>
                    }
                    {values.step == 1 &&
                        <>
                            <form className={classes.formulario} onSubmit={handleSubmit} id="login-form" style={{ marginBottom: 0 }}>
                                <div className={classes.cardTitle} style={{ marginTop: "10px" }}>
                                    COTIZAR COSTO DEL ENVÍO
                                </div>
                                <div className={classes.textDireccion} style={{ color: '#7C7C7C' }}>
                                    Ingresa tu dirección para poder calcular el costo de envío
                                </div>
                                <div className={classes.textDireccion} style={{ color: '#d1d1d1', fontSize: '12px' }}>
                                    Más tarde nos contactaremos contigo para verificar la dirección de envío
                                </div>
                                <MuiThemeProvider theme={theme}>
                                    <TextField required id="direction" label="Dirección"
                                        InputProps={{
                                            className: classes.textField,
                                            endAdornment:
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="Cambiar direccion"
                                                        onClick={handleResetLocation}
                                                    >
                                                        <SearchIcon />
                                                    </IconButton>
                                                </InputAdornment>
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
                                        onChange={handleChangeDirection}
                                        error={errors.direction && values.error == true && true}
                                        helperText={values.error == true && errors.direction}
                                    />
                                </MuiThemeProvider>

                                <MapPicker defaultLocation={defaultLocation}
                                    zoom={zoom}
                                    mapTypeId="roadmap"
                                    style={{ height: '400px' }}
                                    onChangeLocation={handleChangeLocation}
                                    onChangeZoom={handleChangeZoom}
                                    apiKey='AIzaSyDAsRsMlBifyC8uKaJMAskmREIdfLqBYyA' />

                                <div style={{ textDecoration: "none", marginTop: '20px', marginBottom: '5px' }} className={classes.inertiaButton} >
                                    <Button variant="text" color="primary" type="button" disableElevation className={classes.buttonText} onClick={backStep}>
                                        VOLVER
                                    </Button>
                                    {values.costoEnvio && (values.costoEnvio > 0 && values.costoEnvio < 145) ?
                                        <Button variant="contained" color="primary" type="button" disableElevation className={classes.buttonDial} onClick={nextStep2}>
                                            SIGUIENTE
                                        </Button>
                                        :
                                        <Button variant="contained" color="primary" disabled={cotizar} type="button" disableElevation className={classes.buttonDial} onClick={cotizarEnvio}>
                                            COTIZAR ENVÍO
                                        </Button>
                                    }
                                </div>
                            </form>
                            {values.costoEnvio < 145 ?
                                <div className={classes.costo}>Costo del envío: ${values.costoEnvio}.00 MXN </div>
                                :
                                <div className={classes.costo}>Estás muy lejos de Comepasto, ponte en contacto con nosotros para encontrar una solución para tu envío </div>
                            }
                        </>
                    }
                    {values.step == 2 &&
                        <form className={classes.formulario} onSubmit={handleSubmit} id="login-form">
                            <div className={classes.textDireccion} style={{ color: '#7C7C7C' }}>
                                Selecciona tu método de pago
                            </div>
                            <Grid container alignItems='center' spacing={2}>
                                <MuiThemeProvider theme={theme}>
                                    <Grid item sm={6} md={3} style={{ alignItems: 'center', display: 'flex' }}>
                                        <Radio
                                            checked={values.tipo_de_pago === 'paypal'}
                                            onChange={handleChangeRadio}
                                            value="paypal"
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': 'A' }}
                                        />
                                        <img
                                            src='/img/pago/paypal.png'
                                            className={classes.pagoImg}
                                        />
                                    </Grid>
                                    <Grid item sm={6} md={3} style={{ alignItems: 'center', display: 'flex' }}>
                                        <Radio
                                            checked={values.tipo_de_pago === 'stripe'}
                                            onChange={handleChangeRadio}
                                            value="stripe"
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': 'A' }}
                                        />
                                        <img
                                            src='/img/pago/stripe.png'
                                            className={classes.pagoImg}
                                        />
                                    </Grid>
                                    <Grid item sm={6} md={3} style={{ alignItems: 'center', display: 'flex' }}>
                                        <Radio
                                            checked={values.tipo_de_pago === 'transferencia'}
                                            onChange={handleChangeRadio}
                                            value="transferencia"
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': 'A' }}
                                        />
                                        <div style={{ fontFamily: 'Atma', fontSize: 13, color: '#333333', marginTop: 3 }}>Transferencia</div>
                                    </Grid>
                                    <Grid item sm={6} md={3} style={{ alignItems: 'center', display: 'flex' }}>
                                        <Radio
                                            checked={values.tipo_de_pago === 'efectivo'}
                                            onChange={handleChangeRadio}
                                            value="efectivo"
                                            name="radio-button-demo"
                                            inputProps={{ 'aria-label': 'A' }}
                                        />
                                        <div style={{ fontFamily: 'Atma', fontSize: 13, color: '#333333', marginTop: 3 }}>Efectivo</div>
                                    </Grid>
                                </MuiThemeProvider>
                            </Grid>

                            <Grid container style={{ marginTop: 33 }}>
                                <Grid item xs={12} style={{ fontFamily: 'Oxygen', fontSize: 14, color: '#595959', fontWeight: 400 }}> Costo del pedido: {subtotal && subtotal} MXN</Grid>
                                <Grid item xs={12} style={{ fontFamily: 'Oxygen', fontSize: 14, color: '#595959', marginTop: 10, fontWeight: 400 }}> Costo del envio: ${values.costoEnvio && values.costoEnvio}.00 MXN</Grid>
                                <Grid item xs={12} style={{ fontFamily: 'Oxygen', fontSize: 15, color: '#1DA3A8', marginTop: 10, fontWeight: 700 }}> TOTAL: ${values.costoEnvio + sacarSubtotal(subtotal)} MXN</Grid>
                            </Grid>

                            <div style={{ textDecoration: "none", marginTop: '30px' }} className={classes.inertiaButton} >
                                <Button variant="text" color="primary" type="button" disableElevation className={classes.buttonText} onClick={backStep2}>
                                    VOLVER
                                </Button>
                                <Button variant="contained" color="primary" type="submit" disableElevation className={classes.buttonDial}>
                                    {values.tipo_de_pago == 'stripe' ? 'SIGUIENTE' : 'FINALIZAR COMPRA'}
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
                <Snackbar open={openInfo} autoHideDuration={4000} onClose={handleCloseSnackInfo}>
                    <Alert onClose={handleCloseSnackInfo} severity="info">
                        Para tener una mejor experiencia por favor activa tu ubicación y recarga la página.
                    </Alert>
                </Snackbar>
            </Portal>
        </>
    )
}