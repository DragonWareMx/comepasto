import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react'
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { OutlinedInput, InputAdornment, IconButton } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import route from 'ziggy-js';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AsyncImage from '../common/AsyncImage';
import Skeleton from 'react-loading-skeleton';

//iconos
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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
    },
    iconoFree:{
        width: "35px !important",
        height: "35px",
        filter: "invert(46%) sepia(20%) saturate(2938%) hue-rotate(142deg) brightness(104%) contrast(77%)",
    },
    inputSinFlechasProduct: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },
        "& input:focus": {
            outline: "none"
        },
        "& input":{
            width: "auto",
            textAlign: "center"
        },
        '& fieldset': {
            border: "1px solid #E3E3E3",
        },
        
        width: '220px',
        height: '38px',
        
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: "12px",
        marginBottom: "20px",
        
        fontFamily: 'Oxygen',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '18px',
        color: "#595959",
    },

    inertiaButtonPlusRemove: {
        width: "fit-content",
        height: "fit-content",
        backgroundColor: "transparent",
        padding: "0px",
        border: "none"
    },
    productoNoDispoible: {
        marginTop: "12px",
        marginBottom: "20px",
        width: '220px',
        height: '38px',
    }
}));

export default function Product({img, name, price, discount, brand, logo, link, id, uuid, glutenFree, soyaFree, cantidad, carrusel, stock}){
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

    const imageC = (
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
    )

    const skeleton = (
        <div style={{marginTop: "25px",
        marginBottom: "12px"}}>
            <Skeleton width={159} height={173} />
        </div>
    )

    return (
        <>
            <Paper variant="outlined" className={classes.paper}>
                <Grid container direction="column" justify="center" alignItems="center">
                    {/* IMAGEN */}
                    <Grid item>
                        {/* LINK DEL PRODUCTO */}
                        <InertiaLink href={route('product.show', uuid)} >
                            <AsyncImage 
                                src={"/storage/products/" + img}
                                imageComponent={imageC}
                                loadingComponent={skeleton}
                            />
                        </InertiaLink>
                    </Grid>

                    {/* NOMBRE */}
                    <Grid item className={classes.name}>
                        {/* LINK DEL PRODUCTO */}
                        <InertiaLink href={route('product.show', uuid)} style={{textDecoration: "none", color:"#474747"}}>
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
                            <Grid item className={classes.brand} container direction="row" justify="flex-start" spacing={2} style={{marginBottom: "1px"}}>
                                {/* SIN GLUTEN */}
                                <Grid item style={{paddingTop: "0px", paddingBottom: "0px", paddingRight: soyaFree ? "8px" : "0px"}}>
                                    {soyaFree == true &&
                                        <img src="/img/CATEGORIAS/icons/soya3.png" className={classes.iconoFree} />
                                    }
                                </Grid>
                                {/* SIN SOYA */}
                                <Grid item style={{paddingTop: "0px", paddingBottom: "0px", paddingLeft: soyaFree ? "8px" : "0px"}}>
                                    {glutenFree == true &&
                                        <img src="/img/CATEGORIAS/icons/gluten3.png" className={classes.iconoFree} />
                                    }
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* LOGO MARCA */}
                        <Grid item xs={6} container direction="column">
                            <Tooltip title={"Marca: " + brand} placement="right">
                                <a href={link} target="_blank">
                                    <div className={classes.logo} style={{
                                            backgroundImage: logo ? 'url("/storage/logos/'+ logo +'")' : 'url("/storage/logos/default.jpg")',
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center center",
                                            backgroundSize: "100%"
                                        }}
                                    >
                                    </div>
                                </a>
                            </Tooltip>
                        </Grid>
                    </Grid>

                    {carrusel ?
                    <Grid item style={{marginBottom:"20px"}} >

                    </Grid>
                    : 
                    <Grid item container justify="center" style={{width:"220px"}}>
                    {cantidad > 0 ?
                        <OutlinedInput type="number"
                            className={classes.inputSinFlechasProduct}
                            endAdornment={
                                <InputAdornment position="end">
                                    <InertiaLink href={route('cart.store', id)} method="post" as="button" style={{textDecoration: "none"}} className={classes.inertiaButtonPlusRemove} preserveScroll>
                                        <IconButton
                                            aria-label="add"
                                            component="div"
                                        >
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </InertiaLink>
                                </InputAdornment>
                            }
                            startAdornment={
                                <InputAdornment position="start">
                                    <InertiaLink href={route('cart.update', id)} method="patch" as="button" style={{textDecoration: "none"}} className={classes.inertiaButtonPlusRemove} preserveScroll>
                                        <IconButton
                                            aria-label="remove"
                                            component="div"
                                        >
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                    </InertiaLink>
                                </InputAdornment>
                            }
                            
                            value={cantidad} />
                        :
                            stock > 0 ?
                                <InertiaLink href={route('cart.store', id)} method="post" as="button" style={{textDecoration: "none"}} className={classes.inertiaButton} preserveScroll>
                                    <Button variant="contained" color="primary" component="div" disableElevation className={classes.button}>
                                        AGREGAR AL CARRITO
                                        <ShoppingCartOutlinedIcon fontSize="small" style={{marginLeft: "6px"}} />
                                    </Button>
                                </InertiaLink>
                            :
                                <InertiaLink href={route('product.show', uuid)} as="button" style={{textDecoration: "none"}} className={classes.inertiaButton}>
                                    <Button variant="contained" color="primary" component="div" disableElevation className={classes.button}>
                                        PRODUCTO NO DISPONIBLE
                                    </Button>
                                </InertiaLink>
                        }
                    </Grid>
                }
                </Grid>
            </Paper>
        </>
    );
}