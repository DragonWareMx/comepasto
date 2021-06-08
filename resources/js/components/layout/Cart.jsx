import { Badge, Button, ButtonBase, Card, CardActions, CardContent, CardHeader, ClickAwayListener, Divider, Fade, Grid, IconButton, Input, InputAdornment, OutlinedInput, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Popper from '@material-ui/core/Popper';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

const StyledBadge = withStyles((theme) => ({
    badge: {
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        backgroundColor: "#FFDE59"
    },
}))(Badge);

const useStyles = makeStyles((theme) => ({
    cartbutton: {
        position: 'relative',
    },
    dropdown: {
        position: 'absolute',
        top: 28,
        right: 0,
        left: 0,
        zIndex: 1,
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        background: '#1DA3A8',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '15px',
        lineHeight: '24px',

        color: '#FFFFFF',
        width: '100%',
        height: '45px',

        '&:hover': {
            background: '#1DA3A8',
          },
    },
    buttonGrid: {
        width: "90%"
    },
    card: {
        width: "100%",
        maxWidth: 375,
        maxHeight: 900,
        overflow: 'auto'
    },
    linkcotizar: {
        marginTop: 11,
        marginBottom: 25
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: 66,
        maxHeight: 72,
    },
    nombreProducto: {
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "15px",
        lineHeight: "19px",


        color: "#474747",
        marginRight: 10
    },
    precio: {
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "18px",


        color: "#1DA3A8",
    },
    precioDescuento: {
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "12px",
        lineHeight: "15px",
        textDecorationLine: "line-through",


        color: "#ABABAB",
    },
    cantidad: {
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "13px",
        lineHeight: "16px",

        color: "#595959",
    },
    precioProducto: {
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "13px",
        lineHeight: "16px",

        color: "#595959",
        marginTop: 10,
        marginRight: 10
    },
    precioTotal: {
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "15px",
        lineHeight: "19px",

        color: "#1DA3A8",
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10
    },
    inputSinFlechas: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },
        "& input":{
            width: "26px"
        },
        height: 33,
        paddingLeft: 0,
        paddingRight: 0
    }
  }));

