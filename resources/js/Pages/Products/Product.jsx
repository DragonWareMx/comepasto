import React from 'react';
import Layout from '../../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Products from '../../components/Products/Products';
import { Hidden, IconButton, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OwlCarousel from 'react-owl-carousel'; 
import AsyncImage from '../../components/common/AsyncImage';
import Skeleton from 'react-loading-skeleton'; 

import route from 'ziggy-js';

//iconos
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { InertiaLink } from '@inertiajs/inertia-react';

//css
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';

const useStyles = makeStyles((theme) => ({
    name: {
        fontFamily: "Atma",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "30px",
        lineHeight: "49px",

        color: "#1DA3A8",
    },
    paper: {
        border: "1px solid #E3E3E3",
        backgroundColor: "transparent",

        '&:hover':{
            border: "1px solid #1DA3A8",
        }
    },
}));

const Inicio = ({ product }) => {
    const classes = useStyles();

    const responsive = {
        0: {
            items: 1,
        }   
    }

    const skeleton = <div style={{margin: "auto"}}>
        <Skeleton width="100%" 
            height={window.screen.width > 1265 ? "405px" : window.screen.width > 700 ? "30vw" : window.screen.width > 600 ? "45vw" : "92vw"}
            style={{maxHeight: "440px"}}
        />
    </div>

    return (
        <>
            {/* PRODUCTO */}
            <Container>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{paddingTop: "43px"}}
            >
                    {/* imagenes del producto */}
                    <Hidden mdDown>
                        <Grid item style={{width: "30%"}}>
                            <Paper variant="outlined" className={classes.paper}>
                                <OwlCarousel responsive={responsive}   
                                    rewind
                                    dots={false}
                                    autoplay 
                                    autoplayTimeout={10000} 
                                    autoplayHoverPause
                                    margin={8}
                                >  
                                    <div>
                                        <AsyncImage
                                            src={"/storage/products/1.png"}
                                            imageComponent={<img src={"/storage/products/1.png"}/>}
                                            loadingComponent={skeleton}
                                        />
                                    </div>
                                    <div>
                                        <AsyncImage
                                            src={"/storage/products/2.png"}
                                            imageComponent={<img src={"/storage/products/2.png"}/>}
                                            loadingComponent={skeleton}
                                        />
                                    </div>
                                    <div>
                                        <AsyncImage
                                            src={"/storage/products/3.png"}
                                            imageComponent={<img src={"/storage/products/3.png"}/>}
                                            loadingComponent={skeleton}
                                        />
                                    </div>
                                </OwlCarousel> 
                            </Paper>
                        </Grid>
                    </Hidden>
                    {/* informacion del producto */}
                    <Grid item container xs>
                        {/* nombre del producto */}
                        <Grid item 
                            container 
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item className={classes.name}>
                                {product.name}
                            </Grid>

                            <Grid item>
                                <InertiaLink href={route('inicio')}>
                                    <IconButton aria-label="regresar">
                                        <ChevronLeftIcon />
                                    </IconButton>
                                </InertiaLink>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}


Inicio.layout = page => <Layout children={page} title="Comepasto - Producto" pageTitle="Producto" />

export default Inicio