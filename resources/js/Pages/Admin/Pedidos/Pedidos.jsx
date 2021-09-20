// import React, { useEffect, useState } from 'react';
import * as React from 'react';
import { Inertia } from '@inertiajs/inertia'
import { makeStyles } from '@material-ui/core/styles';
import route from 'ziggy-js';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../layouts/LayoutAdmin';
import '/css/admin.css';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {DataGrid}  from '@material-ui/data-grid';

import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';

const useStyles = makeStyles((theme) => ({
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

const columns = [
{ field: 'id', headerName: 'ID', width: 90 },
{
    field: 'fecha',
    headerName: 'FECHA',
    width: 200,
    editable: false,
    disableColumnSelector:false,
},
{
    field: 'cliente',
    headerName: 'CLIENTE',
    width: 350,
    editable: false,
},
// {
//     field: 'estatus',
//     headerName: 'ESTATUS',
//     // type: 'number',
//     width: 200,
//     editable: false,
// },
{
    field: 'entrega',
    headerName: 'TIPO DE ENTREGA',
    width: 200,
    editable: false,
},
{
    field: 'total',
    headerName: 'TOTAL',
    description: 'No es posible reordenar esta columna.',
    sortable: false,
    width: 180,
    editable: false,
},
]; 

const Pedidos = ({total,ganancias, pedidos}) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    // const rows = [
    //     { id: 1, fecha: '20/08/2021 09:32', cliente: 'Lorem ipsum dolor sit amet', estatus: 'En camino', entrega:'A domicilio', total:'$240.00 MXN' },
    //   ];

    const rows = pedidos;


    return ( 
        <>
        <Container> 
            <Grid container style={{paddingTop:'34px'}}>
                {/* TOP PAGE, TITTLE AND ADD BUTTON */}
                <Grid item xs={12} className="top-admin">
                    <Grid className="title-page">PEDIDOS</Grid>
                    <InertiaLink href={route('admin.pedidos.agregar')} style={{textDecoration:'none'}}>
                    <Button
                        variant="contained"
                        className="button-add"
                        startIcon={<AddCircleOutlineIcon />}
                    >
                        Agregar
                    </Button>
                    </InertiaLink>
                </Grid>

                {/* Grids de resumen */}
                <Grid item xs={12} className="grid-resume">
                    <Grid item xs={12} sm={6} md={3} className="item-resume">
                        <Grid item xs={2}><LocalShippingIcon style={{color:'#1DA3A8'}} /></Grid>
                        <Grid item xs={10}>
                            <Tooltip title="Total de pedidos registrados"><Grid item={12} className="title-item-resume">TOTAL DE PEDIDOS</Grid></Tooltip>
                            <Grid item={12} className="txt-item-resume">{total}</Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} className="item-resume">
                        <Grid item xs={2}><MonetizationOnOutlinedIcon style={{color:'#1DA3A8'}} /></Grid>
                        <Grid item xs={10}>
                        <Tooltip title="Valor total de los pedidos realizados"><Grid item={12} className="title-item-resume">TOTAL EN PEDIDOS</Grid></Tooltip>
                            <Grid item={12} className="txt-item-resume">$ {ganancias} MXN</Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} className="item-resume">
                        <Grid item xs={2}><CheckCircleOutlineOutlinedIcon style={{color:'#27AB6E'}} /></Grid>
                        <Grid item xs={10}>
                        <Tooltip title="Total de pedidos completados exitosamente"><Grid item={12} className="title-item-resume">PEDIDOS COMPLETADOS</Grid></Tooltip>
                            <Grid item={12} className="txt-item-resume">241</Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} className="item-resume">
                        <Grid item xs={2}><HighlightOffOutlinedIcon style={{color:'#D9822B'}} /></Grid>
                        <Grid item xs={10}>
                        <Tooltip title="Total de pedidos en espera"><Grid item={12} className="title-item-resume">PEDIDOS PENDIENTES</Grid></Tooltip>
                            <Grid item={12} className="txt-item-resume">5</Grid>
                        </Grid>
                    </Grid>
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
                                <MenuItem onClick={handleClose}>Cliente</MenuItem>
                                <MenuItem onClick={handleClose}>Estatus</MenuItem>
                                <MenuItem onClick={handleClose}>Tipo de entrega</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                    {/* Este height es provisional */}
                    <Grid item xs={12} style={{height:'300px'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                    </Grid>

                </Grid>
            </Grid>
        </Container>
        
    </>
    )
}


Pedidos.layout = page => <Layout children={page} title="Comepasto - Pedidos" pageTitle="Pedidos" />

export default Pedidos