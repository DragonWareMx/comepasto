import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js';
import { InertiaLink } from '@inertiajs/inertia-react';
import '/css/cuenta.css';
import '/css/QuienesSomos.css';
// import '/css/recetas.css';
import Layout from '../../layouts/Layout';
import BlueInformation from '../../components/common/BlueInformation';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';

import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import LockIcon from '@material-ui/icons/Lock';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import PaymentIcon from '@material-ui/icons/Payment';
import Tooltip from '@material-ui/core/Tooltip';

const Cuenta = () => {
    return (
        <>
            <Container>
                <Grid container direction="row" flexwrap="wrap">
                    <Grid item xs={12} style={{ padding: '25px', display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <Grid item xs={12} className="title-section">
                            MI CUENTA
                        </Grid>

                        <Grid container direction="row" spacing={10} style={{ marginTop: 20 }}>
                            <Grid item xs={12} sm={5}>
                                <InertiaLink href={route('misPedidos')} item className="quienes_card link-option-cuenta" style={{ width: '100%' }}>
                                    <Grid container item justify="center" alignItems="center" xs={4}>
                                        <Grid className="quienes_card_circle"><LocalShippingOutlinedIcon style={{ fontSize: 40 }} className="quienes_card_icon"></LocalShippingOutlinedIcon></Grid>
                                    </Grid>
                                    <Grid item xs={8} style={{ paddingRight: 17, paddingBottom: 10 }}>
                                        <Grid className="quienes_card_title">Mis pedidos</Grid>
                                        <Grid className="quienes_card_text">Conoce el estado de tus pedidos, consulta tu historial, o compra algo de nuevo</Grid>
                                    </Grid>
                                </InertiaLink>
                            </Grid>

                            <Grid item xs={12} sm={5}>
                                <InertiaLink href={route('informacion')} item className="quienes_card link-option-cuenta" style={{ width: '100%' }}>
                                    <Grid container item justify="center" alignItems="center" xs={4}>
                                        <Grid className="quienes_card_circle"><LockIcon style={{ fontSize: 40 }} className="quienes_card_icon"></LockIcon></Grid>
                                    </Grid>
                                    <Grid item xs={8} style={{ paddingRight: 17, paddingBottom: 10 }}>
                                        <Grid className="quienes_card_title">Información</Grid>
                                        <Grid className="quienes_card_text">Datos de la cuenta, teléfono y contraseña para iniciar sesión</Grid>
                                    </Grid>
                                </InertiaLink>
                            </Grid>

                            {/* <div className="quienes_cards_spaces">esto funciona como un espacio</div>
                        <InertiaLink href={route('direcciones')} item className="quienes_card link-option-cuenta">
                            <Grid container item justify="center" alignItems="center" xs={4}>
                                <Grid className="quienes_card_circle"><HomeWorkIcon style={{ fontSize: 40 }} className="quienes_card_icon"></HomeWorkIcon></Grid>
                            </Grid>
                            <Grid item xs={8} style={{ paddingRight: 17, paddingBottom: 10 }}>
                                <Grid className="quienes_card_title">Direcciones</Grid>
                                <Grid className="quienes_card_text">Administra direcciones para la entrega de tus pedidos</Grid>
                            </Grid>
                        </InertiaLink>

                        <div className="quienes_cards_spaces">esto funciona como un espacio</div>

                        <InertiaLink href={route('misPagos')} item className="quienes_card last-card-cuenta link-option-cuenta">
                            <Grid container item justify="center" alignItems="center" xs={4}>
                                <Grid className="quienes_card_circle"><PaymentIcon style={{ fontSize: 40 }} className="quienes_card_icon"></PaymentIcon></Grid>
                            </Grid>
                            <Grid item xs={8} style={{ paddingRight: 17, paddingBottom: 10 }}>
                                <Grid className="quienes_card_title">Mis pagos</Grid>
                                <Grid className="quienes_card_text">Administra configuraciones y métodos de pago</Grid>
                            </Grid>
                        </InertiaLink> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}


Cuenta.layout = page => <Layout children={page} title="Comepasto - Cuenta" pageTitle="Cuenta" />

export default Cuenta