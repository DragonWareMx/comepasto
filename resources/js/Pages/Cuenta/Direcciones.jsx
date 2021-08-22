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

                        <Grid container alignItems="stretch" className="grid-primer-dir">
                            {/* AQUI VA LA PRIMER DIRECCION, LA PREDETERMINADA */}
                            <Grid item xs={12} sm={8} md={6} style={{marginTop:26}} id="info-grid">
                                <Grid item xs={12} className="grid-gray-name">1. CASA DE LOS ABUELOS - PREDETERMINADA</Grid>
                                <Grid item xs={12} className="grid-white-info">
                                    <Grid item xs={12} className="title-info-data">DIRECCIÓN</Grid>
                                    <Grid item xs={12} className="info-data">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</Grid>
                                    <Grid item xs={12} className="title-info-data">REFERENCIAS</Grid>
                                    <Grid item xs={12} className="info-data">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Grid>
                                    <InertiaLink href={route('direcciones.editar',1)} className="link-edit-info" >Editar dirección</InertiaLink>
                                </Grid>
                            </Grid>                            

                        
                            <Grid item xs={12} sm={3} md={2} style={{marginTop:26}} className="grid-white-info grid-add">
                                <InertiaLink href={route('direcciones.agregar')} style={{width:'100%', height:'100%'}} className="link-add">
                                    <AddCircleOutlineIcon /> &nbsp;
                                    AGREGAR DIRECCIÓN
                                </InertiaLink>
                            </Grid>
                        </Grid>

                        {/* AQUI VAN EL RESTO DE LAS DIRECCIONES */}
                        <Grid item xs={12}>
                            <Grid item xs={12} sm={8} md={6} style={{marginTop:26}} id="info-grid">
                                <Grid item xs={12} className="grid-gray-name">2. CASA DE MAMÁ PANCHA</Grid>
                                <Grid item xs={12} className="grid-white-info">
                                    <Grid item xs={12} className="title-info-data">DIRECCIÓN</Grid>
                                    <Grid item xs={12} className="info-data">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</Grid>
                                    <Grid item xs={12} className="title-info-data">REFERENCIAS</Grid>
                                    <Grid item xs={12} className="info-data">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Grid>
                                    <InertiaLink className="link-edit-info" href={route('direcciones.editar',1)} >Editar dirección</InertiaLink>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid item xs={12} sm={8} md={6} style={{marginTop:26}} id="info-grid">
                                <Grid item xs={12} className="grid-gray-name">3. CASA DEL INGENIERO</Grid>
                                <Grid item xs={12} className="grid-white-info">
                                    <Grid item xs={12} className="title-info-data">DIRECCIÓN</Grid>
                                    <Grid item xs={12} className="info-data">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</Grid>
                                    <Grid item xs={12} className="title-info-data">REFERENCIAS</Grid>
                                    <Grid item xs={12} className="info-data">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Grid>
                                    <InertiaLink className="link-edit-info" href={route('direcciones.editar',1)}>Editar dirección</InertiaLink>
                                </Grid>
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