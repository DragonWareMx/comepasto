import React from 'react';
//import '/css/Inicio.css';
import Layout from '../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CarruselBanners from '../components/common/CarruselBanners'

const Inicio = ({banners}) => {
    return (
        <>
            <Container >
                <div style={{height:30,display:'flex',backgroundColor:'red'}}></div>
                <CarruselBanners banners={banners} />
            </Container>
        </>
    )
}


Inicio.layout = page => <Layout children={page} title="Comepasto - Inicio" pageTitle="Inicio" />

export default Inicio