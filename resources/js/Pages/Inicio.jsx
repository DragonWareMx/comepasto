import React from 'react';
import '/css/Inicio.css';
import Layout from '../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const Inicio = () => {
    return (
        <>
            <Container >

            </Container>
        </>
    )
}


Inicio.layout = page => <Layout children={page} title="Comepasto - Inicio" pageTitle="Inicio" />

export default Inicio