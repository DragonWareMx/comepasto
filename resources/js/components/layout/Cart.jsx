import { Badge, Button, ButtonBase, Card, CardActions, CardContent, CardHeader, ClickAwayListener, Divider, Dialog, Fade, Grid, IconButton, Input, InputAdornment, OutlinedInput, Drawer, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import Popper from '@material-ui/core/Popper';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';

import Login from '../auth/Login'
import Register from '../auth/Register'
import Pago from '../common/Pago'

//iconos
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

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
        marginRight: 10,
        width: "fit-content",
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
        "& input": {
            width: "26px",
            textAlign: "center"
        },
        height: 33,
        paddingLeft: 0,
        paddingRight: 0
    },
    cardInicioSesion: {
        width: "100%",
        maxWidth: "400px",
        height: "fit-content",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonDial: {
        background: '#1DA3A8',
        color: '#FFFFFF',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '13px',
        lineHeight: '21px',

        minWidth: '220px',
        maxWidth: '319px',
        height: '45px',
        width: "100%",

        border: "1px solid #E3E3E3",

        '&:hover': {
            background: '#1DA3A8',
            color: '#FFFFFF',
        },
    },
    inertiaButton: {
        width: "90%",
        minWidth: '220px',
        maxWidth: '319px',

        height: "fit-content",
        backgroundColor: "transparent",

        marginTop: "12px",
        marginBottom: "20px",

        padding: "0px",
        border: "none",
    },
    cardText: {
        color: '#626262',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '23px',
        width: "90%",
        textAlign: "center"
    },
    cardLink: {
        color: '#1DA3A8',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '23px',
        textAlign: "center",
        textDecoration: "none",
        marginRight: "2px",
        cursor: 'pointer'
    },
    inertiaButtonPlusRemove: {
        width: "fit-content",
        height: "fit-content",
        backgroundColor: "transparent",
        padding: "0px",
        border: "none"
    },
    carritoVacioTitulo: {
        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '20px',
        lineHeight: '49px',
        color: '#1DA3A8',
    },
    carritoVacio: {
        color: '#626262',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '20px',
        width: "90%",
        textAlign: "center"
    },
    inertiaButtonCart: {
        width: "fit-content",
        height: "fit-content",
        backgroundColor: "transparent",
        marginTop: "12px",
        marginBottom: "20px",
        padding: "0px",
        border: "none"
    },
    buttonCart: {
        background: 'transparent',
        color: '#9F9F9F',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '13px',
        lineHeight: '21px',

        width: '100%',
        height: '38px',

        border: "1px solid #E3E3E3",

        '&:hover': {
            background: '#1DA3A8',
            color: '#FFFFFF',
        },
    },
}));

