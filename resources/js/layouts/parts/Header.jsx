import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import styled from 'styled-components';
import { InertiaLink, usePage } from '@inertiajs/inertia-react'


const Grid = styled.div`
    display: flex;
    justify-content: space-between;
    height: 60px;
    background-color: #1DA3A8;
    border-bottom: 1px solid #1DA3A8;
    padding: 0px 1%;
`;

const MBurger = styled.div`
    display:none !important;
    align-content: center;
    @media (max-width: 990px) {
        display: flex !important;
      }
`;

const Burger = styled.div`
    display:flex !important;
    align-content: center;
    align-items: center;
    @media (max-width: 990px) {
        display: none !important;
      }
    font-family: Fredoka One;
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 36px;

    color: #FFDE59;
`;

const useStyles = makeStyles((theme) => ({
    menuPaper: {
        backgroundColor: "#323232;",
        borderRadius: '4px',
        color: 'white',
        marginTop: '35px',
    },
    inertiaLink: {
        color: 'white',
        textDecoration: 'none',
        border: 'none',
        backgroundColor: 'transparent',
    }
}));

export default function Header({ toggle, handleCompact }) {
    const { auth } = usePage().props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid>
            <MBurger>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={toggle}
                    color="inherit"
                >
                    <MenuIcon style={{ color: 'white' }} />
                </IconButton>
            </MBurger>

            <Burger>
                <div>
                    Comepasto
                </div>
            </Burger>

            <div style={{ display: 'flex', alignContent: 'center' }}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle style={{ color: 'white' }} />
                    <div style={{ color: 'white', fontFamily: 'Oxygen', fontSize: '13px', fontStyle: 'normal', fontWeigh: 'bold', marginLeft: '7px', marginRight: '4px' }}> {auth.user.name}
                    </div>
                    <div style={{ color: 'white' }}> &#x25BE;</div>
                </IconButton>
                <Menu
                    id="simple-menu"
                    classes={{ paper: classes.menuPaper }}
                    anchorEl={anchorEl}

                    keepMounted

                    open={open}
                    onClose={handleClose}
                >
                    <InertiaLink href="/logout" method='post' as='button' className={classes.inertiaLink}>
                        <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
                    </InertiaLink>
                </Menu>
            </div>
        </Grid>
    )
}