import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import { makeStyles } from '@material-ui/core/styles';
import route from 'ziggy-js';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../layouts/LayoutAdmin';
import '/css/admin.css';
import '/css/adminProductos.css';
import '/css/adminPedidos.css';
import '/css/cuenta.css';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Cliente = () => {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return ( 
        <>
        <Container> 
            <Grid container style={{paddingTop:'34px'}}>
                {/* TOP PAGE, BACK BUTTON */}
                <Grid item xs={12} className="top-admin">
                    <InertiaLink href={route('admin.clientes')} className="title-page subtitle-page"><ArrowBackIcon style={{marginRight:'9px'}} />Clientes</InertiaLink>
                </Grid>

                <Grid item xs={12} style={{marginBottom:'25px',display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={12} md={4}>
                        <Grid item xs={12} className="grid-section">
                            <Grid item xs={12} className="section-top-grid">
                                <Grid>Información de contacto</Grid>
                            </Grid>
                            {/* contenido */}
                            <Grid item xs={12} style={{padding:'20px',display:'flex',alignItems:'flex-start',flexWrap:'wrap'}}>
                                <Grid item xs={12}>
                                    <Grid item xs={12} className="title-item-info t-i-i-pedidos">NOMBRE</Grid>
                                    <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>Lorem ipsum dolor sit amet</Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item xs={12} className="title-item-info t-i-i-pedidos">CORREO ELECTRÓNICO</Grid>
                                    <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>correo@ejemplo.com</Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item xs={12} className="title-item-info t-i-i-pedidos">TELÉFONO</Grid>
                                    <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>44 44 44 44 44</Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item xs={12} className="title-item-info t-i-i-pedidos">DIRECCIÓN</Grid>
                                    <Grid item xs={12}className="item-info-txt i-i-t-pedidos mg-0" style={{padding:'0px',marginBottom:'0px'}}>Lorem ipsum dolor sit amet</Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className="button-pay" style={{cursor:'initial'}}>Fecha de registro: 20/08/2021  10:05</Grid>
                        </Grid>
                        
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                    {/* GRID CONFIG STOCK */}
                    <Grid item xs={12}  className="grid-spacing-20">
                        <Grid className="grid-section">
                            <Grid item xs={12} className="section-top-grid" style={{padding:'23px'}}>
                                <Grid>Pedidos realizados</Grid>
                            </Grid>       

                            {/* PEDIDO */}
                            <Grid item xs={12} className="grid-container-pedido">
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="grid-container-pedido">
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
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
                                                    <Grid item xs={12} sm={6} style={{display:'flex'}}>
                                                        <Grid style={{display:'flex', flexWrap:'wrap'}} className="item-pedido">
                                                            <Grid item xs={2}>
                                                                <InertiaLink href="#!"> <img src="/img/PRODUCTOS/1.png" className="img-item-pedido" /> </InertiaLink>
                                                            </Grid>
                                                            <Grid item xs={12} sm={10} className="grid-info-pedido">
                                                                <Grid item xs={12} className="txt-title-pedido-p"><InertiaLink href="#!" style={{textDecoration:'none', color:'#474747'}}>Harina para Hotcakes con proteína, avena y coco</InertiaLink></Grid>
                                                                <Grid item xs={12} className="txt-price-pedido">$55.00 MXN</Grid>
                                                                <Grid item xs={12} className="txt-cantidad-pedido"><b>Cantidad: 2</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  2 x $110.00</Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {/* ITEM PEDIDO  */}
                                                    <Grid item xs={12} sm={6} style={{display:'flex'}}>
                                                        <Grid style={{display:'flex', flexWrap:'wrap'}} className="item-pedido">
                                                            <Grid item xs={2}>
                                                                <InertiaLink href="#!"> <img src="/img/PRODUCTOS/1.png" className="img-item-pedido" /> </InertiaLink>
                                                            </Grid>
                                                            <Grid item xs={12} sm={10} className="grid-info-pedido">
                                                                <Grid item xs={12} className="txt-title-pedido-p"><InertiaLink href="#!" style={{textDecoration:'none', color:'#474747'}}>Harina para Hotcakes con proteína, avena y coco</InertiaLink></Grid>
                                                                <Grid item xs={12} className="txt-price-pedido">$55.00 MXN</Grid>
                                                                <Grid item xs={12} className="txt-cantidad-pedido"><b>Cantidad: 2</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  2 x $110.00</Grid>
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
                </Grid>

            </Grid>
        </Container>
    </>
    )
}

Cliente.layout = page => <Layout children={page} title="Comepasto - Clientes" pageTitle="Clientes" />

export default Cliente