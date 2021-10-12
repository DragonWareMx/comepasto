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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
    DataGrid,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
  } from '@material-ui/data-grid';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

//iconos
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';

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

const useStylesSearch = makeStyles(
    (theme) => ({
        root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        },
        textField: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        margin: theme.spacing(1, 0.5, 1.5),
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(0.5),
        },
        '& .MuiInput-underline:before': {
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        },
    }),
);

const columns = [
{ field: 'id', headerName: 'ID', flex: 0.4 },
{
    field: 'fecha',
    headerName: 'FECHA',
    flex: 0.7,
    editable: false,
    disableColumnSelector:false,
},
{
    field: 'cliente',
    headerName: 'CLIENTE',
    flex: 1,
    editable: false,
},
{
    field: 'status',
    headerName: 'ESTATUS',
    flex: 0.5,
    editable: false,
},
{
    field: 'entrega',
    headerName: 'TIPO DE ENTREGA',
    flex: 0.5,
    editable: false,
},
{
    field: 'total',
    headerName: 'TOTAL',
    flex: 0.5,
    editable: false,
    valueFormatter: (params) => {
        const precio = parseFloat(params.value).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
        return `$ ${precio}`;
    },
},
{
    field: 'costoEnvio',
    headerName: 'COSTO ENVÍO',
    flex: 0.5,
    editable: false,
    valueFormatter: (params) => {
        const precio = parseFloat(params.value).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
        return `$ ${precio}`;
    },
},
{
    field: 'formaPago',
    headerName: 'FORMA DE PAGO',
    flex: 0.5,
    editable: false,
},
{
    field: "",
    headerName: "EDITAR",
    flex: 0.4,
    renderCell: (params) => (
      <InertiaLink href={route('admin.pedido', params.row.id)} style={{textDecoration: 'none', color: 'gray'}}><EditIcon/></InertiaLink>
    ),
    sortable: false,
    editable: false,
  }
]; 

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function QuickSearchToolbar(props) {
    const classes = useStylesSearch();

    const [checked, setChecked] = React.useState(false);
  
    const handleChange = (event) => {
      setChecked(event.target.checked);

      Inertia.reload({data: {deleted: event.target.checked}})
    };
  
    return (
      <div className={classes.root}>
        <div>
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />

          <Grid style={{margin: 4}} >
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Ver eliminados"
            />
          </Grid>

        </div>
        <TextField
          variant="standard"
          value={props.value}
          onChange={props.onChange}
          placeholder="Search…"
          className={classes.textField}
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: props.value ? 'visible' : 'hidden' }}
                onClick={props.clearSearch}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
        />
      </div>
    );
}
  
QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

const Pedidos = ({total,ganancias, pedidos, pedidos_completados, pedidos_pendientes}) => {
    //buscador
    const [searchText, setSearchText] = React.useState('');
    const [rows, setRows] = React.useState(pedidos);

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = pedidos.filter((row) => {
          return Object.keys(row).some((field) => {
            return searchRegex.test(row[field].toString());
          });
        });
        setRows(filteredRows);
    };

    React.useEffect(() => {
      setRows(pedidos);
    }, [pedidos]);

    function showPrice(precio, descuento){
        if(descuento){
            var fPrecio = parseFloat(precio);
            var fDescuento = parseFloat(descuento)

            var nPrecio = fPrecio - (fPrecio * (fDescuento/100))

            if(nPrecio < 0)
                nPrecio = 0

            return nPrecio.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
        }
        else{
            return parseFloat(precio).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
        }
    }

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
                            <Grid item={12} className="txt-item-resume">$ {showPrice(ganancias, null)} MXN</Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} className="item-resume">
                        <Grid item xs={2}><CheckCircleOutlineOutlinedIcon style={{color:'#27AB6E'}} /></Grid>
                        <Grid item xs={10}>
                        <Tooltip title="Total de pedidos completados exitosamente"><Grid item={12} className="title-item-resume">PEDIDOS COMPLETADOS</Grid></Tooltip>
                            <Grid item={12} className="txt-item-resume">{pedidos_completados}</Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} className="item-resume">
                        <Grid item xs={2}><HighlightOffOutlinedIcon style={{color:'#D9822B'}} /></Grid>
                        <Grid item xs={10}>
                        <Tooltip title="Total de pedidos en espera"><Grid item={12} className="title-item-resume">PEDIDOS PENDIENTES</Grid></Tooltip>
                            <Grid item={12} className="txt-item-resume">{pedidos_pendientes}</Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Este height es provisional */}
                <Grid item xs={12} style={{height:800, marginBottom: 50}}>
                    <DataGrid
                        components={{ Toolbar: QuickSearchToolbar }}
                        rows={rows}
                        columns={columns}
                        pageSize={15}
                        rowsPerPageOptions={[15]}
                        disableSelectionOnClick
                        componentsProps={{
                            toolbar: {
                            value: searchText,
                            onChange: (event) => requestSearch(event.target.value),
                            clearSearch: () => requestSearch(''),
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
        
    </>
    )
}


Pedidos.layout = page => <Layout children={page} title="Comepasto - Pedidos" pageTitle="Pedidos" />

export default Pedidos