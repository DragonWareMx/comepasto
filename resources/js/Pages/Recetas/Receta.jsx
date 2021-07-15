import React from 'react';
import '/css/QuienesSomos.css';
import '/css/recetas.css';
import Layout from '../../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import YouTubeIcon from '@material-ui/icons/YouTube';

const Recetas = () => {
    const links = document.querySelectorAll(".a-despla a");
    // alert(links);
 
    for (const link of links) {
    link.addEventListener("click", clickHandler);
    }
    
    function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;
    
    scroll({
        top: offsetTop,
        behavior: "smooth"
    });
    }
    return (
        <>
            <Grid container direction="row" flexwrap="wrap">
                <Grid item xs={12} sm={6} style={{padding:'25px'}} className="gridA">
                    {/* Titulo de la receta */}
                    <Grid container direction="row" alignItems="center" justify="space-between" className="sub-div-receta">
                        <Grid item xs={11}>BURRITOS VEGANOS Y DELICIOSOS</Grid>
                        <Grid item xs={1} className="navigate-back"><a href="#!"><NavigateBeforeIcon style={{fontSize:'30px'}}></NavigateBeforeIcon></a></Grid>
                    </Grid>
                    {/* Pequeña descripcion de la receta Limite de caracteres para esto */}
                    <Grid item xs={12} className="descrip-receta" style={{marginTop:'35px'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. 
                    Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Grid>
                    <a href="#ingredientes_preparacion" className="a-despla">INGREDIENTES Y PREPARACIÓN <ArrowForwardIcon></ArrowForwardIcon></a>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <img src="/img/imgs/img2.jpg" style={{width:'100%', height:'100%', objectFit:'cover', maxHeight:'600px'}}></img>
                </Grid>

                {/* Productos de la receta */}
                <Grid item xs={12} style={{padding:'25px'}}>
                    <Grid item xs={12} className="title-receta">PRODUCTOS</Grid>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={0} style={{display:'flex',flexWrap:'wrap'}}>
                        <Grid  className="grid-img-producto"><a href="#!"><Tooltip title="Nombre completo del producto"><img src="/img/PRODUCTOS/1.png"></img></Tooltip></a></Grid>
                        <Grid  className="grid-img-producto"><a href="#!"><Tooltip title="Nombre completo del producto"><img src="/img/PRODUCTOS/2.png"></img></Tooltip></a></Grid>
                        <Grid  className="grid-img-producto"><a href="#!"><Tooltip title="Nombre completo del producto"><img src="/img/PRODUCTOS/3.png"></img></Tooltip></a></Grid>
                        <Grid  className="grid-img-producto"><a href="#!"><Tooltip title="Nombre completo del producto"><img src="/img/PRODUCTOS/4.png"></img></Tooltip></a></Grid>
                        <Grid  className="grid-img-producto"><a href="#!"><Tooltip title="Nombre completo del producto"><img src="/img/PRODUCTOS/5.png"></img></Tooltip></a></Grid>
                        <Grid  className="grid-img-producto"><a href="#!"><Tooltip title="Nombre completo del producto"><img src="/img/PRODUCTOS/6.png"></img></Tooltip></a></Grid>
                        <a href="#!" style={{textDecoration:'none', margin:'25px', marginBottom:'0px'}}>
                            <Button  size="large" className="button-receta" endIcon={<ShoppingCartOutlinedIcon>send</ShoppingCartOutlinedIcon>}>
                                AGREGAR AL CARRITO
                            </Button>
                        </a>
                    </Grid>
                </Grid>
                <Grid id="ingredientes_preparacion"></Grid>
                {/* Contenido de la receta */}
                <Grid item xs={12} style={{padding:'25px',display:'flex',alignItems:'baseline',flexWrap:'wrap'}}>
                    <Grid item xs={12} md={4} className="title-receta grid-ingredientes">
                        INGREDIENTES
                        <List component="nav" aria-label="secondary mailbox folders" style={{"padding":"0px"}}>
                            <ol  style={{"margin":"0px 0px 0px 0px", "padding":"0px 0px 0px 25px"}}>
                                <li>
                                    <ListItem>
                                        <ListItemText primary="1/2 cup vegan sour cream" />
                                    </ListItem>
                                </li>
                                <li>
                                    <ListItem >
                                        <ListItemText primary="Ajos machacados en el monte Souuri de China, sin tierra" />
                                    </ListItem>
                                </li>
                                <li>
                                    <ListItem>
                                        <ListItemText primary="1/2 cup vegan sour cream" />
                                    </ListItem>
                                </li>
                                <li>
                                    <ListItem >
                                        <ListItemText primary="Ajos machacados en el monte Souuri de China, sin tierra" />
                                    </ListItem>
                                </li>
                                
                            </ol>
                                
                            </List>
                            <Divider />
                            <List component="nav" aria-label="main mailbox folders" >
                                <a href="#!" style={{"textDecoration":"none"}}>
                                <ListItem button >
                                    <ListItemIcon>
                                        <YouTubeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Link video" />
                                </ListItem>
                                </a>
                            </List>
                    </Grid>
                    
                    <Grid item xs={12} md={8} className="title-receta grid-ingredientes" style={{"backgroundColor":"transparent"}}>
                        PREPARACIÓN
                        <List component="nav" aria-label="secondary mailbox folders" style={{"padding":"0px"}}>
                            <ol  style={{"margin":"0px 0px 0px 0px", "padding":"0px 0px 0px 25px"}}>
                                <li>
                                    <ListItem>
                                        <ListItemText primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
                                    </ListItem>
                                </li>
                                <li>
                                    <ListItem >
                                        <ListItemText primary="Ajos machacados en el monte Souuri de China, sin tierra" />
                                    </ListItem>
                                </li>
                                <li>
                                    <ListItem>
                                        <ListItemText primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mo" />
                                    </ListItem>
                                </li>
                                <li>
                                    <ListItem >
                                        <ListItemText primary="Ajos machacados en el monte Souuri de China, sin tierra" />
                                    </ListItem>
                                </li>
                                <li>
                                    <ListItem>
                                        <ListItemText primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mo" />
                                    </ListItem>
                                </li>
                                
                            </ol>
                                
                            </List>
                    </Grid>

                </Grid>
            </Grid>
        </>
    )
}


Recetas.layout = page => <Layout children={page} title="Comepasto - Recetas" pageTitle="Recetas" />

export default Recetas