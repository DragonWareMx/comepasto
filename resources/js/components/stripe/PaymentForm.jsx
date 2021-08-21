import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia'


import '../../Styles/stripe.css';

const useStyles = makeStyles((theme) => ({
    formGroup: {
        margin: '0 15px 20px',
        padding: 0,
        borderStyle: 'none',
        backgroundColor: '#7795f8',
        willChange: 'opacity, transform',
        boxShadow: '0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #829fff',
        borderRadius: '4px',
    },
    formRow: {
        display: '-ms-flexbox',
        display: 'flex',
        "-ms-flex-align": 'center',
        alignItems: 'center',
        marginLeft: '15px',
        borderTop: '1px solid #819efc',
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
}));

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#c4f0ff',
            color: '#fff',
            fontWeight: 500,
            fontFamily: "Monsterrat, Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: 'antialiased',
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        //     type: 'card',
        //     card: elements.getElement(CardElement),
        // });

        const { error, token } = await stripe.createToken(elements.getElement(CardElement));

        if (!error) {
            try {
                // const { id } = paymentMethod;
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
                        console.log('funcionó prrin')
                    },
                    onError: () => {
                        console.log('no jaló prrin')
                    }
                })

                setSuccess(true);
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
                    <h4>Gracias por tu compra prrin</h4>
                </div>
            }
        </>
    )
}
