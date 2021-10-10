// import React, { useEffect, useState } from 'react';
import * as React from 'react';
import { Inertia } from '@inertiajs/inertia'
import { makeStyles } from '@material-ui/core/styles';
import route from 'ziggy-js';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../layouts/LayoutAdmin';
import '/css/admin.css';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
    DataGrid,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
  } from '@material-ui/data-grid';

//iconos
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import ClearIcon from '@material-ui/icons/Clear';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

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
{ field: 'id', headerName: 'ID', width: 90 },
{
    field: 'nombre',
    headerName: 'NOMBRE',
    width: 220,
    editable: false,
    disableColumnSelector:false,
},
{
    field: 'telefono',
    headerName: 'TELÉFONO',
    width: 200,
    editable: false,
},
{
    field: 'correo',
    headerName: 'CORREO',
    // type: 'number',
    width: 200,
    editable: false,
},
{
    field: 'registro',
    headerName: 'FECHA DE REGISTRO',
    width: 200,
    editable: false,
},
{
    field: 'total',
    headerName: 'TOTAL',
    description: 'PEDIDOS REALIZADOS',
    width: 180,
    editable: false,
},
{
  field: "",
  headerName: "EDITAR",
  flex: 0.5,
  width:50,
  renderCell: (params) => (
    <InertiaLink href={route('admin.cliente', params.row.id)} style={{textDecoration: 'none', color: 'gray'}}><EditIcon/></InertiaLink>
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
  
    return (
      <div className={classes.root}>
        <div>
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
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

const Clientes = ({clients}) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    //buscador
    const [searchText, setSearchText] = React.useState('');
    const [rows, setRows] = React.useState(clients);

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = clients.filter((row) => {
          return Object.keys(row).some((field) => {
            return searchRegex.test(row[field].toString());
          });
        });
        setRows(filteredRows);
    };

    React.useEffect(() => {
      setRows(clients);
    }, [clients]);
    
    return ( 
        <>
        <Container> 
            <Grid container style={{paddingTop:'34px'}}>
                {/* TOP PAGE, TITTLE AND ADD BUTTON */}
                <Grid item xs={12} className="top-admin">
                    <Grid className="title-page">CLIENTES</Grid>
                </Grid>

                {/* CONTENIDO GENERAL */}
                <Grid item xs={12} style={{height:'500px'}}>
                    <DataGrid
                        components={{ Toolbar: QuickSearchToolbar }}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
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


Clientes.layout = page => <Layout children={page} title="Comepasto - Clientes" pageTitle="Clientes" />

export default Clientes