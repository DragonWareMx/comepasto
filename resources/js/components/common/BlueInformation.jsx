import React from 'react'
import '/css/cuenta.css';
import { InertiaLink } from '@inertiajs/inertia-react';
import Grid from '@material-ui/core/Grid';
import PlaceIcon from '@material-ui/icons/Place';

export default function BlueInformation() {
    return (
        <Grid container direction="row" flexwrap="wrap" className="grid-blue">
                <Grid className="grid-info"><InertiaLink href="#!" style={{textDecoration:'none',color:'white'}}>José Agustín Aguilar Solórzano</InertiaLink></Grid>
                <Grid className="grid-info"><PlaceIcon style={{marginRight:5,fontSize:18}}></PlaceIcon>Morelia, Colonia Centro, #134</Grid>
        </Grid>
    )
}