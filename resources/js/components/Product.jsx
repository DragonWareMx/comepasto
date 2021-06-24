import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react'
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import route from 'ziggy-js';
import { makeStyles } from '@material-ui/core/styles';

//iconos
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

const useStyles = makeStyles((theme) => ({
    image:{
        width: "159px",
        height: "173px"
    },
    name:{
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "15px",
        lineHeight: "19px",

        color: "#474747",
        width: "220px",
        height: "38px",
    },
    price:{
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "18px",

        color: "#1DA3A8",
        marginTop: "6px"
    },
    brand:{
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "300",
        fontSize: "14px",
        lineHeight: "18px",

        color: "#595959",
        marginTop: "6px"
    },
    logo:{
        width: "89px",
        height: "62px"
    },
    button: {
        background: 'transparent',
        color: '#9F9F9F',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '13px',
        lineHeight: '21px',

        width: '220px',
        height: '38px',

        marginTop: "12px",
        marginBottom: "20px",
        border: "1px solid #E3E3E3",

        '&:hover': {
            background: '#1DA3A8',
            color: '#FFFFFF',
        },
    },
    paper:{
        border: "1px solid #E3E3E3",
        backgroundColor: "transparent",
        '&:hover':{
            border: "1px solid #1DA3A8",
        }
    }
}));

export default function Product({img, name, price, discount, brand, logo, id}){
    const classes = useStyles();

    function limitString(string, length){
        return string.length > length ? 
                    string.substring(0, length - 3) + "..." : 
                    string; 
    }

    function showPrice(precio){
        return parseFloat(precio).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
    }

    return (
        <>
            {/* <Grid item  xs={12} sm={6} md={4} lg={3}>
                <div style={{width: "fit-content", margin: "auto"}}>
                    {/* IMAGEN *
                    <Grid item>
                        <div className="producto_imagen" style={{
                                backgroundImage: img ? 'url("/img/productos/'+ img +'")' : 'url("storage/productos/default.jpg")',
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center center",
                                backgroundSize: "100%"
                            }}
                        >
                        </div>
                    </Grid>

                    {/* NOMBRE *
                    <Grid item className="producto_nombre">
                        {limitString(name, 60)}
                    </Grid>

                    {/* PRECIO 
                    <Grid item className="producto_precio">
                        {price ?
                        "Desde $"+ showPrice(price) +" MXN"
                        :
                        "Próximamente"
                        }
                    </Grid>
                        
                    {/* BOTON *
                    <Grid item>
                        <InertiaLink href={"/quienessomos"} style={{textDecoration: "none"}}>
                            <ColorButton
                                variant="outlined"
                                className="mt-4"
                                disableElevation
                            >
                                MÁS INFORMACIÓN
                            </ColorButton>
                        </InertiaLink>
                    </Grid>:
                    <>
                    </>
                </div>
            </Grid> */}
            <Grid item  xs={12} sm={6} md={4} lg={3}>
                <Paper variant="outlined" className={classes.paper}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        {/* IMAGEN */}
                        <Grid item>
                            <div className={classes.image} style={{
                                    backgroundImage: img ? 'url("/storage/products/'+ img +'")' : 'url("/storage/products/default.jpg")',
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center center",
                                    backgroundSize: "100%",
                                    marginTop: "25px",
                                    marginBottom: "12px"
                                }}
                            >
                            </div>
                        </Grid>

                        {/* NOMBRE */}
                        <Grid item className={classes.name}>
                            {limitString(name, 60)}
                        </Grid>

                        <Grid item container direction="row" justify="center" style={{width:"220px"}}>
                            {/* PRECIO Y MARCA */}
                            <Grid item xs={6} container direction="column">
                                <Grid item className={classes.price}>
                                    $ {showPrice(price)} MXN
                                </Grid>
                                <Grid item className={classes.brand}>
                                    Marca: {brand}
                                </Grid>
                            </Grid>

                            {/* LOGO MARCA */}
                            <Grid item xs={6}>
                            <div className={classes.logo} style={{
                                    backgroundImage: logo ? 'url("/storage/logos/'+ logo +'")' : 'url("/storage/logos/default.jpg")',
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center center",
                                    backgroundSize: "100%"
                                }}
                            >
                            </div>
                            </Grid>
                        </Grid>

                        <Grid item container justify="center" style={{width:"220px"}}> 
                            <InertiaLink href="/ejemplo" style={{textDecoration: "none"}} className={classes.buttonGrid}>
                                <Button variant="contained" color="primary" disableElevation className={classes.button}>
                                    AGREGAR AL CARRITO
                                    <ShoppingCartOutlinedIcon fontSize="small" style={{marginLeft: "6px"}} />
                                </Button>
                            </InertiaLink>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </>
    );
}