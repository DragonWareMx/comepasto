import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import {
    makeStyles,
    createMuiTheme,
    MuiThemeProvider,
} from "@material-ui/core/styles";
import route from "ziggy-js";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import Layout from "../../../layouts/LayoutAdmin";
import "/css/admin.css";
import "/css/adminProductos.css";
import Alert from '@material-ui/lab/Alert';

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PublishIcon from "@material-ui/icons/Publish";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

import AgregarCosa from "../../../components/common/AgregarCosa"

const useStyles = makeStyles((theme) => ({
    input: {
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontSize: "15px",
        color: "#333333",
        borderColor: "#1DA3A8",
        "&:not(.Mui-disabled):hover::before": {
            borderColor: "#1DA3A8",
        },
    },
    formTextLabel: {
        fontFamily: "Atma",
        fontSize: "15px",
        color: "#9E9E9E",
    },
    root: {
        width: "100%",
        marginRight: "5%",
        "& .MuiOutlinedInput-input": {
            color: "#9c9c9c",
        },
        "& .MuiInputLabel-root": {
            color: "#9c9c9c",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            border: "none",
            borderRadius: "0px",
            borderBottom: "1px solid #8b8b8b",
        },
        "&:hover .MuiOutlinedInput-input": {
            color: "#1DA3A8",
        },
        "&:hover .MuiInputLabel-root": {
            color: "#1DA3A8",
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderBottom: "1px solid #1DA3A8",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "#8b8b8b",
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#8b8b8b",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
                borderColor: "#8b8b8b",
            },
    },
}));