export default function Cart({ bDialog }) {
    const { auth, flash } = usePage().props

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [dialog, setDialog] = React.useState(false);

    const [dialogLogin, setDialogLogin] = React.useState(false);
    const [dialogRegister, setDialogRegister] = React.useState(false);
    const [dialogPago, setDialogPago] = React.useState(false);

    //CLICK EN EL ICONO DEL CARRITO, si el usuario inicio sesion se muestra el contenido del carrito, si no se abre el dialog
    function handleClick(event) {
        if (auth && auth.cart) {
            setOpen(true);
        }
        else {
            setDialog(true)
        }
    }

    const handleDialogClose = () => {
        setDialog(false);
    };

    const handleDialogLoginClose = () => {
        setDialogLogin(false);
    };

    const handleOpenLogin = () => {
        handleDialogClose();
        setDialogLogin(true);
    }

    const handleDialogRegisterClose = () => {
        setDialogRegister(false);
    };

    const handleOpenRegister = () => {
        handleDialogClose();
        setDialogLogin(false);
        setDialogRegister(true);
    }

    const handleDialogPagoClose = () => {
        setDialogPago(false);
    };

    const handleOpenPago = () => {
        setDialogPago(true);
    }

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(open);
    };

    function calcularCantidadDeProductos(carrito) {
        let cantidad = 0
        carrito.forEach(producto => {
            cantidad += producto.pivot.cantidad ?? 0
        });

        return cantidad
    }

    function calcularDescuento(precio, descuento) {
        let precioDescuento

        if (descuento <= 100)
            precioDescuento = precio - precio * (descuento / 100)
        else
            precioDescuento = 0

        return "$" + parseFloat(precioDescuento).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " MXN"
    }

    function calcularTotalProducto(producto) {
        let precioDescuento

        if (producto.descuento <= 100)
            precioDescuento = (producto.precio - producto.precio * (producto.descuento / 100)).toFixed(2)
        else
            precioDescuento = 0

        if (precioDescuento < 0)
            precioDescuento = 0

        return (precioDescuento * producto.pivot.cantidad)
    }

    function calcularTotal(carrito) {
        let total = 0

        carrito.forEach(producto => {
            total += calcularTotalProducto(producto)
        });

        return "$" + parseFloat(total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }

    useEffect(() => {
        if (flash.info && bDialog) {
            setDialog(true)
        }
    }, [flash])

    return (
        <>
            {/* ICONO DEL CARRITO */}
            <IconButton aria-label="cart" className={classes.cartbutton} onClick={handleClick}>
                <StyledBadge badgeContent={auth.cart ? calcularCantidadDeProductos(auth.cart) : 0} color="primary">
                    <ShoppingCartSharpIcon fontSize="large" style={{ color: '#1DA3A8' }} />
                </StyledBadge>
            </IconButton>

            {/* CARD DEL CARRITO, AQUI SE MUESTRAN LOS ELEMENTOS EN EL CARRITO SI EL USUARIO HA INICIADO SESION */}
            {auth && auth.user && auth.cart &&
                <Drawer
                    anchor="right"
                    open={open}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <div
                        role="presentation"
                    >
                        {/* CLOSE MENU */}
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <Grid item style={{ margin: 10 }}>
                                <IconButton
                                    aria-label="cerrar"
                                    onClick={toggleDrawer(false)}
                                    onKeyDown={toggleDrawer(false)}
                                >
                                    <CloseSharpIcon />
                                </IconButton>
                            </Grid>
                        </Grid>

                        <Divider variant="middle" />


                        {/* PRODUCTOS DEL CARRITO */}
                        {auth.cart.length > 0 ?
                            <>
                                {auth.cart.map(producto => (
                                    <div key={producto.id + "carrito"}>
                                        {/* PRODUCTO */}
                                        <Grid container style={{ maxWidth: 320, margin: 10 }}>
                                            {/* Imagen del producto */}
                                            <Grid item xs={3}>
                                                <ButtonBase>
                                                    {producto.foto &&
                                                        <img className={classes.img} alt="complex" src={"/storage/products/" + producto.foto} />
                                                    }
                                                </ButtonBase>
                                            </Grid>

                                            <Grid item xs container>
                                                {/* NOMBRE DEL PRODUCTO */}
                                                <Grid item xs={12}>
                                                    <InertiaLink href="/producto" style={{ textDecoration: "none" }}>
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
                                                    {producto.descuento > 0 ?
                                                        <>
                                                            <Grid item >
                                                                <Typography gutterBottom className={classes.precioDescuento} align="left">
                                                                    {"$" + parseFloat(producto.precio).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " MXN"}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item >
                                                                <Typography gutterBottom className={classes.precio} align="left">
                                                                    {calcularDescuento(producto.precio, producto.descuento)}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                        :
                                                        <>
                                                            <Grid item style={{ padding: 0 }}>
                                                                <Typography gutterBottom className={classes.precioDescuento} align="left" style={{ padding: 0 }} >

                                                                </Typography>
                                                            </Grid>
                                                            <Grid item >
                                                                <Typography gutterBottom className={classes.precio} align="left">
                                                                    {"$" + parseFloat(producto.precio).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " MXN"}
                                                                </Typography>
                                                            </Grid>
                                                        </>
                                                    }
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
                                                                    <InertiaLink href={route('cart.store', producto.id)} method="post" as="button" style={{ textDecoration: "none" }} className={classes.inertiaButtonPlusRemove} preserveScroll>
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
                                                                    <InertiaLink href={route('cart.update', producto.id)} method="patch" as="button" style={{ textDecoration: "none" }} className={classes.inertiaButtonPlusRemove} preserveScroll>
                                                                        <IconButton
                                                                            aria-label="remove"
                                                                            component="div"
                                                                        >
                                                                            <RemoveIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </InertiaLink>
                                                                </InputAdornment>
                                                            }

                                                            value={producto.pivot.cantidad} />
                                                    </Grid>
                                                </Grid>

                                                {/* Precio */}
                                                <Grid item xs={12}>
                                                    <Typography gutterBottom className={classes.precioProducto} align="right">
                                                        {producto.pivot.cantidad + "x$" + calcularTotalProducto(producto).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Divider variant="middle" />
                                    </div>
                                ))}
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

                                <Grid container justify="center" direction="column">
                                    <Grid container item justify="center" xs={12}>
                                        <div style={{ textDecoration: "none" }} className={classes.buttonGrid}>
                                            <Button variant="contained" color="primary" disableElevation className={classes.button} onClick={handleOpenPago}>
                                                Proceder pago
                                            </Button>
                                        </div>
                                    </Grid>

                                    <Grid container item className={classes.linkcotizar} justify="center">
                                        {/* <InertiaLink style={{ color: "#595959" }} href="/ejemplo">
                                            Cotizar costo de envío
                                        </InertiaLink> */}
                                    </Grid>
                                </Grid>
                            </>
                            :
                            <>
                                {/* CARRITO VACIO */}
                                <Grid container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{ width: 250, margin: 10 }}
                                >
                                    <Grid item>
                                        <ShoppingCartOutlinedIcon style={{ fontSize: 50, color: "#1DA3A8" }} />
                                    </Grid>

                                    <Grid item>
                                        <div className={classes.carritoVacioTitulo} style={{ marginTop: "0px" }}>
                                            TU CARRITO ESTÁ VACÍO
                                        </div>
                                        <div className={classes.carritoVacio} style={{ marginTop: "0px" }}>
                                            Agrega productos a tu carrito
                                        </div>
                                    </Grid>

                                    <Grid item>
                                        <InertiaLink href={route('inicio')} as="button" style={{ textDecoration: "none" }} className={classes.inertiaButtonCart} preserveScroll onClick={toggleDrawer(false)}>
                                            <Button variant="contained" color="primary" component="div" disableElevation className={classes.buttonCart}>
                                                IR A LA TIENDA
                                            </Button>
                                        </InertiaLink>
                                    </Grid>
                                </Grid>
                            </>
                        }
                    </div>
                </Drawer>
            }

            {/* DIALOG QUE SE MUESTRA CUANDO EL USUARIO NO HA INICIADO SESION */}
            <Dialog
                open={dialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className={classes.cardInicioSesion}>
                    <div className={classes.cardText} style={{ marginTop: "30px" }}>
                        Inicia sesión en comepasto para comenzar a añadir productos a tu carrito
                    </div>

                    <div className={classes.inertiaButton} >
                        <Button variant="contained" color="primary" component="div" disableElevation className={classes.buttonDial} onClick={handleOpenLogin}>
                            INICIAR SESIÓN
                        </Button>
                    </div>

                    <div className={classes.cardText} style={{ marginBottom: "30px" }}>
                        <a className={classes.cardLink} onClick={handleOpenRegister}>
                            ¿Deseas registrarte?
                        </a>
                        Esto agilizará tus procesos de compra
                    </div>
                </div>
            </Dialog>

            <Login dialog={dialogLogin} handleClose={handleDialogLoginClose} openRegister={handleOpenRegister} openLogin={handleOpenLogin} />
            <Register dialog={dialogRegister} handleClose={handleDialogRegisterClose} />
            {dialogPago &&
                <Pago dialog={dialogPago} handleClose={handleDialogPagoClose} handleCloseCarrito={toggleDrawer(false)} subtotal={auth.cart && auth.cart.length > 0 ? calcularTotal(auth.cart) : 0} />
            }
        </>
    );
}