import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js';
import { InertiaLink } from '@inertiajs/inertia-react';
import '/css/cuenta.css';
import '/css/recetas.css';

import Layout from '../../layouts/Layout';
import BlueInformation from '../../components/common/BlueInformation';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import Tooltip from '@material-ui/core/Tooltip';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const MisPedidos = () => {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return ( 
        <>
            <BlueInformation></BlueInformation>

            <Grid container direction="row" flexwrap="wrap">
                <Grid item xs={12} style={{padding:'25px',display:'flex',alignItems:'baseline',flexWrap:'wrap'}}>
                    <Grid item xs={12} className="title-section">
                        <InertiaLink href={route('cuenta')} style={{color:'#1DA3A8', textDecoration:'none'}}>CUENTA</InertiaLink>&nbsp;<Grid style={{fontWeight:300}}>MIS PEDIDOS</Grid>
                    </Grid>
                
                    <Grid container direction="row" style={{marginTop:20}}>

                        <Grid item xs={12} className="grid-container-pedido">
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className="grid-container-pedido">
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                className="grid-gray-info"
                                >
                                        <Grid item className="grid-child-gray" direction="column" alignItems="center">
                                            <Grid className="header-title">PEDIDO REALIZADO</Grid>
                                            <Grid className="header-info">24 Mayo 2021</Grid>
                                        </Grid>

                                        <Grid item className="grid-child-gray" direction="column" alignItems="center">
                                            <Grid className="header-title">TOTAL</Grid>
                                            <Grid className="header-info"><b>$7005.58 MXN</b></Grid>
                                        </Grid>

                                        <Grid item className="grid-child-gray" direction="column" alignItems="center">
                                            <Grid className="header-title">TIPO DE ENTREGA</Grid>
                                            <Grid className="header-info">Envío a domicilio</Grid>
                                        </Grid>

                                        <Grid item className="grid-child-gray" direction="column" alignItems="center">
                                            <Grid className="header-title">TIPO DE PAGO</Grid>
                                            <Grid className="header-info">Pago en efectivo</Grid>
                                        </Grid>
                                    
                                </AccordionSummary>
                                
                                <AccordionDetails>
                                    <Grid item xs={12} className="grid-white">
                                        <Grid item xs={12} className="status-pedido">En espera de entrega</Grid>
                                            <Grid container>
                                                {/* ITEM PEDIDO  */}
                                                <Grid item xs={12} sm={6} md={4} style={{display:'flex'}}>
                                                    <Grid style={{display:'flex', flexWrap:'wrap'}} className="item-pedido">
                                                        <Grid item xs={2}>
                                                            <img src="/img/PRODUCTOS/1.png" className="img-item-pedido" />
                                                        </Grid>
                                                        <Grid item xs={12} sm={10} className="grid-info-pedido">
                                                            <Grid item xs={12} className="txt-title-pedido-p">Harina para Hotcakes con proteína, avena y coco</Grid>
                                                            <Grid item xs={12} className="txt-price-pedido">$55.00 MXN</Grid>
                                                            <Grid item xs={12} className="txt-cantidad-pedido"><b>Cantidad: 2</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  2 x $110.00</Grid>
                                                            <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                                                                <a href="#!" style={{textDecoration:'none', marginBottom:'0px'}}>
                                                                    <Button  size="large" className="button-receta" endIcon={<ShoppingCartOutlinedIcon>send</ShoppingCartOutlinedIcon>}>
                                                                        AGREGAR AL CARRITO
                                                                    </Button>
                                                                </a>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                
                                                {/* ITEM PEDIDO  */}
                                                <Grid item xs={12} sm={6} md={4} style={{display:'flex'}}>
                                                    <Grid style={{display:'flex', flexWrap:'wrap'}} className="item-pedido">
                                                        <Grid item xs={2}>
                                                            <img src="/img/PRODUCTOS/2.png" className="img-item-pedido" />
                                                        </Grid>
                                                        <Grid item xs={12} sm={10} className="grid-info-pedido">
                                                            <Grid item xs={12} className="txt-title-pedido-p">Harina para Hotcakes con proteína, avena y coco</Grid>
                                                            <Grid item xs={12} className="txt-price-pedido">$55.00 MXN</Grid>
                                                            <Grid item xs={12} className="txt-cantidad-pedido"><b>Cantidad: 2</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  2 x $110.00</Grid>
                                                            <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                                                                <a href="#!" style={{textDecoration:'none', marginBottom:'0px'}}>
                                                                    <Button  size="large" className="button-receta" endIcon={<ShoppingCartOutlinedIcon>send</ShoppingCartOutlinedIcon>}>
                                                                        AGREGAR AL CARRITO
                                                                    </Button>
                                                                </a>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                {/* ITEM PEDIDO  */}
                                                <Grid item xs={12} sm={6} md={4} style={{display:'flex'}}>
                                                    <Grid style={{display:'flex', flexWrap:'wrap'}} className="item-pedido">
                                                        <Grid item xs={2}>
                                                            <img src="/img/PRODUCTOS/3.png" className="img-item-pedido" />
                                                        </Grid>
                                                        <Grid item xs={12} sm={10} className="grid-info-pedido">
                                                            <Grid item xs={12} className="txt-title-pedido-p">Harina para Hotcakes con proteína, avena y coco</Grid>
                                                            <Grid item xs={12} className="txt-price-pedido">$55.00 MXN</Grid>
                                                            <Grid item xs={12} className="txt-cantidad-pedido"><b>Cantidad: 2</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  2 x $110.00</Grid>
                                                            <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                                                                <a href="#!" style={{textDecoration:'none', marginBottom:'0px'}}>
                                                                    <Button  size="large" className="button-receta" endIcon={<ShoppingCartOutlinedIcon>send</ShoppingCartOutlinedIcon>}>
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
            
        </>
    )
}


MisPedidos.layout = page => <Layout children={page} title="Comepasto - Mis Pedidos" pageTitle="Mis Pedidos" />

export default MisPedidos