const theme = createMuiTheme({
    palette: {
        secondary: {
            // light: will be calculated from palette.primary.main,
            main: "#ff4400",
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        primary: {
            light: "#0066ff",
            main: "#9c9c9c",
            // dark: will be calculated from palette.secondary.main,
            contrastText: "#ffcc00",
        },
        // error: will use the default color
    },
    status: {
        danger: "orange",
    },
});

const AgregarProducto = ({ marcas, tipos, categorias }) => {
    const { errors } = usePage().props;

    const handleChange = (prop) => (event) => {
        if (prop == "soyaFree" || prop == "trigoFree") {
            setValues({ ...values, [prop]: event.target.checked });
        } else {
            setValues({ ...values, [prop]: event.target.value });
        }
    };

    const classes = useStyles();

    function readURL() {
        var input = document.getElementById("foto");
        if (input.files && input.files[0]) {
            setValues((values) => ({
                ...values,
                foto: input.files[0],
            }));
            var reader = new FileReader();
            var preview = document.getElementById("imgContainer");
            reader.onload = function (e) {
                preview.src = e.target.result;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function loadImgs() {
        var input = document.getElementById("fotos");
        if (input.files && input.files[0]) {
            setValues((values) => ({
                ...values,
                fotos: input.files,
            }));
        }
    }

    const [values, setValues] = React.useState({
        foto: null,
        fotos: null,
        nombre: "",
        presentacion: "",
        precio: 0.00,
        descuento: 0.00,
        ingredientes: "",
        marca: null,
        tipo: null,
        categoria: null,
        soyaFree: false,
        trigoFree: false,
        error: false,
    });

    //manda el forumulario
    function handleSubmit(e) {
        e.preventDefault();

        Inertia.post(route("admin.producto.store"), values, {
            onError: () => {
                setValues((values) => ({
                    ...values,
                    error: true,
                }));
            },
        });
    }

    return (
        <>
            <Container>
                <Grid container style={{ paddingTop: "34px" }}>
                    {/* TOP PAGE, BACK BUTTON */}
                    <Grid item xs={12} className="top-admin">
                        <InertiaLink
                            href={route("admin.productos")}
                            className="title-page subtitle-page"
                        >
                            <ArrowBackIcon style={{ marginRight: "9px" }} />
                            Productos
                        </InertiaLink>
                    </Grid>

                    <Grid item xs={12}>
                    {
                        errors.foto &&
                        <Alert severity="error" style={{marginBottom: 10}}>{errors.foto}</Alert> 
                    }
                    </Grid>

                    <Grid item xs={12}>
                    {
                        errors.fotos &&
                        <Alert severity="error" style={{marginBottom: 10}}>{errors.fotos}</Alert> 
                    }
                    </Grid>

                    <Grid item xs={12} className="grid-section">
                        <Grid item xs={12} className="section-top-grid">
                            <Grid>Agregar producto</Grid>
                        </Grid>
                        {/* contenido */}
                        <Grid
                            item
                            xs={12}
                            style={{
                                padding: "20px",
                                display: "flex",
                                alignItems: "flex-start",
                                flexWrap: "wrap",
                            }}
                        >
                            <Grid
                                item
                                xs={4}
                                sm={2}
                                style={{
                                    marginBottom: "20px",
                                    display: "flex",
                                    justifyContent: "center",
                                    flexWrap: "wrap",
                                }}
                            >
                                <img
                                    id="imgContainer"
                                    src="/img/icons/imgDefault.png"
                                    className="img-product-view"
                                    style={{ objectFit: "cover" }}
                                />
                                <input
                                    accept="image/*"
                                    id="foto"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={readURL}
                                    />
                                <label
                                    htmlFor="foto"
                                    style={{ marginTop: "20px" }}
                                >
                                    <Button
                                        variant="contained"
                                        className="button-add"
                                        startIcon={<PublishIcon />}
                                        component="span"
                                    >
                                        Subir img
                                    </Button>
                                </label>

                                {/* VARIAS IMAGENES  */}
                                <input
                                    accept="image/*"
                                    id="fotos"
                                    type="file"
                                    style={{ display: "none" }}
                                    multiple
                                    onChange={loadImgs}
                                    />
                                <label
                                    htmlFor="fotos"
                                    style={{ marginTop: "20px" }}
                                >
                                    <Button
                                        variant="contained"
                                        className="button-add"
                                        startIcon={<PublishIcon />}
                                        component="span"
                                    >
                                        Subir imgs
                                    </Button>
                                </label>

                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sm={10}
                                className="container-inputs"
                            >
                                <form
                                    autoComplete="off"
                                    onSubmit={handleSubmit}
                                >
                                    <MuiThemeProvider theme={theme}>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="nombre"
                                                type="text"
                                                label="Nombre"
                                                className="input-admin-100"
                                                InputProps={{
                                                    className: classes.input,
                                                }}
                                                InputLabelProps={{
                                                    classes: {
                                                        root: classes.formTextLabel,
                                                    },
                                                }}
                                                onChange={handleChange(
                                                    "nombre"
                                                )}
                                                value={values.nombre}
                                                error={
                                                    errors.nombre &&
                                                    values.error == true &&
                                                    true
                                                }
                                                helperText={
                                                    values.error == true &&
                                                    errors.nombre
                                                }
                                                maxLength="100"
                                                required
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            xs={12}
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                style={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                <Autocomplete
                                                    id="marca"
                                                    options={marcas}
                                                    getOptionLabel={(option) =>
                                                        option.name
                                                    }
                                                    className="autocompleteProductos"
                                                    onChange={(
                                                        event,
                                                        newValue
                                                    ) => {
                                                        setValues({
                                                            ...values,
                                                            marca: newValue
                                                                ? newValue.id
                                                                : null,
                                                        });
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Marca"
                                                            placeholder="Selecciona una opción"
                                                            variant="outlined"
                                                            className={
                                                                classes.root
                                                            }
                                                            required
                                                        />
                                                    )}
                                                />
                                                <AgregarCosa
                                                    cosa={'marca'}
                                                    foto={true}
                                                    link={true}
                                                ></AgregarCosa>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                style={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                <Autocomplete
                                                    id="tipo"
                                                    options={tipos}
                                                    getOptionLabel={(option) =>
                                                        option.name
                                                    }
                                                    className="autocompleteProductos"
                                                    onChange={(
                                                        event,
                                                        newValue
                                                    ) => {
                                                        setValues({
                                                            ...values,
                                                            tipo: newValue
                                                                ? newValue.id
                                                                : null,
                                                        });
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Tipo"
                                                            placeholder="Selecciona una opción"
                                                            variant="outlined"
                                                            className={
                                                                classes.root
                                                            }
                                                            required
                                                        />
                                                    )}
                                                />
                                                <AgregarCosa
                                                    cosa={'tipo'}
                                                    foto={false}
                                                ></AgregarCosa>
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            item
                                            xs={12}
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                style={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                <Autocomplete
                                                    id="categoria"
                                                    options={categorias}
                                                    getOptionLabel={(option) =>
                                                        option.name
                                                    }
                                                    className="autocompleteProductos"
                                                    onChange={(
                                                        event,
                                                        newValue
                                                    ) => {
                                                        setValues({
                                                            ...values,
                                                            categoria: newValue
                                                                ? newValue.id
                                                                : null,
                                                        });
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Categoría"
                                                            placeholder="Selecciona una opción"
                                                            variant="outlined"
                                                            className={
                                                                classes.root
                                                            }
                                                            required
                                                        />
                                                    )}
                                                />

                                                <AgregarCosa
                                                    cosa={'categoria'}
                                                    foto={true}
                                                ></AgregarCosa>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                style={{ marginBottom: "20px" }}
                                            >
                                                <TextField
                                                    id="presentacion"
                                                    type="text"
                                                    label="Presentación"
                                                    className="input-admin-50"
                                                    InputProps={{
                                                        className:
                                                            classes.input,
                                                    }}
                                                    InputLabelProps={{
                                                        classes: {
                                                            root: classes.formTextLabel,
                                                        },
                                                    }}
                                                    onChange={handleChange(
                                                        "presentacion"
                                                    )}
                                                    value={values.presentacion}
                                                    maxLength="250"
                                                    error={
                                                        errors.presentacion &&
                                                        values.error == true &&
                                                        true
                                                    }
                                                    helperText={
                                                        values.error == true &&
                                                        errors.presentacion
                                                    }
                                                ></TextField>
                                            </Grid>
                                        </Grid>

                                        <Grid
                                            item
                                            xs={12}
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                style={{ marginBottom: "20px" }}
                                            >
                                                <TextField
                                                    id="precio"
                                                    type="number"
                                                    label="Precio"
                                                    className="input-admin-50"
                                                    InputProps={{
                                                        className:
                                                            classes.input,
                                                        inputProps: {min: 0, max: 999999.99, step: 0.01}
                                                    }}
                                                    InputLabelProps={{
                                                        classes: {
                                                            root: classes.formTextLabel,
                                                        },
                                                    }}
                                                    onChange={handleChange(
                                                        "precio"
                                                    )}
                                                    value={values.precio}
                                                    required   
                                                    error={
                                                        errors.precio &&
                                                        values.error == true &&
                                                        true
                                                    }
                                                    helperText={
                                                        values.error == true &&
                                                        errors.precio
                                                    }                                                
                                                ></TextField>
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                style={{ marginBottom: "20px" }}
                                            >
                                                <TextField
                                                    id="descuento"
                                                    type="number"
                                                    max="100"
                                                    label="Descuento (%)"
                                                    className="input-admin-50"
                                                    InputProps={{
                                                        className:
                                                            classes.input,
                                                        inputProps: {min: 0, max: 100.00, step: 0.01}
                                                    }}
                                                    InputLabelProps={{
                                                        classes: {
                                                            root: classes.formTextLabel,
                                                        },
                                                    }}
                                                    onChange={handleChange(
                                                        "descuento"
                                                    )}
                                                    value={values.descuento}
                                                    required
                                                    error={
                                                        errors.descuento &&
                                                        values.error == true &&
                                                        true
                                                    }
                                                    helperText={
                                                        values.error == true &&
                                                        errors.descuento
                                                    }
                                                ></TextField>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                id="ingredientes"
                                                multiline
                                                label="Ingredientes"
                                                className="input-admin-100"
                                                InputProps={{
                                                    className: classes.input,
                                                }}
                                                InputLabelProps={{
                                                    classes: {
                                                        root: classes.formTextLabel,
                                                    },
                                                }}
                                                onChange={handleChange(
                                                    "ingredientes"
                                                )}
                                                value={values.ingredientes}
                                                error={
                                                    errors.ingredientes &&
                                                    values.error == true &&
                                                    true
                                                }
                                                helperText={
                                                    values.error == true &&
                                                    errors.ingredientes
                                                }
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            values.soyaFree
                                                        }
                                                        className="checkbox-admin"
                                                        onChange={handleChange(
                                                            "soyaFree"
                                                        )}
                                                        name="checkedA"
                                                    />
                                                }
                                                id="soyaFree"
                                                label="Producto libre de soya"
                                                className="checkbox-label"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            values.trigoFree
                                                        }
                                                        className="checkbox-admin"
                                                        onChange={handleChange(
                                                            "trigoFree"
                                                        )}
                                                        name="checkedB"
                                                    />
                                                }
                                                id="trigoFree"
                                                label="Producto libre de gluten"
                                                className="checkbox-label"
                                            />
                                        </Grid>

                                        <Grid
                                            className="input-admin-100"
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                alignItems: "center",
                                                padding: "8px 24px",
                                                marginBottom: "10px",
                                                paddingRight: "0px",
                                                marginTop: "20px",
                                            }}
                                        >
                                            <InertiaLink
                                                href={route("admin.productos")}
                                                className="btn-cancelar-op"
                                            >
                                                CANCELAR
                                            </InertiaLink>
                                            <Button
                                                className="button-filter button-update btn-second"
                                                type="submit"
                                                startIcon={
                                                    <ArrowRightAltIcon />
                                                }
                                            >
                                                Guardar
                                            </Button>
                                        </Grid>
                                    </MuiThemeProvider>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

AgregarProducto.layout = (page) => (
    <Layout
        children={page}
        title="Comepasto - Productos"
        pageTitle="Productos"
    />
);

export default AgregarProducto;
