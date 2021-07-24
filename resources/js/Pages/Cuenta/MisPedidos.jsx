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
                
                    <Grid container direction="row" justify="space-between" style={{marginTop:20}}>
                        PEDIDOS
                    </Grid>
                </Grid>
            </Grid>
            
        </>
    )
}


MisPedidos.layout = page => <Layout children={page} title="Comepasto - Mis Pedidos" pageTitle="Mis Pedidos" />

export default MisPedidos