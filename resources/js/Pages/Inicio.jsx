import React from 'react';
//import '/css/Inicio.css';
import Layout from '../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CarruselBanners from '../components/common/CarruselBanners'
import Products from '../components/Products/Products';
import Proceso from '../components/common/Proceso'

const Inicio = ({ banners, products, categories, request }) => {
    return (
        <>
            <Container >
                <div style={{ height: 30, display: 'flex' }}></div>
                <CarruselBanners banners={banners} />
            </Container>

            <Products
                products={products}
                categories={categories}
                request={request}
            />
            <Proceso />
        </>
    )
}


Inicio.layout = page => <Layout children={page} title="Comepasto - Inicio" pageTitle="Inicio" />

export default Inicio