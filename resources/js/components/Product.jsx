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
    discount:{
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "12px",
        lineHeight: "15px",
        textDecorationLine: "line-through",

        color: "#ABABAB",
        height: "14.4px"
    },
    brand:{
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "300",
        fontSize: "14px",
        lineHeight: "18px",

        color: "#595959",
        marginTop: "6px",
        height: "35px"
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
    },
    inertiaButton: {
        width: "fit-content",
        height: "fit-content",
        backgroundColor: "transparent",
        marginTop: "12px",
        marginBottom: "20px",
        padding: "0px",
        border: "none"
    }
}));

export default function Product({img, name, price, discount, brand, logo, id}){
    const classes = useStyles();

    function limitString(string, length){
        return string.length > length ? 
                    string.substring(0, length - 3) + "..." : 
                    string; 
    }

    function showPrice(precio, descuento){
        if(descuento){
            var fPrecio = parseFloat(precio);
            var fDescuento = parseFloat(descuento)

            var nPrecio = fPrecio - (fPrecio * (fDescuento/100))

            if(nPrecio < 0)
                nPrecio = 0

            return nPrecio.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
        }
        else{
            return parseFloat(precio).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
        }
    }

    return (
        <>
            <Grid item  xs={12} sm={6} md={4} lg={3}>
                <Paper variant="outlined" className={classes.paper}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        {/* IMAGEN */}
                        <Grid item>
                            {/* LINK DEL PRODUCTO */}
                            <InertiaLink href="#">
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
                            </InertiaLink>
                        </Grid>

                        {/* NOMBRE */}
                        <Grid item className={classes.name}>
                            {/* LINK DEL PRODUCTO */}
                            <InertiaLink href="#" style={{textDecoration: "none", color:"#474747"}}>
                                {limitString(name, 46)}
                            </InertiaLink>
                        </Grid>

                        <Grid item container direction="row" justify="center" style={{width:"220px"}}>
                            {/* PRECIO Y MARCA */}
                            <Grid item xs={6} container direction="column">
                                <Grid item className={classes.price}>
                                    $ {showPrice(price, discount)} MXN
                                </Grid>
                                <Grid item className={classes.discount}>
                                    {discount > 0 &&
                                    "$ " + showPrice(price, null) + " MXN"
                                    }
                                </Grid>
                                <Grid item className={classes.brand}>
                                    Marca: {limitString(brand, 27)}
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
                            <InertiaLink href={route('cart.store', id)} method="post" as="button" style={{textDecoration: "none"}} className={classes.inertiaButton}>
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