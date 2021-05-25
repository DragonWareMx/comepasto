import { Badge, Card, CardActions, CardContent, Divider, Fade, IconButton } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import Popper from '@material-ui/core/Popper';

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
        maxWidth: 375,
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
        <IconButton aria-label="delete" className={classes.cartbutton} onClick={handleClick('left-start')}>
            <StyledBadge badgeContent={4} color="primary">
                <ShoppingCartSharpIcon fontSize="large" style={{ color: '#1DA3A8' }} />
            </StyledBadge>
        </IconButton>

        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
            <Card >
                <CardContent>
                    Contenido del card
                </CardContent>
                <Divider variant="middle" />
                <CardActions>
                    Acciones de la card
                </CardActions>
            </Card>
        </Popper>

        </>
    );
}