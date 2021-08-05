import React from 'react';
//import '/css/Inicio.css';
import Layout from '../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CarruselBanners from '../components/common/CarruselBanners';
import Products from '../components/Products/Products';
import Proceso from '../components/common/Proceso';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import '/css/Inicio.css';

const Inicio = ({ banners, products, categories, request }) => {
    return (
        <>
            <div className="Atma inicio_portada">
                <div className={"inicio_content"}>
                    <Container className='inicio_title'>
                        <Grid className='inicio_sizeTitulo' style={{color:'#FFDE59',fontFamily:'Fredoka One',textAlign:'center'}}>Comepasto</Grid>
                        <Grid style={{color:'#FFFFFF',fontSize:25,fontFamily:'Atma',textAlign:'center',marginTop:5}}>Prepara tu comida favorita con productos veganos</Grid>
                        <a href='#tienda' className='inicio_button'>Tienda <ArrowRightAltIcon style={{marginLeft:13,fontSize:35}}></ArrowRightAltIcon></a>
                    </Container> 
                    {/* <Container> 
                        <img src='/img/ilustraciones/inicio.svg' className='inicio_svg'/>
                    </Container> */}
                </div>
            </div>
            <Container id="tienda">
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