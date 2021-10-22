import React, { useEffect, useState } from 'react';
import route from 'ziggy-js';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Cart from '../layout/Cart'
import Account from '../layout/Account'
import SearchIcon from '@material-ui/icons/Search';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import MenuIcon from '@material-ui/icons/Menu';
import Slide from '@material-ui/core/Slide';
import { Inertia } from '@inertiajs/inertia'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { IconButton } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal';
// import DialogTitle from '@material-ui/core/DialogTitle';

import Login from '../auth/Login';
import Register from '../auth/Register';

const useStyles = makeStyles((theme) => ({
    input: {
        minWidth: '250px',
        maxWidth: '350px',
        fontFamily: "Atma",
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '15px',
        lineHeight: '23px',
        color: '#333333',
        marginTop: '20px',
        marginBottom: '20px',
        "&:not(.Mui-disabled):hover::before": {
            borderColor: "#1DA3A8"
        },
    },
    userbutton: {
        position: 'relative',
    },
    formTextLabel: {
        fontFamily: 'Atma',
        fontSize: '14px',
        lineHeight: '19.5px',
        color: '#9E9E9E'
    },
    button: {
        backgroundColor: "transparent",
        border: '0px',
        padding: '0px',
        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '18px',
        lineHeight: '29px',
        color: '#FFDE59',
    }
}));

