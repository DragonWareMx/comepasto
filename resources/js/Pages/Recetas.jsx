import React from 'react';
import '/css/QuienesSomos.css';
import '/css/recetas.css';
import Layout from '../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import LockIcon from '@material-ui/icons/Lock';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

const Recetas = () => {
    return (
        <>
            <div className="Atma background-cover-img">
                <div className="recetas_content" style={{"paddingBottom":"0px !important"}}> 
                    <Container> 
                        <Grid container direction="row" justify="flex-start">
                            <Grid container direction="row" justify="flex-start" item xs={8} spacing={2}>
                                <Grid item xs={12} className="quienes_title padding-remove height-max">RECETAS</Grid>
                                <Grid item xs={12} className="quienes_info padding-remove">
                                    Prepara los mejores platillos con nuestros productos 100% veganos y disfruta la experiencia de comer saludable y delicioso con comepasto
                                </Grid>
                            </Grid>
                            <Grid container item xs={4} direction="row" justify="flex-end">
                                <img className="img_recetas" src="/img/ilustraciones/Cooking-cuate.png" alt="Illustration by Freepik Storyset" />
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
        </>
    )
}


Recetas.layout = page => <Layout children={page} title="Comepasto - Recetas" pageTitle="Recetas" />

export default Recetas