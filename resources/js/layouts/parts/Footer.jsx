import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        width: "100%",
        color: '#C5C5C5',
        fontFamily: 'Oxygen',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '13px',
        lineHeight: '16px',
        textAlign: 'center',
        position: 'absolute',
        bottom: '15px',
    },
    logo: {
        width: '19px',
        height: '13px',
        marginLeft: '10px',
        filter: "brightness(40%)"
    },
    link: {
        textDecoration: 'none',
        display: "flex",
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#C5C5C5',
        "&:hover": {
            textDecoration: 'none',
            color: '#C5C5C5',
        }
    }
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <a href="https://dragonware.com.mx" target="_blank" className={classes.link}>
                Desarrollado por DragonWare <img src="/img/icons/dragonBlanco.png" className={classes.logo} />
            </a>
        </div>
    )
}