const theme = createMuiTheme({
    palette: {
        secondary: {
            // light: will be calculated from palette.primary.main,
            main: '#ff4400',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        primary: {
            light: '#1DA3A8',
            main: teal[500],
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // error: will use the default color
    },
    status: {
        danger: 'orange',
    },
});

export default function Navbar() {
    const classes = useStyles();
    const [values, setValues] = useState({
        busqueda: '',
    });
    const [NavDialog, setNavDialog] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const { auth, flash } = usePage().props


    useEffect(() => {
        window.addEventListener('scroll', (e) => {
            var navbar = document.getElementById('main-navbar');
            // var main = document.getElementById('content');
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                navbar.classList.add('shrinked');
                // main.classList.add('shrinked');
            } else {
                navbar.classList.remove('shrinked');
                // main.classList.remove('shrinked');
            }
        })
    })


    function handleClick() {
        setNavDialog((prev) => !prev)
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }


    function handleSubmit(e) {
        e.preventDefault()

        Inertia.get('/inicio#productos', values, {
            //aqui veremos si se puede anclar el scroll :v
            preserveScroll: false,

            onSuccess: () => {

            },

            onError: () => {
                setValues(values => ({
                    ...values,
                    error: true
                }));
            },

            onFinish: () => {
                setOpen(false)
            }
        })
    }

    //esto de aqui es para que funcione el login
    const [dialogLogin, setDialogLogin] = React.useState(false);
    const [dialogRegister, setDialogRegister] = React.useState(false);

    const handleDialogLoginClose = () => {
        setDialogLogin(false);
    };

    const handleOpenLogin = () => {
        // handleClose();
        handleClick();
        setDialogLogin(true);
    }

    const handleDialogRegisterClose = () => {
        setDialogRegister(false);
    };

    const handleOpenRegister = () => {
        handleClose();
        setDialogLogin(false);
        setDialogRegister(true);
    }

    return (
        <div>
            <nav className="main-navbar" id="main-navbar" style={{ zIndex: 999 }}>
                <div className="navbar-sup">
                    <div className="div-redes">
                        <a className="icono" href="http://facebook.com/comepastov" target='_blank'>
                            <img src="/img/icons/fb.png" alt="Facebok" width={"25px"} height={"25px"} />
                            Facebook
                        </a>
                        <a className="icono" href="https://www.instagram.com/comepastov/?hl=es-la" style={{ marginLeft: "15px" }} target='_blank'>
                            <img src="/img/icons/ig.png" alt="Instagram" width={"25px"} height={"25px"} />
                            Instagram
                        </a>
                    </div>
                    <div className="div-logo">
                        <InertiaLink href={route('inicio')}>Comepasto</InertiaLink>
                    </div>
                    <div className="links-hide">
                        <InertiaLink href={route('inicio')}>
                            TIENDA
                        </InertiaLink>

                        <InertiaLink href={route('recetas')}>
                            RECETAS
                        </InertiaLink>

                        <InertiaLink href={route('quienesSomos')}>
                            QUIÉNES SOMOS
                        </InertiaLink>

                        <InertiaLink href={route('preguntas')}>
                            PREGUNTAS FRECUENTES
                        </InertiaLink>
                    </div>
                    <div className="div-iconos">
                        <IconButton aria-label="cart" className={classes.userbutton} onClick={handleClickOpen}>
                            <SearchIcon fontSize="large" style={{ color: '#1DA3A8', cursor: 'pointer' }} />
                        </IconButton>
                        <Account abrirLogin={handleOpenLogin} />
                        <Cart bDialog={true} />
                    </div>
                </div>
                <div className="navbar-inf">
                    <div className="links">
                        <InertiaLink href={route('inicio')}>
                            TIENDA
                        </InertiaLink>

                        <InertiaLink href={route('recetas')}>
                            RECETAS
                        </InertiaLink>

                        <InertiaLink href={route('quienesSomos')}>
                            QUIÉNES SOMOS
                        </InertiaLink>

                        <InertiaLink href={route('preguntas')}>
                            PREGUNTAS FRECUENTES
                        </InertiaLink>
                    </div>
                </div>
            </nav>
            <header className="mobile">
                <div className="left">
                    <MenuIcon fontSize="large" style={{ color: '#1DA3A8' }} onClick={handleClick} />
                </div>
                <div className="div-logo-m">
                    <InertiaLink href={route('inicio')}>Comepasto</InertiaLink>
                </div>
                <div className="right">
                    <div className="div-iconos">
                        <SearchIcon fontSize="large" style={{ color: '#1DA3A8' }} onClick={handleClickOpen} />
                        <Cart bDialog={false} />
                    </div>
                </div>
            </header>
            <Slide in={NavDialog} direction="down" mountOnEnter unmountOnExit>
                <nav className="navigation">
                    <ul>
                        <li><InertiaLink href={route('inicio')} onClick={handleClick}>TIENDA</InertiaLink></li>
                        <li><InertiaLink href={route('recetas')} onClick={handleClick}>RECETAS</InertiaLink></li>
                        <li><InertiaLink href={route('quienesSomos')} onClick={handleClick}>QUIÉNES SOMOS</InertiaLink></li>
                        <li><InertiaLink href={route('preguntas')} onClick={handleClick}>PREGUNTAS FRECUENTES</InertiaLink></li>
                        {!auth.user ?
                            <li><a onClick={handleOpenLogin}>INICIAR SESIÓN</a></li>
                            :
                            <>
                                <li><a href={route('cuenta')}>MI CUENTA</a></li>
                                {auth.user.rol == 'admin' &&
                                    <li><a href="/admin">ADMINISTRAR</a></li>
                                }
                                <li><InertiaLink as="button" method='POST' href={route('logout')} className={classes.button}>CERRAR SESIÓN</InertiaLink></li>
                            </>
                        }

                    </ul>
                </nav>
            </Slide>
            {/* {NavDialog &&
                <nav class="navigation">
                    <ul>
                        <li><a href="#">TIENDA</a></li>
                        <li><a href="#">RECETAS</a></li>
                        <li><a href="#">QUIÉNES SOMOS</a></li>
                        <li><a href="#">PREGUNTAS FRECUENTES</a></li>
                    </ul>
                </nav>
            } */}
            <Login dialog={dialogLogin} handleClose={handleDialogLoginClose} openRegister={handleOpenRegister} openLogin={handleOpenLogin} />
            <Register dialog={dialogRegister} handleClose={handleDialogRegisterClose} />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit}>
                    {/* <DialogTitle className='busqueda_title'>Búscar</DialogTitle> */}
                    <DialogContent>
                        <DialogContentText style={{ fontFamily: 'Oxygen', fontSize: 15, color: '#7c7c7c' }}>
                            Busca tu producto favorito en comepasto.
                        </DialogContentText>
                        <MuiThemeProvider theme={theme}>
                            <TextField
                                autoFocus
                                id="busqueda"
                                type="text"
                                fullWidth
                                required
                                InputProps={{
                                    className: classes.input,
                                }}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.formTextLabel
                                    }
                                }}
                                value={values.busqueda}
                                onChange={handleChange}
                            />
                        </MuiThemeProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" style={{ fontFamily: 'Atma', fontSize: 14, color: '#7E7E7E', textDecoration: 'none' }}>
                            Cancelar
                        </Button>
                        <Button type='submit' color="primary" style={{ fontFamily: 'Atma', fontSize: 14, color: '#FFFFFF', textDecoration: 'none', backgroundColor: '#1DA3A8', paddingLeft: 15, paddingRight: 15, marginRight: 15 }}>
                            Buscar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}