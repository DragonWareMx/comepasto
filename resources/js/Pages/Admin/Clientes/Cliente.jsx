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
import { conformsTo } from 'lodash';
import { gridDateFormatter } from '@material-ui/data-grid';

const Cliente = ({cliente}) => {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function dateFormat(date) {
        var date = new Date(date)
        var month = date.getMonth()
        if(month < 10) month = '0'+month
        var day = date.getDate()
        if(day < 10) day= '0'+day
        var year = date.getFullYear()
        return day + "/" + month + "/" + year
    }

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
                                    <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>{cliente.name}</Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item xs={12} className="title-item-info t-i-i-pedidos">CORREO ELECTRÓNICO</Grid>
                                    <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>{cliente.email}</Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item xs={12} className="title-item-info t-i-i-pedidos">TELÉFONO</Grid>
                                    <Grid item xs={12}className="item-info-txt i-i-t-pedidos" style={{padding:'0px'}}>{cliente.tel}</Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item xs={12} className="title-item-info t-i-i-pedidos">DIRECCIÓN</Grid>
                                    <Grid item xs={12}className="item-info-txt i-i-t-pedidos mg-0" style={{padding:'0px',marginBottom:'0px'}}>{cliente.direccion}</Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} className="button-pay" style={{cursor:'initial'}}>Fecha de registro: {cliente.created_at && dateFormat(cliente.created_at)}</Grid>
                        </Grid>
                        
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                    {/* GRID CONFIG STOCK */}
                    <Grid item xs={12}  className="grid-spacing-20">
                        <Grid className="grid-section">
                            <Grid item xs={12} className="section-top-grid" style={{padding:'23px'}}>
                                <Grid>Pedidos realizados</Grid>
                            </Grid>       

                            {/* PEDIDOS */}
                            {cliente.sale && cliente.sale.map((sale, index)=>(
                            <Grid key={index} item xs={12} className="grid-container-pedido">
                                <Accordion expanded={expanded === 'panel'+index} onChange={handleChange('panel'+index)} className="grid-container-pedido">
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    className="grid-gray-info"
                                    >
                                            <Grid item className="grid-child-gray">
                                                <Grid className="header-title">PEDIDO REALIZADO</Grid>
                                                <Grid className="header-info">{sale.created_at && dateFormat(sale.created_at)}</Grid>
                                            </Grid>

                                            <Grid item className="grid-child-gray">
                                                <Grid className="header-title">TOTAL</Grid>
                                                <Grid className="header-info"><b>${sale.total} MXN</b></Grid>
                                            </Grid>

                                            <Grid item className="grid-child-gray">
                                                <Grid className="header-title">TIPO DE ENTREGA</Grid>
                                                <Grid className="header-info">{sale.tipo_entrega}</Grid>
                                            </Grid>

                                            <Grid item className="grid-child-gray">
                                                <Grid className="header-title">TIPO DE PAGO</Grid>
                                                <Grid className="header-info">{sale.formaPago}</Grid>
                                            </Grid>
                                        
                                    </AccordionSummary>
                                    
                                    <AccordionDetails>
                                        <Grid item xs={12} className="grid-white">
                                            <Grid item xs={12} className="status-pedido">{sale.status}</Grid>
                                                <Grid container>
                                                    {/* ITEMS PEDIDOS  */}
                                                    {sale.product && sale.product.map((product, indice)=>(
                                                        <Grid key={indice} item xs={12} sm={6} style={{display:'flex'}}>
                                                            <Grid style={{display:'flex', flexWrap:'wrap'}} className="item-pedido">
                                                                <Grid item xs={2}>
                                                                    <InertiaLink href={"/admin/productos/"+product.id}> <img src={"/img/PRODUCTOS/"+product.foto} className="img-item-pedido" /> </InertiaLink>
                                                                </Grid>
                                                                <Grid item xs={12} sm={10} className="grid-info-pedido">
                                                                    <Grid item xs={12} className="txt-title-pedido-p"><InertiaLink href="#!" style={{textDecoration:'none', color:'#474747'}}>{product.name}</InertiaLink></Grid>
                                                                    <Grid item xs={12} className="txt-price-pedido">${product.pivot.precio} MXN</Grid>
                                                                    <Grid item xs={12} className="txt-cantidad-pedido"><b>Cantidad: {product.pivot.cantidad}</b></Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            <Grid item xs={12} className="info-little-envio">Costos de envío a {sale.direccion} <b>${sale.costoEnvio} MXN</b></Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                            ))}
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