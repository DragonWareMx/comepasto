// import React, { useEffect, useState } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia'
import { withStyles, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import route from 'ziggy-js';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../layouts/LayoutAdmin';

import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import axios from 'axios';

import '/css/admin.css';
import '/css/adminBanners.css';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import PublishIcon from '@material-ui/icons/Publish';
import DeleteIcon from '@material-ui/icons/Delete';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { IdealBankElement } from '@stripe/react-stripe-js';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        //   padding: theme.spacing(2),
        textAlign: 'center',
        border: 'none !important',
        boxShadow: 'none !important',
        //   backgroundColor:'black',
        height: '240px',
    },
    delete: {
        "&:hover": {
            color: "red"
        }
    },
    btnDelete: {
        color: 'red',
        borderColor: 'red'
    }
}));


const Banners = ({ banners }) => {
    const classes = useStyles();

    const [items, setItems] = useState(banners);

    const inputBanner = useRef(null)
    const finalPagina = useRef(null)
    const handleClick = () => {
        inputBanner.current.click()
    }

    const [values, setValues] = useState({
        foto: null
    })

    function readURL(e) {
        var input = inputBanner.current
        if (input.files && input.files[0]) {
            setValues((values) => ({
                ...values,
                foto: input.files[0],
            }));
        }
    }

    useEffect(() => {
        if (values.foto) {
            handleSubmit();
        }
    }, [values])

    function handleSubmit() {
        Inertia.post(route("admin.banners.new"), values, {
            preserveScroll: true,
            onSuccess: () => {
                //Inertia.replace('/admin/banners')
                axios.get('/admin/banners').then(response => {
                    setItems(items => ([
                        ...items, response.data
                    ]))
                    finalPagina.current?.scrollIntoView({ behavior: "smooth" })
                }).catch(function (error) {
                    setItems(items => ([
                        ...items
                    ]))
                });
            },
            onError: () => {

            },
        });
    }



    //De aqui para abajo es lo del sorteable
    const SortableItem = sortableElement(({ value }) => {
        return (
            <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>
                    <IconButton
                        aria-label="delete"
                        style={{ position: 'absolute', zIndex: '999', color: 'white' }}
                        onClick={handleClickOpenModal(value.id)}>
                        <DeleteIcon className={classes.delete} />
                    </IconButton>
                    <img src={"/storage/banners/" + value.url} className="banner" />
                </Paper>
            </Grid>
        )
    });

    const SortableList = sortableContainer(({ items }) => {
        return (
            <Grid container spacing={3} alignItems="stretch">
                <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper} style={{ backgroundColor: 'transparent' }}>
                        <input
                            accept="image/*"
                            ref={inputBanner}
                            type="file"
                            onChange={readURL}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="contained-button-file" style={{ marginTop: '20px' }}>
                            <Button variant="contained" className="button-add button-banner" startIcon={<PublishIcon />} component="span" onClick={handleClick}>
                                AGREGAR BANNER
                            </Button>
                        </label>
                    </Paper>
                </Grid>
                {
                    items.map((value, index) => (
                        <SortableItem key={`item-${index}`} index={index} value={value} distance={2} />
                    ))
                }
            </Grid >
        );
    });

    const [bandera, setBandera] = useState(false);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems(arrayMoveImmutable(items, oldIndex, newIndex));
        setBandera(true);
    };

    useEffect(() => {
        if (bandera) {
            handleOrdenar();
        }
    }, [bandera])

    //de aqui pa abajo es lo de la eliminación
    const [open, setOpen] = React.useState(false);

    const [id, setId] = useState(null)

    const handleClickOpenModal = (prop) => (event) => {
        setOpen(true);
        setId(prop);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    function handleDelete(e) {
        e.preventDefault();
        handleCloseModal();
        Inertia.delete(route('admin.banners.delete', id), {
            preserveScroll: true,
            onSuccess: () => {
                axios.post('/admin/banners/recienborrados').then(response => {
                    setItems(items => (
                        response.data
                    ))
                }).catch(function (error) {
                    setItems(items => ([
                        ...items
                    ]))
                });
            },
            onError: () => {

            }
        })
    }

    function handleOrdenar() {
        Inertia.post(route('admin.banners.ordenar'), { cards: items }, {
            preserveScroll: true,
            onSuccess: () => {
                setBandera(false);
            },
            onError: () => {

            }
        });
    }

    return (
        <>
            <Container>
                <Grid container style={{ paddingTop: '34px' }}>
                    {/* TOP PAGE, TITTLE AND ADD BUTTON */}
                    <Grid item xs={12} className="top-admin">
                        <Grid className="title-page">BANNERS</Grid>
                    </Grid>

                    {/* CONTENIDO GENERAL */}
                    <Grid item xs={12} style={{ marginBottom: '25px', borderRadius: '4px', border: '1px solid #E1E3EA', padding: '20px', marginBottom: '50px' }}>
                        <SortableList
                            axis="xy"
                            items={items}
                            distance={2}
                            onSortEnd={onSortEnd}
                        />
                        <div ref={finalPagina} />
                    </Grid>
                </Grid>
            </Container>


            <Dialog
                open={open}
                onClose={handleCloseModal}
            >
                <DialogTitle className="title-dialog" style={{ color: 'red' }}>{"¿Estás seguro que deseas eliminar este banner?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className="dialog-content">
                        No se podrá recuperar de ninguna forma.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <form noValidate autoComplete="off">
                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '8px 24px', marginBottom: '10px' }}>
                            <Grid className="btn-cancelar-op" onClick={handleCloseModal}>CANCELAR</Grid>
                            <Button
                                className={classes.btnDelete}
                                type="submit"
                                startIcon={<DeleteOutlineIcon />}
                                onClick={handleDelete}
                            >
                                Eliminar
                            </Button>
                        </Grid>
                    </form>
                </DialogActions>
            </Dialog>

        </>
    )
}


Banners.layout = page => <Layout children={page} title="Comepasto - Banners" pageTitle="Banners" />

export default Banners