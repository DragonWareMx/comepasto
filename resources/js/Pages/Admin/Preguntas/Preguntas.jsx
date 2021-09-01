// import React, { useEffect, useState } from 'react';
import * as React from 'react';
import { Inertia } from '@inertiajs/inertia'
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import route from 'ziggy-js';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../layouts/LayoutAdmin';
import '/css/admin.css';
import '/css/adminPreguntas.css';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import PublishIcon from '@material-ui/icons/Publish';

const theme = createMuiTheme({
    palette: {
        secondary: {
            // light: will be calculated from palette.primary.main,
            main: '#ff4400',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        primary: {
            light: '#0066ff',
            main: '#9c9c9c',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // error: will use the default color
    },
    status: {
        danger: 'orange',
    },
});

const currencies = [
    {
      value: '1',
      label: 'Productos',
    },
    {
      value: '2',
      label: 'Pagos',
    },
    {
      value: '3',
      label: 'Envios',
    },
  ];

const useStyles = makeStyles((theme) => ({
    input: {
        fontFamily: "Oxygen",
        fontStyle: 'normal',
        fontSize: '15px',
        color: '#333333',
        borderColor: "#1DA3A8",
        "&:not(.Mui-disabled):hover::before": {
            borderColor: "#1DA3A8"
        }
    },
    formTextLabel: {
        fontFamily: 'Atma',
        fontSize: '15px',
        color: '#9E9E9E'
    },
    search: {
      position: 'relative',
      display:'flex',
      alignItems:'center',
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      color:'#636363',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: '#636363',
      fontSize:'14px',
      fontFamily:'Oxygen',
      width:'100%',
      padding:'5px',
      border: '1px solid #E1E3EA',
      borderRadius: theme.shape.borderRadius,
      transition:'all ease-in-out 0.25s',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
    //   [theme.breakpoints.up('md')]: {
    //     width: '20ch',
    //   },
    },
  }));


const Preguntas = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // MODAL AGREGAR PREGUNTA
    const [openMarca, setOpenMarca] = React.useState(false);

    const handleClickOpenModalMarca = () => {
        setOpenMarca(true);
    };

    const handleCloseModalMarca = () => {
        setOpenMarca(false);
    };

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    
    return ( 
        <>
        <Container> 
            <Grid container style={{paddingTop:'34px'}}>
                {/* TOP PAGE, TITTLE AND ADD BUTTON */}
                <Grid item xs={12} className="top-admin">
                    <Grid className="title-page">PREGUNTAS</Grid>
            
                    <Button
                        variant="contained"
                        className="button-add"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleClickOpenModalMarca}
                    >
                        Agregar
                    </Button>
                </Grid> 

                {/* CONTENIDO GENERAL */}
                <Grid item xs={12} style={{marginBottom:'25px', borderRadius:'4px', border:'1px solid #E1E3EA'}}>
                    <Grid item xs={12} style={{padding:'26px',display:'flex',alignItems:'stretch',justifyContent:'space-between'}}>
                        <Grid item xs={10}>     
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon style={{fontSize:'22px'}} />
                                </div>
                                <InputBase
                                placeholder="Buscar..."
                                className="input-search"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </Grid>
                        <Grid>
                            <Button
                                className="button-filter"
                                onClick={handleClick}
                                startIcon={<FilterListIcon />}
                            >
                                Filtrar
                            </Button>
                            <Menu
                                id="filter-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Título</MenuItem>
                                <MenuItem onClick={handleClose}>Categoría</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                    
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} style={{backgroundColor:'transparent',borderBottom:'1px solid #E1E3EA'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            >
                            <div className="title-pregunta">¿Todos los productos de la tienda son veganos?</div>
                        </AccordionSummary>
                        <AccordionDetails style={{display:'flex',flexWrap:'wrap'}}>
                            <Grid item xs={12} className="categoria-txt">NOMBRE DE LA CATEGORÍA</Grid>
                            <Grid item xs={12} className="respuesta-txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Grid>
                            <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                                <Grid style={{width:'135px',marginRight:'10px'}}>
                                    <form>
                                    <InertiaLink href="#!" style={{textDecoration:'none'}}>
                                    <Button
                                        className="button-filter"
                                        startIcon={<DeleteOutlineIcon />}
                                        type="submit"
                                    >
                                        Eliminar
                                    </Button>
                                    </InertiaLink>
                                    </form>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} style={{backgroundColor:'transparent'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                            >
                            <div className="title-pregunta">¿Todos los productos de la tienda son veganos?</div>
                        </AccordionSummary>
                        <AccordionDetails style={{display:'flex',flexWrap:'wrap'}}>
                            <Grid item xs={12} className="categoria-txt">NOMBRE DE LA CATEGORÍA</Grid>
                            <Grid item xs={12} className="respuesta-txt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Grid>
                            <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end'}}>
                                <Grid style={{width:'135px',marginRight:'10px'}}>
                                    <form>
                                    <InertiaLink href="#!" style={{textDecoration:'none'}}>
                                    <Button
                                        className="button-filter"
                                        startIcon={<DeleteOutlineIcon />}
                                        type="submit"
                                    >
                                        Eliminar
                                    </Button>
                                    </InertiaLink>
                                    </form>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                </Grid>
            </Grid>
        </Container>

        {/* MODAL AGREGAR PREGUNTA */}
        <Dialog
            open={openMarca}
            onClose={handleCloseModalMarca}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
        >
        <form noValidate autoComplete="off">
            <DialogTitle  className="title-dialog">{"Agregar pregunta"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" className="dialog-content">
                <MuiThemeProvider>
                <Grid item xs={12} style={{marginBottom:'20px'}}>
                    <TextField
                        id="categorias"
                        select
                        label="Categorías"
                        style={{width:'100%'}}
                        InputProps={{className: classes.input,}}
                        InputLabelProps={{
                            classes: {
                                root: classes.formTextLabel
                            }
                        }}
                        >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} style={{marginBottom:'20px'}}>
                    <TextField 
                        id="titulo" 
                        type="text"
                        label="Título" 
                        style={{width:'100%'}}
                        InputProps={{className: classes.input,}}
                        InputLabelProps={{
                            classes: {
                                root: classes.formTextLabel
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12} style={{marginBottom:'20px'}}>
                    <TextField 
                        id="respuesta" 
                        multiline
                        label="Respuesta" 
                        style={{width:'100%'}}
                        InputProps={{className: classes.input,}}
                        InputLabelProps={{
                        classes: {
                            root: classes.formTextLabel
                        }
                        }}
                    />
                </Grid>
                </MuiThemeProvider>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid item xs={12} style={{display:'flex',justifyContent:'flex-end',alignItems:'center',padding:'8px 24px',marginBottom:'10px'}}>
                    <Grid className="btn-cancelar-op" onClick={handleCloseModalMarca}>CANCELAR</Grid>
                    <Button
                        className="button-filter button-update btn-second"
                        type="submit"
                        startIcon={<ArrowRightAltIcon />}
                    >
                        Agregar
                    </Button>
                </Grid>
            </DialogActions>
        </form>
        </Dialog>
        
    </>
    )
}


Preguntas.layout = page => <Layout children={page} title="Comepasto - Preguntas" pageTitle="Preguntas" />

export default Preguntas