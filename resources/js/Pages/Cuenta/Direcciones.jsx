import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js';
import { InertiaLink } from '@inertiajs/inertia-react';
import '/css/cuenta.css';

import Layout from '../../layouts/Layout';
import BlueInformation from '../../components/common/BlueInformation';
import Grid from '@material-ui/core/Grid';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import Tooltip from '@material-ui/core/Tooltip';

const Direcciones = () => {
    return ( 
        <>
            <BlueInformation></BlueInformation>

            <Grid container direction="row" flexwrap="wrap">
                <Grid item xs={12} style={{padding:'25px',display:'flex',alignItems:'baseline',flexWrap:'wrap'}}>
                    <Grid item xs={12} className="title-section">
                        <InertiaLink href={route('cuenta')} style={{color:'#1DA3A8', textDecoration:'none'}}>CUENTA</InertiaLink>&nbsp;<Grid style={{fontWeight:300}}>DIRECCIONES</Grid>
                    </Grid>
                
                    <Grid container direction="row" justify="space-between" style={{marginTop:20}}>
                        <Grid item xs={12} className="info-txt-datos info-little-envio" >Consulta información acerca del uso de tus datos personales en nuestro&nbsp;  
                            <a href="#!" target="_blank">Aviso de privacidad</a> y <a href="#!" target="_blank">Términos y Condiciones</a> de Comepasto.
                        </Grid>

                        <Grid container alignItems="stretch">
                            <Grid item xs={12} sm={8} md={6} style={{marginTop:26}} id="info-grid">
                                <Grid item xs={12} className="grid-gray-name">DIRECCIÓN 1. PREDETERMINADA</Grid>
                                <Grid item xs={12} className="grid-white-info">
                                    <Grid item xs={12} className="title-info-data">DIRECCIÓN</Grid>
                                    <Grid item xs={12} className="info-data">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</Grid>
                                    <Grid item xs={12} className="title-info-data">REFERENCIAS</Grid>
                                    <Grid item xs={12} className="info-data">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Grid>
                                    <a className="link-edit-info" >Editar dirección</a>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={3} md={2} style={{marginTop:26}} className="grid-white-info grid-add">
                                <AddCircleOutlineIcon />
                                AGREGAR DIRECCIÓN
                                {/* <Grid item xs={12} style={{textAlign:'center'}}>AGREGAR DIRECCIÓN</Grid> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            
        </>
    )
}


Direcciones.layout = page => <Layout children={page} title="Comepasto - Direcciones" pageTitle="Direcciones" />

export default Direcciones