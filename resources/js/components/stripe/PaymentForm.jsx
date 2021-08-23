import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Button, TextField, Grid } from '@material-ui/core';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia'
import { InertiaLink, usePage } from '@inertiajs/inertia-react'
import teal from '@material-ui/core/colors/teal';

import '../../Styles/stripe.css';

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
    formGroup: {
        margin: '0 15px 20px',
        padding: 0,
        borderStyle: 'none',
        borderBottom: '2px solid #C5C5C5',
        backgroundColor: 'transparent',
        willChange: 'opacity, transform',
        //boxShadow: '0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #829fff',
        borderRadius: '1px',
    },
    formRow: {
        display: '-ms-flexbox',
        display: 'flex',
        "-ms-flex-align": 'center',
        alignItems: 'center',
        marginLeft: '15px',
        // borderTop: '1px solid #819efc',
    },
    buttonDial: {
        background: '#1DA3A8',
        color: '#FFFFFF',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '13px',
        lineHeight: '21px',
        height: '45px',
        width: "100%",

        border: "1px solid #E3E3E3",

        '&:hover': {
            background: '#1DA3A8',
            color: '#FFFFFF',
        },
    },
    inertiaButton: {
        width: "100%",


        height: "fit-content",
        backgroundColor: "transparent",

        marginTop: "12px",
        marginBottom: "20px",

        padding: "0px",
        border: "none",
    },
    formulario: {
        padding: "0px 2%",
        marginBottom: "20px",
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    textField: {
        fontFamily: "Atma",
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '15px',
        lineHeight: '23px',
        color: '#333333',
        marginTop: '10px',
        marginBottom: '10px',
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
    inertiaButtonCart: {
        width: "fit-content",
        height: "fit-content",
        backgroundColor: "transparent",
        marginTop: "12px",
        marginBottom: "20px",
        padding: "0px",
        border: "none"
    },
    buttonCart: {
        background: 'transparent',
        color: '#9F9F9F',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '13px',
        lineHeight: '21px',

        width: '100%',
        height: '38px',

        border: "1px solid #E3E3E3",

        '&:hover': {
            background: '#1DA3A8',
            color: '#FFFFFF',
        },
    },
    mensaje: {
        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '18px',
        lineHeight: '25px',
        color: '#1e1e1e',
    }
}));

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#1DA3A8',
            color: '#0e0e0e',
            fontWeight: 400,
            fontFamily: "Monsterrat, Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: 'auto',
            ":-webkit-autofill": { color: "#9E9E9E" },
            "::placeholder": { color: "#9E9E9E" }
        },
        invalid: {
            iconColor: "#FFC7EE",
            color: "ffc7ee"
        }
    },
    hidePostalCode: true
}

export default function PaymentForm() {
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const classes = useStyles();
    const { errors, flash } = usePage().props

    const [values, setValues] = useState({
        name: '',
        address_line1: '',
        address_line2: '',
        address_city: '',
        address_state: '',
        address_zip: '',
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        //     type: 'card',
        //     card: elements.getElement(CardElement),
        // });

        const { error, token } = await stripe.createToken(elements.getElement(CardElement), values);

        if (!error) {
            try {
                const { id } = token;
                //aqui deberia de ir axios
                console.log(id);
                // const response = await axios.post('/payment/stripe/pay', {
                //     id: id
                // });

                // console.log(response);

                Inertia.post('/payment/stripe/pay', { token: id }, {
                    preserveScroll: true,
                    onSuccess: () => {
                        setSuccess(true);
                    },
                    onError: () => {
                        var div = document.getElementById('stripe-error');
                        div.innerText = 'Ocurrió un error inesperado, intentalo más tarde.';
                    }
                })
            } catch (error) {
                console.log("Error", error)
                var div = document.getElementById('stripe-error');
                div.innerText = error.message;
            }
        }
        else {
            console.log("Error", error)
            var div = document.getElementById('stripe-error');
            div.innerText = error.message;
        }
    }

    return (
        <>
            {!success ?
                <form onSubmit={handleSubmit}>
                    <div className={classes.formulario}>
                        <MuiThemeProvider theme={theme}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} >
                                    <TextField required id="name" label="Nombre en tarjeta"
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
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField required id="address_line1" label="Calle y número"
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
                                        value={values.address_line1}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField required id="address_line2" label="Colonia"
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
                                        value={values.address_line2}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField required id="address_city" label="Ciudad"
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
                                        value={values.address_city}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField required id="address_state" label="Estado"
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
                                        value={values.address_state}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField required id="address_zip" label="Código Postal"
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
                                        value={values.address_zip}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </MuiThemeProvider>
                    </div>
                    <fieldset className={classes.formGroup}>
                        <div className={classes.formRow}>
                            <CardElement options={CARD_OPTIONS}></CardElement>
                        </div>
                    </fieldset>
                    <div id='stripe-error'></div>
                    <div className={classes.inertiaButton}>
                        <Button variant="contained" color="primary" type="submit" disableElevation className={classes.buttonDial}>Pagar</Button>
                    </div>
                </form>
                :
                <div>
                    <h4 className={classes.mensaje}>Comepasto te agradece tu compra, en tu correo electrónico recibirás los detalles de tu compra. Conoce más productos en nuestra tienda.</h4>
                    <Grid container direction="column"
                        justifyContent="center"
                        alignItems="center">
                        <InertiaLink href={route('inicio') + '#tienda'} as="button" style={{ textDecoration: "none" }} className={classes.inertiaButtonCart} preserveScroll>
                            <Button variant="contained" color="primary" component="div" disableElevation className={classes.buttonCart}>
                                IR A LA TIENDA
                            </Button>
                        </InertiaLink>
                    </Grid>
                </div>
            }
        </>
    )
}
