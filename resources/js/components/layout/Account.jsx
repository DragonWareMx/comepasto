import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';


import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import route from 'ziggy-js';


const useStyles = makeStyles((theme) => ({
    userbutton: {
        position: 'relative',
    },
    inertia: {
        textDecoration: 'none',
        backgroundColor: 'transparent',
        border: 'none',
        padding: '0px',
        fontFamily: 'Atma',
        fontSize: '18px',
        color: '#1DA3A8'
    }
}));

export default function Account({ abrirLogin }) {
    const classes = useStyles();
    const { auth, flash } = usePage().props
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {/* ICONO DEL CARRITO */}
            <IconButton aria-label="cart" className={classes.userbutton} onClick={handleClick}>
                <AccountCircleIcon fontSize="large" style={{ color: '#1DA3A8' }} />
            </IconButton>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                disableScrollLock={true}
            >
                {auth.user &&
                    <MenuItem onClick={handleClose}>
                        <InertiaLink href={route('cuenta')} className={classes.inertia}>Mi cuenta</InertiaLink>
                    </MenuItem>
                }
                {auth.user && auth.user.rol == "admin" &&
                    <MenuItem onClick={handleClose}>
                        <InertiaLink href={'/admin'} className={classes.inertia}>Administrar</InertiaLink>
                    </MenuItem>
                }
                {auth.user &&
                    <MenuItem onClick={handleClose}>
                        <InertiaLink href={route('logout')} method={'post'} as={'button'} className={classes.inertia}>Cerrar sesión</InertiaLink>
                    </MenuItem>
                }
                {!auth.user &&
                    <MenuItem onClick={abrirLogin}>
                        <div className={classes.inertia}>Iniciar Sesión</div>
                    </MenuItem>
                }
            </Menu>
        </>
    )
}
