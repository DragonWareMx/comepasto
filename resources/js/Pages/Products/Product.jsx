import React from 'react';
import Layout from '../../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { CircularProgress, Divider, Hidden, IconButton, Paper, OutlinedInput, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from 'react-loading-skeleton'; 
import Button from "@material-ui/core/Button";
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import OwlCarousel from 'react-owl-carousel'; 
import Alert from '@material-ui/lab/Alert';
import AlertTitle  from '@material-ui/lab/AlertTitle';

import route from 'ziggy-js';

//iconos
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


//css
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';
import '../../../../public/css/owlProduct.css'

//componentes
import ImageCarousel from '../../components/Products/ImageCarousel'
import AsyncImage from '../../components/common/AsyncImage';
import ProductComponent from '../../components/Products/Product'
import Receta from '../../components/Recetas/Receta';


const useStyles = makeStyles((theme) => ({
    name: {
        fontFamily: "Atma",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "30px",
        lineHeight: "49px",

        color: "#1DA3A8",
    },
    paper: {
        border: "1px solid #E3E3E3",
        backgroundColor: "transparent",

        width: "100%",
        '&:hover':{
            border: "1px solid #1DA3A8",
        },
        position: "relative"
    },
    price:{
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "20px",
        lineHeight: "25px",

        color: "#1DA3A8",
    },
    discount:{
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "16px",
        lineHeight: "20px",
        textDecorationLine: "line-through",

        color: "#9C9C9C",
    },
    text: {
        fontFamily: "Oxygen",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "17px",
        lineHeight: "21px",

        color: "#595959",

        width: "fit-content",
    },
    iconoFree:{
        width: "40px",
        height: "40px",
        filter: "invert(46%) sepia(20%) saturate(2938%) hue-rotate(142deg) brightness(104%) contrast(77%)",
    },
    textFree: {
        fontFamily: "Atma",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "15px",

        color: "#A7A7A7",
        maxWidth: "135px",
        textAlign: "center",      
    },
    logo:{
        width: "89px",
        height: "62px",
        marginTop: "4px"
    },
    inputSinFlechasProduct: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },
        "& input:focus": {
            outline: "none"
        },
        "& input":{
            width: "auto",
            textAlign: "center"
        },
        '& fieldset': {
            border: "1px solid #E3E3E3",
        },
        
        width: '150px',
        height: '38px',
        
        paddingLeft: 0,
        paddingRight: 0,
        marginTop: "30px",
        marginBottom: "20px",
        
        fontFamily: 'Oxygen',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '18px',
        color: "#595959",
    },

    inertiaButtonPlusRemove: {
        width: "fit-content",
        height: "fit-content",
        backgroundColor: "transparent",
        padding: "0px",
        border: "none"
    },

    button: {
        background: 'transparent',
        color: '#9F9F9F',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '13px',
        lineHeight: '21px',

        width: '220px',
        height: '38px',

        border: "1px solid #E3E3E3",

        '&:hover': {
            background: '#1DA3A8',
            color: '#FFFFFF',
        },
    },
    inertiaButton: {
        width: "fit-content",
        height: "fit-content",
        backgroundColor: "transparent",
        marginTop: "30px",
        marginBottom: "20px",
        padding: "0px",
        border: "none"
    },
    carouselTittle: {
        fontFamily: "Atma",
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: "20px",
        lineHeight: "32px",

        color: "#1DA3A8",

        marginBottom: "30px"
    },
}));

