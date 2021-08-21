import { React, useState } from 'react';
import Layout from '../layouts/Layout';
import { InertiaLink } from '@inertiajs/inertia-react'

import { Container, Grid, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import StripeContainer from '../components/stripe/StripeContainer'

import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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
    title: {
        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '20px',
        color: '#1DA3A8'
    },
}));

const Stripe = () => {
    const classes = useStyles();

    return (
        <>
            <Container>
                <div className={classes.title} style={{ marginTop: "30px" }}>INFORMACIÓN DE LA TARJETA</div>
                <Grid container spacing={5} wrap={'wrap-reverse'}>
                    <Grid item xs={12} md={6}>
                        <StripeContainer />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        Aqui va lo del carrito
                    </Grid>
                </Grid>

            </Container>
        </>
    );
};

Stripe.layout = (page) => (
    <Layout children={page} title="Pago con Stripe" pageTitle="Pago con Stripe" />
);

export default Stripe;