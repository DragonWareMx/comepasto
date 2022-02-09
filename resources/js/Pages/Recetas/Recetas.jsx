import React, { useEffect, useState } from 'react';
import '/css/QuienesSomos.css';
import '/css/recetas.css';
import Layout from '../../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Receta from '../../components/Recetas/Receta';
import { CircularProgress } from '@material-ui/core';
import Paginacion from '../../components/common/paginacion';

import AsyncImage from '../../components/common/AsyncImage';

const Recetas = ({recetas}) => {
    return (
        <>
            {/* PORTADA */}
            <div className="Atma background-cover-img">
                <div className="recetas_content" style={{"paddingBottom":"0px !important"}}> 
                    <Container> 
                        <Grid container direction="row" justify="flex-start" flexwrap="wrap">
                            <Grid container direction="row" justify="flex-start" item xs={12} sm={8} spacing={1}>
                                <Grid item xs={12} className="quienes_title padding-remove height-max">RECETAS</Grid>
                                <Grid item xs={12} className="quienes_info padding-remove recetas-portada-txt">
                                    Prepara los mejores platillos con nuestros productos 100% veganos y disfruta la experiencia de comer saludable y delicioso con comepasto
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} sm={4} direction="row" justify="flex-end" color="primary">
                                <a href="https://storyset.com/people" target="_blank">
                                <AsyncImage 
                                    src={"/img/ilustraciones/Cooking-cuate.png"}
                                    imageComponent={<img className="img_recetas" src="/img/ilustraciones/Cooking-cuate.png" alt="People illustrations by Storyset" />}
                                    loadingComponent={<CircularProgress style={{width: 100, height: 100, color: "#1DA3A8", display:'flex', margin:'auto'}} />}
                                />
                                    {/* <img className="img_recetas" src="/img/ilustraciones/Cooking-cuate.png" alt="People illustrations by Storyset" /> */}
                                    </a>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
            {/* CONTAINER DE RECETAs */}
            <Container>
                <Grid container direction="row" justify="flex-start" alignItems="stretch" style={{marginTop:30, marginBottom:50}} spacing={3}>
                    
                    {recetas && recetas.map(receta=>(
                        <Grid item xs={12} sm={4} id={receta.id} key={receta.id + "receta"}>
                            <Receta 
                                img={ receta.url}
                                nombre={receta.nombre}
                                id={receta.recipe_id}
                                descripcion={receta.descripcion}
                            />
                        </Grid>
                    ))}       
                </Grid>
            </Container>

            {/* <Grid item xs={12} container direction="row" spacing={3}>
                <Paginacion links={recetas.links}/> 
            </Grid> */}
        </>
    )
}


Recetas.layout = page => <Layout children={page} title="Comepasto - Recetas" pageTitle="Recetas" />

export default Recetas