const Product = ({ product, products, recipes }) => {
    const classes = useStyles();
    const { auth } = usePage().props

    const skeletonLogo = <div style={{margin: "auto"}}>
        <Skeleton width={89} 
            height={62}
        />
    </div>

    //muestra el precio del producto con o sin descuento
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

    //devuelve la cantidad de un producto en el carrito
    function cantidadProducto(id){
        if(auth && auth.cart && auth.cart.length > 0){
            var cantidad = 0
            auth.cart.forEach(productInCart => {
                if(productInCart.id == id){
                    cantidad = productInCart.pivot.cantidad
                    return
                }
            });
            return cantidad
        }

        return 0
    }

    function capitalize(word){
        const lower = word.toLowerCase()
        return word.charAt(0).toUpperCase() + lower.slice(1)
    }

    const responsiveProducto = {
        0: {
            items: 1,
        },
        520: {
            items: 2,
        },
        700: {
            items: 2,
            margin: 70
        },
        900: {
            items: 3,
            margin: 30
        },
        1100: {
            items: 4,
        } 
    }

    const responsiveRecetas = {
        0: {
            items: 1,
        },
        600: {
            items: 2,
        },
        800: {
            items: 2,
            margin: 70
        },
        980: {
            items: 3,
            margin: 10
        },
        1120: {
            items: 3,
            margin: 50
        } 
    }

    return (
        <>
            {/* PRODUCTO */}
            <Container>
                {product.stock <= 0 &&
                    <Alert severity="error" style={{marginTop: "43px"}}>
                        <AlertTitle>Producto no disponible</AlertTitle>
                        De momento este producto ya no se encuentra disponible, <InertiaLink href="/preguntas#contacto" style={{textDecoration: "none", color: "rgb(97, 26, 21)", fontWeight: "bold"}}>contáctanos</InertiaLink> por disponibilidad. 
                    </Alert>
                }
                
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    style={{paddingTop: "43px"}}
                >
                    {/* imagenes del producto */}
                    <Hidden smDown>
                        <Grid item style={{width: "30%", marginRight: "61px", height: "100%"}} container direction="row" justify="center" alignItems="flex-start" >
                            <Paper variant="outlined" className={classes.paper}>
                                <ImageCarousel img={product.foto} images={product.img} />
                            </Paper>
                        </Grid>
                    </Hidden>
                    {/* informacion del producto */}
                    <Grid item container xs>
                        {/* nombre del producto */}
                        <Grid item 
                            container 
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item className={classes.name}>
                                {product.name}
                            </Grid>

                            <Grid item>
                                <div onClick={() => {history.back()}}>
                                    <IconButton aria-label="regresar">
                                        <ChevronLeftIcon />
                                    </IconButton>
                                </div>
                            </Grid>
                        </Grid>

                        {/* precio */}
                        <Grid
                            item
                            container
                            direction="row"
                            alignItems="center"
                        >
                            <Grid item className={classes.discount} style={{marginRight: product.descuento > 0 ? "16px" : "0px"}}>
                                {product.descuento > 0 &&
                                "$ " + showPrice(product.precio, null) + " MXN"
                                }
                            </Grid>
                            <Grid item className={classes.price}>
                                $ {showPrice(product.precio, product.descuento)} MXN
                            </Grid>
                        </Grid>

                        {/* carrusel responsivo */}
                        <Hidden mdUp>
                            <Grid item style={{width: "100%", maxWidth: "500px", margin: "auto", marginTop: "20px", marginBottom: "20px"}}>
                                <Paper variant="outlined" className={classes.paper}>
                                    <ImageCarousel img={product.foto} images={product.img} />
                                </Paper>
                            </Grid>
                        </Hidden>

                        {/* informacion del producto */}
                        <Grid 
                            item
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item className={classes.text} 
                                container 
                                direction="column"
                                justify="center"
                                alignItems="flex-start"
                                xs
                            >
                                <Grid item>
                                    <p style={{marginBottom: "0px"}}><b>Categoría:</b> {product.category ? capitalize(product.category.name) : "Sin categoría"}</p>
                                </Grid>
                                <Grid item>
                                    <p style={{marginBottom: "0px"}}><b>Tipo:</b> {product.type ? capitalize(product.type.name) : "No especificado"}</p>
                                </Grid>
                                <Grid item>
                                    <p style={{marginBottom: "0px"}}><b>Marca:</b> {product.brand ? product.brand.name : "Sin marca"}</p>
                                </Grid>
                                <Grid item>
                                    <a href={product.brand ? product.brand.link ? product.brand.link : "#" : "#"} target="_blank">
                                        <AsyncImage
                                            src={product.brand ? product.brand.logo ? '/storage/logos/'+ product.brand.logo : '/storage/logos/default.jpg' : '/storage/logos/default.jpg'}
                                            imageComponent={
                                                <div className={classes.logo} style={{
                                                        backgroundImage: product.brand ? product.brand.logo ? 'url("/storage/logos/'+ product.brand.logo +'")' : 'url("/storage/logos/default.jpg")' : 'url("/storage/logos/default.jpg")',
                                                        backgroundRepeat: "no-repeat",
                                                        backgroundPosition: "center center",
                                                        backgroundSize: "100%"
                                                    }}
                                                >
                                                </div>
                                            }
                                            loadingComponent={skeletonLogo}
                                        >

                                        </AsyncImage>
                                    </a>
                                </Grid>
                                {product.presentacion &&
                                <Grid item>
                                    <p style={{marginBottom: "0px", marginTop: "5px"}}><b>Presentación:</b> {product.presentacion}</p>
                                </Grid>
                                }
                            </Grid>

                            {/* sin soya/sin gluten */}
                            <Grid 
                                item 
                                container
                                direction="row"
                                justify="flex-end"
                                alignItems="flex-start"
                                xs
                                style={{height: "100%"}}
                            >
                                {/* libre de soya */}
                                {product.soyaFree == true &&
                                    <Grid 
                                        item 
                                        container 
                                        direction="column"
                                        alignItems="center"
                                        justify="center"
                                        style={{width: "fit-content", marginRight: product.trigoFree ? "5px" : "0px"}}
                                    >
                                        <Grid item>
                                            <AsyncImage 
                                                src="/img/CATEGORIAS/icons/soya3.png"
                                                imageComponent={<img src="/img/CATEGORIAS/icons/soya3.png" className={classes.iconoFree} />}
                                                loadingComponent={<CircularProgress style={{width: 40, height: 40, color: "#1DA3A8"}} />}
                                            />
                                        </Grid>
                                        <Grid item className={classes.textFree}>
                                            Este producto está libre de soya
                                        </Grid>
                                    </Grid>
                                }

                                {/* libre de gluten */}
                                {product.trigoFree == true &&
                                    <Grid 
                                        item 
                                        container 
                                        direction="column"
                                        alignItems="center"
                                        justify="center"
                                        style={{width: "fit-content"}}
                                    >
                                        <Grid item>
                                            <AsyncImage 
                                                src="/img/CATEGORIAS/icons/gluten3.png"
                                                imageComponent={<img src="/img/CATEGORIAS/icons/gluten3.png" className={classes.iconoFree} />}
                                                loadingComponent={<CircularProgress style={{width: 40, height: 40, color: "#1DA3A8"}} />}
                                            />
                                        </Grid>
                                        <Grid item className={classes.textFree}>
                                            Este producto está libre de gluten
                                        </Grid>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>

                        {/* ingredientes */}
                        {product.ingredientes &&
                            <Grid item className={classes.text}>
                                <p style={{marginBottom: "0px"}}><b>Ingredientes:</b> {product.ingredientes}</p>
                            </Grid>
                        }

                        {product.stock > 0 &&
                            <Grid item style={{width: "100%", marginTop: "30px"}}>
                                <Divider />
                            </Grid>
                        }

                        <Grid 
                        item 
                        container 
                        direction="row" 
                        justify="flex-start"
                        alignItems="center"
                        style={{width:"100%"}}
                        >
                            {cantidadProducto(product.id) > 0 ?
                            <>
                                <Grid item className={classes.text}>
                                    <b style={{marginRight: "20px"}}>Cantidad</b>
                                </Grid>
                                <Grid item>
                                    <OutlinedInput type="number"
                                        className={classes.inputSinFlechasProduct}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <InertiaLink href={route('cart.store', product.id)} method="post" as="button" style={{textDecoration: "none"}} className={classes.inertiaButtonPlusRemove} preserveScroll>
                                                    <IconButton
                                                        aria-label="add"
                                                        component="div"
                                                    >
                                                        <AddIcon fontSize="small" />
                                                    </IconButton>
                                                </InertiaLink>
                                            </InputAdornment>
                                        }
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <InertiaLink href={route('cart.update', product.id)} method="patch" as="button" style={{textDecoration: "none"}} className={classes.inertiaButtonPlusRemove} preserveScroll>
                                                    <IconButton
                                                        aria-label="remove"
                                                        component="div"
                                                    >
                                                        <RemoveIcon fontSize="small" />
                                                    </IconButton>
                                                </InertiaLink>
                                            </InputAdornment>
                                        }
                                        
                                        value={cantidadProducto(product.id)} 
                                    />
                                </Grid>
                            </>
                            :
                                product.stock > 0 &&
                                <InertiaLink href={route('cart.store', product.id)} method="post" as="button" style={{textDecoration: "none"}} className={classes.inertiaButton} preserveScroll>
                                    <Button variant="contained" color="primary" component="div" disableElevation className={classes.button}>
                                        AGREGAR AL CARRITO
                                        <ShoppingCartOutlinedIcon fontSize="small" style={{marginLeft: "6px"}} />
                                    </Button>
                                </InertiaLink>
                                
                            }
                        </Grid>
                    </Grid>
                </Grid>

                {/* PRODUCTOS RELACIONADOS */}
                {products && products.length > 0 &&
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        style={{paddingTop: "0px", marginBottom: "30px"}}
                    >
                        <Grid item className={classes.carouselTittle} xs={12}>
                            PRODUCTOS RELACIONADOS

                            <Divider />
                        </Grid>
                        <OwlCarousel
                            responsive={responsiveProducto}   
                            rewind
                            dots={true}
                            margin={10}
                            className='owl-theme'
                            key={`carousel_${products.length}`}
                        > 
                        {products.map((producto) => (
                            <div key={producto.id + producto.name + "carrusel"} style={{width: "100%"}}>
                                <ProductComponent 
                                    name={producto.name} 
                                    img={producto.foto} 
                                    price={producto.precio} 
                                    discount={producto.descuento} 
                                    brand={producto.brand ? producto.brand.name : "Sin marca"} 
                                    logo={producto.brand ? producto.brand.logo : "Logo_color_Mesa-de-trabajo-1.png"} 
                                    link={producto.brand ? producto.brand.link ?? "#" : "#"} 
                                    id={producto.id}
                                    uuid={producto.uuid}
                                    glutenFree={producto.trigoFree}
                                    soyaFree={producto.soyaFree}
                                    carrusel
                                />
                            </div>
                         ))
                        }
                        </OwlCarousel>
                    </Grid>
                }

                {/* RECETAS RELACIONADAS */}
                {recipes && recipes.length > 0 &&
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        style={{paddingTop: "0px", marginBottom: "30px"}}
                    >
                        <Grid item className={classes.carouselTittle} xs={12}>
                            RECETAS CON ESTE PRODUCTO

                            <Divider />
                        </Grid>
                        <OwlCarousel 
                            responsive={responsiveRecetas}   
                            rewind
                            dots={true}
                            autoplay 
                            autoplayTimeout={10000} 
                            autoplayHoverPause
                            margin={10}
                            className='owl-theme'
                        > 
                        {recipes.map((recipe) => (
                            <div key={recipe.id + "receta"}>
                                <Receta
                                    img={recipe.img.length > 0 ? recipe.img[0].url : "default.jpg"}
                                    nombre={recipe.nombre}
                                    id={recipe.id}
                                    descripcion={recipe.img[0].descripcion}
                                />
                            </div>
                         ))
                        }
                        </OwlCarousel>
                    </Grid>
                }
            </Container>
        </>
    )
}


Product.layout = page => <Layout children={page} title="Comepasto - Producto" pageTitle="Producto" />

export default Product