export default function Footer() {
    const { auth } = usePage().props

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [placement, setPlacement] = React.useState();

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    function calcularCantidadDeProductos(carrito){
        let cantidad = 0
        carrito.forEach(producto => {
            cantidad += producto.pivot.cantidad ?? 0
        });

        return cantidad
    }

    function calcularDescuento(precio, descuento){
        let precioDescuento

        if(descuento <= 100)
            precioDescuento = precio - precio * (descuento/100)
        else
            precioDescuento = 0

        return "$"+precioDescuento.toFixed(2)+" MXN"
    }

    function calcularTotalProducto(producto){
        let precioDescuento

        if(producto.descuento <= 100)
            precioDescuento = producto.precio - producto.precio * (producto.descuento/100)
        else
            precioDescuento = 0

        if(precioDescuento < 0)
            precioDescuento = 0

        return (precioDescuento*producto.pivot.cantidad)
    }

    function calcularTotal(carrito){
        let total = 0

        carrito.forEach(producto => {
            total += calcularTotalProducto(producto)
        });

        return "$"+total.toFixed(2)
    }

    return (
        <>
        {/* ICONO DEL CARRITO */}
        <IconButton aria-label="cart" className={classes.cartbutton} onClick={handleClick('left-start')}>
            <StyledBadge badgeContent={auth.cart ? calcularCantidadDeProductos(auth.cart) : 0} color="primary">
                <ShoppingCartSharpIcon fontSize="large" style={{ color: '#1DA3A8' }} />
            </StyledBadge>
        </IconButton>

        {/* CARD DEL CARRITO, AQUI SE MUESTRAN LOS ELEMENTOS EN EL CARRITO */}
        {auth && auth.user && auth.cart &&
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
            {/* Detecta si se hizo click afuera del card para cerrar el carrito */}
            <ClickAwayListener onClickAway={handleClickAway}>
                <Card className={classes.card}>
                    {/* Icono para cerrar el carrito */}
                    <CardHeader 
                    action={
                        <IconButton aria-label="close" size="small" onClick={handleClickAway}>
                            <CloseSharpIcon fontSize="small"/>
                        </IconButton>
                    } />
                    
                    {/* PRODUCTOS DEL CARRITO */}
                    {auth.cart.length > 0 && auth.cart.map(producto => (
                    <CardContent>
                        {/* PRODUCTO */}
                        <Grid container spacing={2}>
                            {/* Imagen del producto */}
                            <Grid item xs={3}>
                                <ButtonBase>
                                    {producto.foto &&
                                    <img className={classes.img} alt="complex" src={"/storage/products/" + producto.foto} />
                                    }
                                </ButtonBase>
                            </Grid>

                            <Grid item xs container>
                                {/* Nombre del producto */}
                                <Grid item xs={12}>
                                    <InertiaLink href="/producto" style={{textDecoration: "none"}}>
                                        <Typography gutterBottom className={classes.nombreProducto}>
                                            {producto.name.length > 100 ?
                                            producto.name.substring(0, 100 - 3) + "..."
                                            : 
                                            producto.name
                                            }
                                        </Typography>
                                    </InertiaLink>
                                </Grid>

                                {/* Precios */}
                                <Grid item xs={12} container spacing={1}>
                                    <Grid item >
                                        <Typography gutterBottom className={classes.precioDescuento} align="left">
                                            {"$"+producto.precio+" MXN"}
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <Typography gutterBottom  className={classes.precio} align="left">
                                            {calcularDescuento(producto.precio, producto.descuento)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                
                                {/* Cantidad */}
                                <Grid item xs={12} container spacing={1}>
                                    <Grid item xs container alignItems="center" justify="flex-end">
                                        <Typography gutterBottom className={classes.cantidad} align="right">
                                            Cantidad
                                        </Typography>
                                    </Grid>

                                    <Grid item xs container justify="flex-end">
                                        <OutlinedInput type="number"
                                        className={classes.inputSinFlechas}
                                        endAdornment={
                                            <InputAdornment position="end">
                                            <IconButton
                                                aria-label="add"
                                            >
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                            </InputAdornment>
                                        }
                                        startAdornment={
                                            <InputAdornment position="start">
                                            <IconButton
                                                aria-label="remove"
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </IconButton>
                                            </InputAdornment>
                                        }
                                        
                                        value={producto.pivot.cantidad} />
                                    </Grid>
                                </Grid>
                                    
                                {/* Precio */}
                                <Grid item xs={12}>
                                    <Typography gutterBottom className={classes.precioProducto} align="right">
                                        {producto.pivot.cantidad+"x$"+calcularTotalProducto(producto).toFixed(2)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                        <Divider variant="middle" />

                        {/* TOTAL */}
                        <Grid item xs={12} container justify="space-between">
                            <Grid item>
                                <Typography gutterBottom className={classes.precioTotal} align="left">
                                    Total:
                                </Typography>
                            </Grid>

                            <Grid item>
                            <Typography gutterBottom className={classes.precioTotal} align="right">
                                {calcularTotal(auth.cart)}
                            </Typography>
                            </Grid>
                        </Grid>

                    </CardContent>
                    ))
                    }


                    {/* BOTONES DE PAGO Y ENVIO */}
                    <CardActions>
                        <Grid container justify="center" direction="column">
                            <Grid container item justify="center" xs={12}> 
                                <InertiaLink href="/ejemplo" style={{textDecoration: "none"}} className={classes.buttonGrid}>
                                    <Button variant="contained" color="primary" disableElevation className={classes.button}>
                                        Proceder pago
                                    </Button>
                                </InertiaLink>
                            </Grid>

                            <Grid container item className={classes.linkcotizar} justify="center">
                                <InertiaLink style={{color: "#595959"}} href="/ejemplo">
                                    Cotizar costo de envío
                                </InertiaLink>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </ClickAwayListener>
        </Popper>
        }

        </>
    );
}