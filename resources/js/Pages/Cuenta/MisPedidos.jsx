import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js';
import { InertiaLink } from '@inertiajs/inertia-react';
import '/css/cuenta.css';

import Layout from '../../layouts/Layout';
import BlueInformation from '../../components/common/BlueInformation';
import Grid from '@material-ui/core/Grid';

import Tooltip from '@material-ui/core/Tooltip';

const MisPedidos = () => {
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
                            <Grid item xs={12} className="grid-gray-info">

                                <Grid item className="grid-child-gray" direction="column" alignItems="center">
                                    <Grid className="header-title">PEDIDO REALIZADO</Grid>
                                    <Grid className="header-info">24 Mayo 2021</Grid>
                                </Grid>

                                <Grid item className="grid-child-gray" direction="column" alignItems="center">
                                    <Grid className="header-title">TOTAL</Grid>
                                    <Grid className="header-info">$7005.58 MXN</Grid>
                                </Grid>

                                <Grid item className="grid-child-gray" direction="column" alignItems="center">
                                    <Grid className="header-title">TIPO DE ENTREGA</Grid>
                                    <Grid className="header-info">Envío a domicilio</Grid>
                                </Grid>

                                <Grid item className="grid-child-gray" direction="column" alignItems="center">
                                    <Grid className="header-title">TIPO DE PAGO</Grid>
                                    <Grid className="header-info">Pago en efectivo</Grid>
                                </Grid>
                            </Grid>
                            
                            <Grid item xs={12} className="grid-white">
                                <Grid xs={12} className="status-pedido">En espera de entrega</Grid>
                                <Grid>Costos de envío a Dirección completa lorem ipsum dolor sit amet consecteur $90.00 MXN</Grid>
                            </Grid>

                        </Grid>


                    </Grid>
                </Grid>
            </Grid>
            
        </>
    )
}


MisPedidos.layout = page => <Layout children={page} title="Comepasto - Mis Pedidos" pageTitle="Mis Pedidos" />

export default MisPedidos