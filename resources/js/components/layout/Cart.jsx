import { Badge, Button, ButtonBase, Card, CardActions, CardContent, Divider, Fade, Grid, IconButton, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
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
        width: '319px',
        height: '45px',

        '&:hover': {
            background: '#1DA3A8',
          },
    },
    card: {
        width: 375,
        maxWidth: 375,
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

            <Card className={classes.card}>
                <CardContent>
                    {/* PRODUCTO */}
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src="/img/PRODUCTOS/1.png" />
                            </ButtonBase>
                        </Grid>
                        
                        <Grid item xs={12} sm container>
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
                        </Grid>
                    </Grid>
                    
                    <Divider variant="middle" />

                </CardContent>


                {/* BOTONES DE PAGO Y ENVIO */}
                <CardActions>
                    <Grid container justify="center">
                        <Grid direction="row"> 
                            <InertiaLink href="/ejemplo" style={{textDecoration: "none"}}>
                                <Button variant="contained" color="primary" disableElevation className={classes.button}>
                                    Proceder pago
                                </Button>
                            </InertiaLink>
                        </Grid>

                        <Grid direction="row" className={classes.linkcotizar}>
                            <InertiaLink style={{color: "#595959"}} href="/ejemplo">
                                Cotizar costo de envío
                            </InertiaLink>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>

        </Popper>

        </>
    );
}