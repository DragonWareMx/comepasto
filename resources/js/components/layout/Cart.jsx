import { Badge, Button, ButtonBase, Card, CardActions, CardContent, CardHeader, ClickAwayListener, Divider, Fade, Grid, IconButton, Input, InputAdornment, OutlinedInput, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Popper from '@material-ui/core/Popper';
import { InertiaLink } from '@inertiajs/inertia-react';

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
        marginTop: 10
    },
    inputSinFlechas: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },
        height: 33,
        paddingLeft: 0,
        paddingRight: 0
    }
  }));

export default function Footer() {
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

    return (
        <>
        {/* ICONO DEL CARRITO */}
        <IconButton aria-label="delete" className={classes.cartbutton} onClick={handleClick('left-start')}>
            <StyledBadge badgeContent={4} color="primary">
                <ShoppingCartSharpIcon fontSize="large" style={{ color: '#1DA3A8' }} />
            </StyledBadge>
        </IconButton>

        {/* CARD DEL CARRITO, AQUI SE MUESTRAN LOS ELEMENTOS EN EL CARRITO */}
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
                    <CardContent>
                        {/* PRODUCTO */}
                        <Grid container spacing={2}>
                            {/* Imagen del producto */}
                            <Grid item>
                                <ButtonBase>
                                    <img className={classes.img} alt="complex" src="/img/PRODUCTOS/1.png" />
                                </ButtonBase>
                            </Grid>

                            <Grid item xs={12} sm container>
                                {/* Nombre del producto */}
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="subtitle1" className={classes.nombreProducto}>
                                        Nombre del producto
                                    </Typography>
                                </Grid>

                                {/* Precios */}
                                <Grid item xs={12} container spacing={1}>
                                    <Grid item >
                                        <Typography gutterBottom variant="subtitle1" className={classes.precioDescuento} align="left">
                                            $99.99 MXN
                                        </Typography>
                                    </Grid>
                                    <Grid item >
                                        <Typography gutterBottom variant="subtitle1" className={classes.precio} align="left">
                                            $80.50 MXN
                                        </Typography>
                                    </Grid>
                                </Grid>
                                
                                {/* Cantidad */}
                                <Grid item xs={12} container spacing={1}>
                                    <Grid item xs container alignItems="center" justify="flex-end">
                                        <Typography gutterBottom variant="subtitle1" className={classes.cantidad} align="right">
                                            Cantidad
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={6}>
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
                                        } />
                                    </Grid>
                                </Grid>
                                    
                                {/* Precio */}
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="subtitle1" className={classes.precioProducto} align="right">
                                        1x$80.50
                                    </Typography>
                                </Grid>
                            </Grid>
                            
                            {/* <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                            Standard license
                                        </Typography>

                                        <Typography variant="body2" gutterBottom>
                                            Full resolution 1920x1080 • JPEG
                                        </Typography>

                                        <Typography variant="body2" color="textSecondary">
                                            ID: 1030114
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                            Remove
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid item>
                                    <Typography variant="subtitle1">$19.00</Typography>
                                </Grid>
                            </Grid> */}
                        </Grid>
                        
                        <Divider variant="middle" />

                    </CardContent>


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

        </>
    );
}