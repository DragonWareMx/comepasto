import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js';
import { InertiaLink } from '@inertiajs/inertia-react';
import '/css/cuenta.css';

import Layout from '../../layouts/Layout';
import BlueInformation from '../../components/common/BlueInformation';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function editInfo(){
    document.getElementById('info-grid').style.display="none";
    document.getElementById('edit-grid').style.display="block";
}
function cancelar(){
    document.getElementById('info-grid').style.display="block";
    document.getElementById('edit-grid').style.display="none";
    document.getElementById('pass-grid').style.display="none";
}
function changePass(){
    if(document.getElementById('pass-grid').style.display=="flex"){
        document.getElementById('pass-grid').style.display="none";
    }else{
        document.getElementById('pass-grid').style.display="flex";
    }
    
}



const Informacion = () => {
    return ( 
        <>
            <BlueInformation></BlueInformation>

            <Grid container direction="row" flexwrap="wrap">
                <Grid item xs={12} style={{padding:'25px',display:'flex',alignItems:'baseline',flexWrap:'wrap'}}>
                    <Grid item xs={12} className="title-section">
                        <InertiaLink href={route('cuenta')} style={{color:'#1DA3A8', textDecoration:'none'}}>CUENTA</InertiaLink>&nbsp;
                        <Grid style={{fontWeight:300}}>INFORMACIÓN</Grid>
                    </Grid>
                
                    <Grid container direction="row" justify="space-between" style={{marginTop:20}}>
                        <Grid item xs={12} className="info-txt-datos info-little-envio" >Consulta información acerca del uso de tus datos personales en nuestro&nbsp;  
                            <a href="#!" target="_blank">Aviso de privacidad</a> y <a href="#!" target="_blank">Términos y Condiciones</a> de Comepasto.
                        </Grid>

                        <Grid item xs={12} sm={6} style={{marginTop:26}} id="info-grid">
                            <Grid item xs={12} className="grid-gray-name">JOSÉ AGUSTÍN AGUILAR SOLÓRZANO</Grid>
                            <Grid item xs={12} className="grid-white-info">
                                <Grid item xs={12} className="title-info-data">CORREO ELECTRÓNICO</Grid>
                                <Grid item xs={12} className="info-data">correo@ejemplo.com</Grid>
                                <Grid item xs={12} className="title-info-data">TELÉFONO</Grid>
                                <Grid item xs={12} className="info-data">4432209378</Grid>
                                <a className="link-edit-info" onClick={editInfo}>Editar información</a>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={9} md={6} style={{marginTop:26,display:'none'}} id="edit-grid">
                            <Grid item xs={12} className="grid-gray-name">JOSÉ AGUSTÍN AGUILAR SOLÓRZANO</Grid>
                            <Grid item xs={12} className="grid-white-info">
                                <form noValidate autoComplete="off">
                                    <Grid item xs={12}>
                                        <TextField 
                                                id="correo" 
                                                required
                                                label="Correo electrónico" 
                                                className="input-edit-info" 
                                                type="email" />
                                    </Grid>

                                    <a className="link-edit-info" onClick={changePass}>Cambiar contraseña</a>

                                    <Grid item xs={12} style={{display:'none', flexWrap:'wrap'}} id="pass-grid">
                                        <Grid item xs={12} sm={6}>
                                            <TextField 
                                                    id="pass" 
                                                    required
                                                    label="Contraseña" 
                                                    className="input-edit-info input-50" 
                                                    type="password" />
                                        </Grid>
                                        <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'flex-end'}}>
                                            <TextField 
                                                id="passC" 
                                                required
                                                label="Confirmar contraseña" 
                                                className="input-edit-info input-50" 
                                                type="password" />
                                        </Grid>
                                    </Grid>

                                    <Grid style={{display:'flex', justifyContent:'flex-end', flexWrap:'wrap', alignItems:'center',marginTop:30}}>
                                        <Button className="button-cancel" onClick={cancelar}>CANCELAR</Button>
                                        <Button type="submit" variant="contained" className="button-ok">GUARDAR</Button>
                                    </Grid>

                                    <a className="link-edit-info" style={{color:'#DD5656'}}>Eliminar cuenta</a>
                                </form>                                
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
            
        </>
    )
}


Informacion.layout = page => <Layout children={page} title="Comepasto - Información" pageTitle="Información" />

export default Informacion