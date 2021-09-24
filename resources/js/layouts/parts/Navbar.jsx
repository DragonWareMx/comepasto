import React from 'react';
import styled from "styled-components";
import Backdrop from "./Backdrop";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { InertiaLink, Link } from '@inertiajs/inertia-react';
import route from "ziggy-js";

import List from '@material-ui/core/List';
import MuiListItem from "@material-ui/core/ListItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import EventIcon from '@material-ui/icons/Event';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Hidden from '@material-ui/core/Hidden';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const StyledNav = styled.nav`
    background-color:  #fafafa;
    color: white;
    height: 100vh;
    width: ${p => p.compact ? '60px' : '226px'};
    position: sticky;
    top: 0px;
    left: 0px;
    z-index: 1;
    padding: 5px 10px;
    transition: width 0.2s cubic-bezier( 0.4, 0, 1, 1);
    border: none;
    border-right: 1px solid #e5e5e5;
    &::before{
        content: "",
        background-color: rgba(0,0,0, .2);
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    @media(max-width: 990px){
        position: fixed;
        transform: translate3d( ${p => p.visible ? 0 : "-250px"}, 0,0);
        transition:  transform .3s ${p => p.visible ? "cubic-bezier( 0.4, 0, 1, 1)" : "cubic-bezier( 0, 0, 0.2, 1)"} !important;
    };

`;

const Logo = styled.img`
    width: 100%;
    height:  ${p => p.compact ? '0px' : '40px'};
    margin-bottom: ${p => p.compact ? '0px' : '60px'} !important;
    padding: 0px 15px;
    transition: height 0.2s cubic-bezier( 0.4, 0, 1, 1);
`;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'transparent',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    separador: {
        marginTop: '5px',
        marginBottom: '5px',
        borderBottom: '1px solid #E1E3EA',
        width: '100%',
        height: '1px',
        padding: '0px',
    },
    texto: {
        fontFamily: 'Oxygen',
        fontWeight: '400px',
        fontStyle: 'normal',
        fontSize: '14px',
        lineHeight: '18px'
    },
    inertiaLink: {
        backgroundColor: 'transparent',
        border: 'none',
        padding: '0px 0px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 0px',
        "&:hover": {
            backgroundColor: "#B2BFBF26",
            color: "#000000",
            borderRadius: '4px',
        }
    },
    inertiaLink2: {
        backgroundColor: 'transparent',
        border: 'none',
        width: '100%',
        color: '#5B5B5B',
        textDecoration: 'none',
        "&:hover": {
            backgroundColor: "#B2BFBF26",
            color: "#000000",
            borderRadius: '4px',
            textDecoration: 'none'
        }
    },
    button: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        padding: '0px'
    }
}));

const ListItem = withStyles({
    root: {
        // "&$selected": {
        //     backgroundColor: "red",
        //     color: "white"
        // },
        // "&$selected:hover": {
        //     backgroundColor: "purple",
        //     color: "white"
        // },
        marginBottom: '10px',
        "&:hover": {
            backgroundColor: "rgba(179, 191, 191, 0.15)",
            color: "#000000",
            borderRadius: '4px',
            textDecoration: 'none'
        }
    },
    selected: {}
})(MuiListItem);

export function Navbar(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <Backdrop visible={props.visible} onClick={props.close} />
            <StyledNav {...props}>
                {/* {props.compact ?
                    <img src="/img/DE.png" alt="Logo" className={classes.logo2} /> :
                    <img src="/img/danteLogoBlanco.png" alt="Logo" className={classes.logo} />
                } */}
                {/* <Logo src="/img/danteLogoBlanco.png" alt="Logo" className={classes.logo}  {...props} /> */}

                {props.compact ?
                    <div id="lista-con-compact" >
                        <InertiaLink href={route('admin.productos')} as="button" type="button" className={classes.inertiaLink}>
                            <ShoppingCartIcon style={{ color: '#5B5B5B' }} />
                        </InertiaLink>
                        <InertiaLink href={route('admin.pedidos')} as="button" type="button" className={classes.inertiaLink}>
                            <LocalShippingIcon style={{ color: '#5B5B5B' }} />
                        </InertiaLink>
                        <InertiaLink href={route('admin.clientes')} as="button" type="button" className={classes.inertiaLink}>
                            <PeopleOutlineIcon style={{ color: '#5B5B5B' }} />
                        </InertiaLink>
                        <InertiaLink href={route('admin.recetas')} as="button" type="button" className={classes.inertiaLink}>
                            <RestaurantIcon style={{ color: '#5B5B5B' }} />
                        </InertiaLink>
                        <InertiaLink href={route('admin.banners')} as="button" type="button" className={classes.inertiaLink}>
                            <PhotoLibraryIcon style={{ color: '#5B5B5B' }} />
                        </InertiaLink>
                        <InertiaLink href={route('admin.preguntas')} as="button" type="button" className={classes.inertiaLink}>
                            <QuestionAnswerIcon style={{ color: '#5B5B5B' }} />
                        </InertiaLink>
                        <div className={classes.separador}></div>
                    </div> :
                    <div id="lista-sin-compact" >
                        <List
                            component="nav"
                            className={classes.root}
                            sx={{
                                [`& .active, & .${classes.root}:hover`]: {
                                    color: "red",
                                    fontWeight: "bold",
                                    "& svg": {
                                        fill: "red"
                                    }
                                }
                            }}
                        >
                            <InertiaLink href={route('admin.productos')} className={classes.inertiaLink2}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <ShoppingCartIcon style={{ color: '#5B5B5B' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Productos" classes={{ primary: classes.texto }} />
                                </ListItem>
                            </InertiaLink>
                            <InertiaLink href={route('admin.pedidos')} className={classes.inertiaLink2}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <LocalShippingIcon style={{ color: '#5B5B5B' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Pedidos" classes={{ primary: classes.texto }} />
                                </ListItem>
                            </InertiaLink>
                            <InertiaLink href={route('admin.clientes')} className={classes.inertiaLink2}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <PeopleOutlineIcon style={{ color: '#5B5B5B' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Clientes" classes={{ primary: classes.texto }} />
                                </ListItem>
                            </InertiaLink>
                            <InertiaLink href={route('admin.recetas')} className={classes.inertiaLink2}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <RestaurantIcon style={{ color: '#5B5B5B' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Recetas" classes={{ primary: classes.texto }} />
                                </ListItem>
                            </InertiaLink>
                            <InertiaLink href={route('admin.banners')} className={classes.inertiaLink2}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <PhotoLibraryIcon style={{ color: '#5B5B5B' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Banners" classes={{ primary: classes.texto }} />
                                </ListItem>
                            </InertiaLink>
                            <InertiaLink href={route('admin.preguntas')} className={classes.inertiaLink2}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <QuestionAnswerIcon style={{ color: '#5B5B5B' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Preguntas frecuentes" classes={{ primary: classes.texto }} />
                                </ListItem>
                            </InertiaLink>
                        </List>
                        <div className={classes.separador}></div>
                    </div>
                }

                <Hidden mdDown>
                    <IconButton aria-label="cart" className={classes.button} onClick={props.handleCompact}>
                        {props.compact ?
                            <KeyboardArrowRightIcon fontSize="large" style={{ color: '#1DA3A8' }} /> :
                            <KeyboardArrowLeftIcon fontSize="large" style={{ color: '#1DA3A8' }} />
                        }
                    </IconButton>
                </Hidden>
            </StyledNav>

        </>
    )
}