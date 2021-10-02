import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import {
    withStyles,
    makeStyles,
    createMuiTheme,
    MuiThemeProvider,
} from "@material-ui/core/styles";
import route from "ziggy-js";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import Layout from "../../../layouts/LayoutAdmin";
import ModalConfirmacion from "../../../components/common/modalConfirmacion";
import "/css/admin.css";
import "/css/adminProductos.css";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PublishIcon from "@material-ui/icons/Publish";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

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

    const handleDelete = (chipToDelete) => () => {
        setValues({
            ...values,
            categorias: values.categorias.filter(
                (chip) => chip.id !== chipToDelete.id
            ),
        });
    };

    // MODAL AGREGAR MARCA
    const [openMarca, setOpenMarca] = React.useState(false);

    const handleClickOpenModalMarca = () => {
        setOpenMarca(true);
    };

    const handleCloseModalMarca = () => {
        setOpenMarca(false);
    };

    // MODAL AGREGAR TIPO
    const [openTipo, setOpenTipo] = React.useState(false);

    const handleClickOpenModalTipo = () => {
        setOpenTipo(true);
    };

    const handleCloseModalTipo = () => {
        setOpenTipo(false);
    };

    // MODAL AGREGAR CATEGORIA
    const [openCat, setOpenCat] = React.useState(false);

    const handleClickOpenModalCat = () => {
        setOpenCat(true);
    };

    const handleCloseModalCat = () => {
        setOpenCat(false);
    };

    const handleChange = (prop) => (event) => {
        if (prop == "soyaFree" || prop == "trigoFree") {
            setValues({ ...values, [prop]: event.target.checked });
        } else {
            setValues({ ...values, [prop]: event.target.value });
        }
    };

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState("sm");

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

    const [values, setValues] = React.useState({
        foto: null,
        nombre: "",
        presentacion: "",
        precio: "",
        descuento: "",
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
                                                        />
                                                    )}
                                                />
                                                <Grid
                                                    className="link-add-bd"
                                                    onClick={
                                                        handleClickOpenModalMarca
                                                    }
                                                >
                                                    Agregar marca
                                                </Grid>
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
                                                        />
                                                    )}
                                                />
                                                <Grid
                                                    className="link-add-bd"
                                                    onClick={
                                                        handleClickOpenModalTipo
                                                    }
                                                >
                                                    Agregar tipo
                                                </Grid>
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
                                                        />
                                                    )}
                                                />

                                                <Grid
                                                    className="link-add-bd"
                                                    onClick={
                                                        handleClickOpenModalCat
                                                    }
                                                >
                                                    Agregar categoría
                                                </Grid>
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

            {/* MODAL AGREGAR MARCA */}
            <Dialog
                open={openMarca}
                onClose={handleCloseModalMarca}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <form noValidate autoComplete="off">
                    <DialogTitle className="title-dialog">
                        {"Agregar marca"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-description"
                            className="dialog-content"
                        >
                            <MuiThemeProvider>
                                <Grid
                                    item
                                    xs={12}
                                    style={{ marginBottom: "20px" }}
                                >
                                    <TextField
                                        id="newMarca"
                                        type="text"
                                        label="Nombre"
                                        style={{ width: "100%" }}
                                        InputProps={{
                                            className: classes.input,
                                        }}
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.formTextLabel,
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "15px",
                                    }}
                                >
                                    <img
                                        src="/img/icons/imgDefault.png"
                                        style={{
                                            marginRight: "15px",
                                            width: "30%",
                                            minWidth: "80px",
                                            maxHeight: "150px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <input
                                        accept="image/*"
                                        id="imgNewMarca"
                                        type="file"
                                        style={{ display: "none" }}
                                    />
                                    <label
                                        htmlFor="imgNewMarca"
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
                                </Grid>
                            </MuiThemeProvider>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Grid
                            item
                            xs={12}
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                padding: "8px 24px",
                                marginBottom: "10px",
                            }}
                        >
                            <Grid
                                className="btn-cancelar-op"
                                onClick={handleCloseModalMarca}
                            >
                                CANCELAR
                            </Grid>
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

            {/* MODAL AGREGAR TIPO */}
            <Dialog
                open={openTipo}
                onClose={handleCloseModalTipo}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <form noValidate autoComplete="off">
                    <DialogTitle className="title-dialog">
                        {"Agregar tipo"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-description"
                            className="dialog-content"
                        >
                            <MuiThemeProvider>
                                <Grid
                                    item
                                    xs={12}
                                    style={{ marginBottom: "20px" }}
                                >
                                    <TextField
                                        id="newTipo"
                                        type="text"
                                        label="Nombre"
                                        style={{ width: "100%" }}
                                        InputProps={{
                                            className: classes.input,
                                        }}
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.formTextLabel,
                                            },
                                        }}
                                    />
                                </Grid>
                            </MuiThemeProvider>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Grid
                            item
                            xs={12}
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                padding: "8px 24px",
                                marginBottom: "10px",
                            }}
                        >
                            <Grid
                                className="btn-cancelar-op"
                                onClick={handleCloseModalTipo}
                            >
                                CANCELAR
                            </Grid>
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

            {/* MODAL AGREGAR CATEGORIA */}
            <Dialog
                open={openCat}
                onClose={handleCloseModalCat}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <form noValidate autoComplete="off">
                    <DialogTitle className="title-dialog">
                        {"Agregar categoría"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-description"
                            className="dialog-content"
                        >
                            <MuiThemeProvider>
                                <Grid
                                    item
                                    xs={12}
                                    style={{ marginBottom: "20px" }}
                                >
                                    <TextField
                                        id="newCat"
                                        type="text"
                                        label="Nombre"
                                        style={{ width: "100%" }}
                                        InputProps={{
                                            className: classes.input,
                                        }}
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.formTextLabel,
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "15px",
                                    }}
                                >
                                    <img
                                        src="/img/icons/imgDefault.png"
                                        style={{
                                            marginRight: "15px",
                                            width: "30%",
                                            minWidth: "80px",
                                            maxHeight: "150px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <input
                                        accept="image/*"
                                        id="imgNewCat"
                                        type="file"
                                        style={{ display: "none" }}
                                    />
                                    <label
                                        htmlFor="imgNewCat"
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
                                </Grid>
                            </MuiThemeProvider>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Grid
                            item
                            xs={12}
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                padding: "8px 24px",
                                marginBottom: "10px",
                            }}
                        >
                            <Grid
                                className="btn-cancelar-op"
                                onClick={handleCloseModalCat}
                            >
                                CANCELAR
                            </Grid>
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
