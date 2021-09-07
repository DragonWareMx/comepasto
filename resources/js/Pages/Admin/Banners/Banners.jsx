// import React, { useEffect, useState } from 'react';
import * as React from 'react';
import { Inertia } from '@inertiajs/inertia'
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import route from 'ziggy-js';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../layouts/LayoutAdmin';
import '/css/admin.css';
import '/css/adminBanners.css';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import PublishIcon from '@material-ui/icons/Publish';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
    //   padding: theme.spacing(2),
      textAlign: 'center',
      border:'none !important',
      boxShadow:'none !important',
    //   backgroundColor:'black',
      height: '240px',
    },
  }));

function deleteImg(){
    document.getElementById("example-img").remove();
}

const Banners = () => {
    const classes = useStyles();

    return ( 
        <>
        <Container> 
            <Grid container style={{paddingTop:'34px'}}>
                {/* TOP PAGE, TITTLE AND ADD BUTTON */}
                <Grid item xs={12} className="top-admin">
                    <Grid className="title-page">BANNERS</Grid>
                </Grid> 

                {/* CONTENIDO GENERAL */}
                <Grid item xs={12} style={{marginBottom:'25px', borderRadius:'4px', border:'1px solid #E1E3EA',padding:'20px'}}>
                   
                    
                    <Grid container spacing={3} alignItems="stretch">
                        <Grid item xs={6} sm={3}>
                            <Paper className={classes.paper} style={{backgroundColor:'transparent'}}>
                                 <input
                                    accept="image/*"
                                    id="contained-button-file"
                                    type="file"
                                    style={{display:'none'}}
                                />
                                <label htmlFor="contained-button-file" style={{marginTop:'20px'}}>
                                    <Button variant="contained" className="button-add button-banner" startIcon={<PublishIcon />} component="span">
                                    AGREGAR BANNER
                                    </Button>
                                </label>
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={3} id="example-img">
                            <Paper className={classes.paper}>
                                <IconButton 
                                    aria-label="delete" 
                                    onClick={deleteImg}
                                    style={{position:'absolute',zIndex:'999',color:'white'}}>
                                    <DeleteIcon />
                                </IconButton>
                                <img src="/img/carrousel/1.png" className="banner" />
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper className={classes.paper}>
                                <IconButton 
                                    aria-label="delete" 
                                    style={{position:'absolute',zIndex:'999',color:'white'}}>
                                    <DeleteIcon />
                                </IconButton>
                                <img src="/img/carrousel/fondo6.jpg" className="banner" />
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper className={classes.paper}>
                                <IconButton 
                                    aria-label="delete" 
                                    style={{position:'absolute',zIndex:'999',color:'white'}}>
                                    <DeleteIcon />
                                </IconButton>
                                <img src="/img/carrousel/12.png" className="banner" />
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper className={classes.paper}>
                                <IconButton 
                                    aria-label="delete" 
                                    style={{position:'absolute',zIndex:'999',color:'white'}}>
                                    <DeleteIcon />
                                </IconButton>
                                <img src="/img/carrousel/8.png" className="banner" />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                
            </Grid>
        </Container>
        
    </>
    )
}


Banners.layout = page => <Layout children={page} title="Comepasto - Banners" pageTitle="Banners" />

export default Banners