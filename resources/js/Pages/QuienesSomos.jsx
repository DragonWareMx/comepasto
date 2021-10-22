import React from 'react';
import '/css/QuienesSomos.css';
import Layout from '../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import LockIcon from '@material-ui/icons/Lock';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Tooltip from '@material-ui/core/Tooltip';

const QuienesSomos = ({brands}) => {
    return (
        <>
            <div className="Atma quienes_somos">
                <div className={"quienes_somos_content"}> 
                    <Container> 
                        <Grid container direction="row" justify="flex-start">
                            <Grid container direction="row" justify="flex-start" className="quienes_left">
                                <Grid item className="quienes_title ">¿Quiénes somos?</Grid>
                                <Grid item className="quienes_title2">DISTRIBUIDOR VEGANO</Grid>
                                <Grid item xs={12} className="quienes_subtitle">Distribuidor vegano de Morelia, Michoacán, México</Grid>
                                <Grid item xs={12} className="quienes_info">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure
                                </Grid>
                            </Grid>
                            <Grid container justify="center" alignItems="center" className="quienes_right">
                               <a href="https://storyset.com/online" target="_blank"><img className="quienes_img" src="/img/ilustraciones/quienes.svg" alt="Online illustrations by Storyset" /></a>
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="space-between" style={{marginTop:20}}>
                            <Grid item className="quienes_card">
                                    <Grid container item justify="center" alignItems="center" xs={4}>
                                        <Grid className="quienes_card_circle"><LocalShippingOutlinedIcon style={{fontSize:40}} className="quienes_card_icon"></LocalShippingOutlinedIcon></Grid>
                                    </Grid>
                                    <Grid item xs={8} style={{paddingRight:17,paddingBottom:10}}>
                                        <Grid className="quienes_card_title">Envíos rápidos</Grid>
                                        <Grid className="quienes_card_text">Texto breve sobre los envíos rápidos y seguros, lorem ipsum dolor sit amet</Grid>
                                    </Grid>
                            </Grid>
                            <div className="quienes_cards_spaces">{/*esto funciona como un espacio*/}</div>
                            <Grid item className="quienes_card">
                                    <Grid container item justify="center" alignItems="center" xs={4}>
                                        <Grid className="quienes_card_circle"><LockIcon style={{fontSize:40}} className="quienes_card_icon"></LockIcon></Grid>
                                    </Grid>
                                    <Grid item xs={8} style={{paddingRight:17,paddingBottom:10}}>
                                        <Grid className="quienes_card_title">Tus compras seguras</Grid>
                                        <Grid className="quienes_card_text">Texto breve sobre las compras seguras, lorem ipsum dolor sit amet</Grid>
                                    </Grid>
                            </Grid>
                            <div className="quienes_cards_spaces">{/*esto funciona como un espacio*/}</div>
                            <Grid item className="quienes_card">
                                    <Grid container item justify="center" alignItems="center" xs={4}>
                                        <Grid className="quienes_card_circle"><LocalOfferIcon style={{fontSize:40}} className="quienes_card_icon"></LocalOfferIcon></Grid>
                                    </Grid>
                                    <Grid item xs={8} style={{paddingRight:17,paddingBottom:10}}>
                                        <Grid className="quienes_card_title">Los mejores precios</Grid>
                                        <Grid className="quienes_card_text">Texto breve sobre los mejores precios, lorem ipsum dolor sit amet</Grid>
                                    </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
            <Container>
                <Grid container direction="row" justify="center" style={{marginTop:50,marginBottom:50}}>
                    <Grid item xs={12} className="quienes_marcas_title">MARCAS CON LAS QUE TRABAJAMOS</Grid>
                    <Grid item xs={12} className="quienes_marcas_text">Texto si estás interesado en trabajar o unirte con nuestros productos <a href="#" className="quienes_contactanos">Contáctanos</a>, lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet. </Grid>
                    <Grid container direction="row" justify="space-around" style={{marginTop:25}}>
                        {brands && brands.map((brand,index)=>(
                            <Tooltip title={brand.name} key={index}>
                                <Grid container item xs={4} sm={2} alignItems="center" className="quienes_marca_paps">
                                    <img className="quienes_marca" src={"storage/logos/"+brand.logo} alt=""/>
                                </Grid>
                            </Tooltip>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}


QuienesSomos.layout = page => <Layout children={page} title="Comepasto - ¿Quiénes somos?" pageTitle="¿Quiénes Somos?" />

export default QuienesSomos