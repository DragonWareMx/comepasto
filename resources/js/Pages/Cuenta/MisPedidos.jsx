import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js';
import { InertiaLink } from '@inertiajs/inertia-react';
import '/css/cuenta.css';
import '/css/recetas.css';
import moment from 'moment'

import Layout from '../../layouts/Layout';
import BlueInformation from '../../components/common/BlueInformation';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import Tooltip from '@material-ui/core/Tooltip';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const MisPedidos = ({ compras }) => {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    console.table(compras);
    moment.locale('es-mx');

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    return (
        <>
            {/* <BlueInformation></BlueInformation> */}

            <Container>
                <Grid container direction="row" flexwrap="wrap">
                    <Grid item xs={12} style={{ padding: '25px', display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <Grid item xs={12} className="title-section">
                            <InertiaLink href={route('cuenta')} style={{ color: '#1DA3A8', textDecoration: 'none' }}>MI CUENTA</InertiaLink>&nbsp;<Grid style={{ fontWeight: 300 }}>MIS PEDIDOS</Grid>
                        </Grid>

                        <Grid container direction="row" style={{ marginTop: 20 }}>
                            {/* PEDIDO */}
                            {compras && compras.map((pedido, index) => (
                                <Grid key={index} item xs={12} className="grid-container-pedido">
                                    <Accordion expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)} className="grid-container-pedido">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                            className="grid-gray-info"
                                        >
                                            <Grid item className="grid-child-gray">
                                                <Grid className="header-title">PEDIDO REALIZADO</Grid>
                                                <Grid className="header-info">{moment(pedido.created_at).format('LL')}</Grid>
                                            </Grid>

                                            <Grid item className="grid-child-gray">
                                                <Grid className="header-title">TOTAL</Grid>
                                                <Grid className="header-info"><b>${pedido.total} MXN</b></Grid>
                                            </Grid>

                                            <Grid item className="grid-child-gray">
                                                <Grid className="header-title">TIPO DE ENTREGA</Grid>
                                                <Grid className="header-info">{pedido.tipo_entrega.capitalize()}</Grid>
                                            </Grid>

                                            <Grid item className="grid-child-gray">
                                                <Grid className="header-title">TIPO DE PAGO</Grid>
                                                <Grid className="header-info">{pedido.formaPago.capitalize()}</Grid>
                                            </Grid>

                                        </AccordionSummary>

                                        <AccordionDetails>
                                            <Grid item xs={12} className="grid-white">
                                                <Grid item xs={12} className="status-pedido">En espera de entrega</Grid>
                                                <Grid container>
                                                    {/* ITEM PEDIDO  */}
                                                    <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
                                                        <Grid style={{ display: 'flex', flexWrap: 'wrap' }} className="item-pedido">
                                                            <Grid item xs={2}>
                                                                <InertiaLink href="#!"> <img src="/img/PRODUCTOS/1.png" className="img-item-pedido" /> </InertiaLink>
                                                            </Grid>
                                                            <Grid item xs={12} sm={10} className="grid-info-pedido">
                                                                <Grid item xs={12} className="txt-title-pedido-p"><InertiaLink href="#!" style={{ textDecoration: 'none', color: '#474747' }}>Harina para Hotcakes con proteína, avena y coco</InertiaLink></Grid>
                                                                <Grid item xs={12} className="txt-price-pedido">$55.00 MXN</Grid>
                                                                <Grid item xs={12} className="txt-cantidad-pedido"><b>Cantidad: 2</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  2 x $110.00</Grid>
                                                                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                    <a href="#!" style={{ textDecoration: 'none', marginBottom: '0px' }}>
                                                                        <Button size="large" className="button-receta" endIcon={<ShoppingCartOutlinedIcon>send</ShoppingCartOutlinedIcon>}>
                                                                            AGREGAR AL CARRITO
                                                                        </Button>
                                                                    </a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
                                                        <Grid style={{ display: 'flex', flexWrap: 'wrap' }} className="item-pedido">
                                                            <Grid item xs={2}>
                                                                <InertiaLink href="#!"> <img src="/img/PRODUCTOS/1.png" className="img-item-pedido" /> </InertiaLink>
                                                            </Grid>
                                                            <Grid item xs={12} sm={10} className="grid-info-pedido">
                                                                <Grid item xs={12} className="txt-title-pedido-p"><InertiaLink href="#!" style={{ textDecoration: 'none', color: '#474747' }}>Harina para Hotcakes con proteína, avena y coco</InertiaLink></Grid>
                                                                <Grid item xs={12} className="txt-price-pedido">$55.00 MXN</Grid>
                                                                <Grid item xs={12} className="txt-cantidad-pedido"><b>Cantidad: 2</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  2 x $110.00</Grid>
                                                                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                    <a href="#!" style={{ textDecoration: 'none', marginBottom: '0px' }}>
                                                                        <Button size="large" className="button-receta" endIcon={<ShoppingCartOutlinedIcon>send</ShoppingCartOutlinedIcon>}>
                                                                            AGREGAR AL CARRITO
                                                                        </Button>
                                                                    </a>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} className="info-little-envio">Costos de envío a Dirección completa lorem ipsum dolor sit amet consecteur <b>$90.00 MXN</b></Grid>
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            ))}



                            <Grid item xs={12} className="grid-container-pedido">
                                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className="grid-container-pedido">
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2bh-content"
                                        id="panel1bh-header"
                                        className="grid-gray-info"
                                    >
                                        <Grid item className="grid-child-gray">
                                            <Grid className="header-title">PEDIDO REALIZADO</Grid>
                                            <Grid className="header-info">24 Mayo 2021</Grid>
                                        </Grid>

                                        <Grid item className="grid-child-gray">
                                            <Grid className="header-title">TOTAL</Grid>
                                            <Grid className="header-info"><b>$7005.58 MXN</b></Grid>
                                        </Grid>

                                        <Grid item className="grid-child-gray">
                                            <Grid className="header-title">TIPO DE ENTREGA</Grid>
                                            <Grid className="header-info">Envío a domicilio</Grid>
                                        </Grid>

                                        <Grid item className="grid-child-gray">
                                            <Grid className="header-title">TIPO DE PAGO</Grid>
                                            <Grid className="header-info">Pago en efectivo</Grid>
                                        </Grid>

                                    </AccordionSummary>

                                    <AccordionDetails>
                                        <Grid item xs={12} className="grid-white">
                                            <Grid item xs={12} className="status-pedido">En espera de entrega</Grid>
                                            <Grid container>
                                                {/* ITEM PEDIDO  */}
                                                <Grid item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
                                                    <Grid style={{ display: 'flex', flexWrap: 'wrap' }} className="item-pedido">
                                                        <Grid item xs={2}>
                                                            <InertiaLink href="#!"> <img src="/img/PRODUCTOS/1.png" className="img-item-pedido" /> </InertiaLink>
                                                        </Grid>
                                                        <Grid item xs={12} sm={10} className="grid-info-pedido">
                                                            <Grid item xs={12} className="txt-title-pedido-p"><InertiaLink href="#!" style={{ textDecoration: 'none', color: '#474747' }}>Harina para Hotcakes con proteína, avena y coco</InertiaLink></Grid>
                                                            <Grid item xs={12} className="txt-price-pedido">$55.00 MXN</Grid>
                                                            <Grid item xs={12} className="txt-cantidad-pedido"><b>Cantidad: 2</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  2 x $110.00</Grid>
                                                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                <a href="#!" style={{ textDecoration: 'none', marginBottom: '0px' }}>
                                                                    <Button size="large" className="button-receta" endIcon={<ShoppingCartOutlinedIcon>send</ShoppingCartOutlinedIcon>}>
                                                                        AGREGAR AL CARRITO
                                                                    </Button>
                                                                </a>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} className="info-little-envio">Costos de envío a Dirección completa lorem ipsum dolor sit amet consecteur <b>$90.00 MXN</b></Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                        </Grid>

                    </Grid>
                </Grid>
            </Container>

        </>
    )
}


MisPedidos.layout = page => <Layout children={page} title="Comepasto - Mis Pedidos" pageTitle="Mis Pedidos" />

export default MisPedidos