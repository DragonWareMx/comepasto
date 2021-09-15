import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { InertiaLink } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { usePage } from '@inertiajs/inertia-react'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

//css
import '/css/QuienesSomos.css';
import Paginacion from '../common/paginacion';
import Product from './Product'
import route from 'ziggy-js';
import { CircularProgress, Select } from '@material-ui/core';
import AsyncImage from '../common/AsyncImage';

const useStyles = makeStyles((theme) => ({
    category: {
        fontFamily: "Atma",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "25px",
        lineHeight: "40px",

        color: "#FFDE59",
        userSelect: "none",
    },
    paper: {
        height: 150,
        width: 180,
        backgroundColor: "#1DA3A8",
        '& img': {
            height: "80px",
            width: "auto",
            margin: "auto",
            userSelect: "none"
        },
        '&:hover img':{
            height: "90px",
            width: "auto",
            transition: "all 1s",
        }
    },
    cardInicioSesion:{
        width: "100%",
        maxWidth: "400px",
        height: "fit-content",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        background: '#1DA3A8',
            color: '#FFFFFF',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '13px',
        lineHeight: '21px',

        minWidth: '220px',
        maxWidth: '319px',
        height: '45px',
        width: "100%",

        border: "1px solid #E3E3E3",

        '&:hover': {
            background: '#1DA3A8',
            color: '#FFFFFF',
        },
    },
    inertiaButton: {
        width: "90%",
        minWidth: '220px',
        maxWidth: '319px',

        height: "fit-content",
        backgroundColor: "transparent",

        marginTop: "12px",
        marginBottom: "20px",

        padding: "0px",
        border: "none",
    },
    cardText: {
        color: '#626262',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '23px',
        width: "90%",
        textAlign: "center"
    },
    cardLink: {
        color: '#1DA3A8',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '14px',
        lineHeight: '23px',
        textAlign: "center",
        textDecoration: "none",
        marginRight: "2px"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
        maxWidth: 150,
    },
    orderText:{
        color: '#474747',

        fontFamily: 'Oxygen',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '15px',
        lineHeight: '19px',
    },
    selectOrder: {
        padding: "14px 14px",
    },
    svgSinResultados: {
        width: "80%",
        maxWidth: 350,
        margin: "auto",
        objectFit: "cover"
    },
    sinResultadosTitle: {
        fontFamily: "Atma",
        fontWeight: "600",
        lineHeight: "49px",
        fontSize: "30px",
        color: "#1DA3A8",
        textAlign: "center",
    },
    sinResultadosText: {
        color: '#626262',

        fontFamily: 'Atma',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '24px',
        lineHeight: '23px',
        width: "90%",
        textAlign: "center"
    }
}));

const Products = ({products, categories, request}) => {
    const { flash,auth } = usePage().props
    
    const classes = useStyles();
    const [order, setOrder] = React.useState(
        (request && (request.order == 'ascp' || request.order == 'descp' || request.order == 'ascn' || request.order == 'descn')) ? request.order : ''
    );
    const [filter, setFilter] = React.useState(
        request.filter ? exist(request.filter) : ''
    );

    //onChange del select para ordenar los resultados
    const handleChange = (event) => {
        setOrder(event.target.value);
        Inertia.reload
        ({
            only: ['products','request','categories'], 
            data: {
                order: event.target.value
            },
            onFinish: () => { setOrder((request.order == 'ascp' || request.order == 'descp' || request.order == 'ascn' || request.order == 'descn') ? request.order : '') },
        })
    }

    //onChange del select para filtrar los resultados
    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
        Inertia.reload
        ({
            only: ['products','request','categories'], 
            data: {
                filter: event.target.value
            },
        })
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

    //verifica si existe el string en los filtros disponibles
    function exist(filterString){
        //las opciones del filtro dependen de la categoria
        switch (request.categoria) {
            case 'SIN SOYA':
                //las opciones son:
                    //SIN GLUTEN
                    //CUALQUIER OTRA CATEGORIA
                if(filterString == 'sg')
                    return filterString
                if(categories.length == 0)
                    return ''

                var categoryName = ''
                categories.forEach(category => {
                    if(filterString == category.name){
                        categoryName = category.name
                        return
                    }
                });

                return categoryName
                break;
            case 'SIN GLUTEN':
                //las opciones son:
                    //SIN SOYA
                    //CUALQUIER OTRA CATEGORIA
                if(filterString == 'ss')
                    return filterString
                if(categories.length == 0)
                    return ''

                var categoryName = ''
                categories.forEach(category => {
                    if(filterString == category.name){
                        categoryName = category.name
                        return
                    }
                });
                return categoryName
                break;
            default:
                //las opciones son
                    //SIN SOYA
                    //SIN GLUYEN
                    //SIN SOYA Y SIN GLUTEN
                if(filterString == 'sg' || filterString == 'ss' || filterString == 'sssg')
                    return filterString
                
                return ''
                break;
        }
    }

    function capitalize(word){
        const lower = word.toLowerCase()
        return word.charAt(0).toUpperCase() + lower.slice(1)
    }

    useEffect(() => {
        setOrder((request.order == 'ascp' || request.order == 'descp' || request.order == 'ascn' || request.order == 'descn') ? request.order : '')
        setFilter(request.filter ? exist(request.filter) : '')
    }, [request])

    return (
        <>
            {/* CATEGORIAS */}
            <Container>
                <Grid container direction="row" justify="center">
                    {/* TITULO TIENDA CATEGORIAS */}
                    <Grid item xs={12} container direction="row" justify="center" spacing={1} alignItems="center" className="quienes_marcas_title">
                        <Grid item className="quienes_marcas_title">TIENDA</Grid>
                        <Grid item className="quienes_marcas_title" style={{fontWeight: 100}}>CATEGORÍAS</Grid>
                    </Grid>

                    {/* TEXTO */}
                    <Grid item xs={12} className="quienes_marcas_text">
                        Encuentra los mejores productos del mercado
                    </Grid>

                    {/* CATEGORIAS */}
                    <Grid container justify="center" spacing={3} style={{marginTop: "36px", marginBottom: "50px"}}>
                        {categories && categories.length > 0 && categories.map(category => (
                            <Grid item key={category.id + category.name + "categoria"}>
                                <InertiaLink href={route('inicio')} data={{ categoria: category.name }} style={{textDecoration: "none"}} preserveScroll preserveState>
                                    <Paper className={classes.paper} elevation={0} square >
                                        <Grid container direction="column" justify="center" alignItems="center" style={{height: "100%"}}>
                                            <Grid item>
                                                <AsyncImage 
                                                    src={"/storage/categories/"+ category.icono +""}
                                                    imageComponent={<img className="quienes_marca" src={"/storage/categories/"+ category.icono +""} alt=""/>}
                                                    loadingComponent={<CircularProgress style={{width: 80, height: 80, color: "#ffffff"}} />}
                                                />
                                            </Grid>
                                            <Grid item className={classes.category}>
                                                {category.name}
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </InertiaLink>
                            </Grid>
                        ))}

                        <Grid item>
                            <InertiaLink href={route('inicio')} data={{ categoria: "SIN GLUTEN" }} style={{textDecoration: "none"}} preserveScroll preserveState>
                                <Paper className={classes.paper} elevation={0} square >
                                    <Grid container direction="column" justify="center" alignItems="center" style={{height: "100%"}}>
                                        <Grid item>
                                        <AsyncImage 
                                            src="/img/CATEGORIAS/icons/gluten3.png"
                                            imageComponent={<img className="quienes_marca" src="/img/CATEGORIAS/icons/gluten3.png" alt=""/>}
                                            loadingComponent={<CircularProgress style={{width: 80, height: 80, color: "#ffffff"}} />}
                                        />
                                        </Grid>
                                        <Grid item className={classes.category}>
                                            SIN GLUTEN
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </InertiaLink>
                        </Grid>

                        <Grid item>
                            <InertiaLink href={route('inicio')} data={{ categoria: "SIN SOYA" }} style={{textDecoration: "none"}} preserveScroll preserveState>
                                <Paper className={classes.paper} elevation={0} square >
                                    <Grid container direction="column" justify="center" alignItems="center" style={{height: "100%"}}>
                                        <Grid item>
                                            <AsyncImage 
                                                src="/img/CATEGORIAS/icons/soya3.png"
                                                imageComponent={<img className="quienes_marca" src="/img/CATEGORIAS/icons/soya3.png" alt=""/>}
                                                loadingComponent={<CircularProgress style={{width: 80, height: 80, color: "#ffffff"}} />}
                                            />
                                        </Grid>
                                        <Grid item className={classes.category}>
                                            SIN SOYA
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </InertiaLink>
                        </Grid>

                        <Grid item id="productos">
                            <InertiaLink href={route('inicio')} data={{ categoria: "DESTACADOS" }} style={{textDecoration: "none"}} preserveScroll preserveState>
                                <Paper className={classes.paper} elevation={0} square>
                                    <Grid container direction="column" justify="center" alignItems="center" style={{height: "100%"}}>
                                        <Grid item>
                                        <AsyncImage 
                                                src="/img/CATEGORIAS/icons/destacados_white.png"
                                                imageComponent={<img className="quienes_marca" src="/img/CATEGORIAS/icons/destacados_white.png" alt=""/>}
                                                loadingComponent={<CircularProgress style={{width: 80, height: 80, color: "#ffffff"}} />}
                                            />
                                        </Grid>
                                        <Grid item className={classes.category}>
                                            DESTACADOS
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </InertiaLink>
                        </Grid>
                    </Grid>

                    {/* TITULO TIENDA CATEGORIAS */}
                    <Grid item xs={12} container direction="row" justify="center" spacing={1} alignItems="center" className="quienes_marcas_title" style={{marginBottom: "0px"}}>
                        <Grid item className="quienes_marcas_title">
                            NUESTROS PRODUCTOS
                        </Grid>
                        <Grid item className="quienes_marcas_title" style={{fontWeight: 100}}>
                            {request.busqueda ? "BÚSQUEDA" : request.categoria ?? "DESTACADOS"}
                        </Grid>
                    </Grid>

                    {/* FILTROS DE BUSQUEDA */}
                    <Grid item xs={12} container 
                        direction="row"
                        justify="flex-end"
                        alignItems="center" 
                    >
                        <Grid item container alignItems="center" style={{width: "fit-content"}}>
                            <Grid item className={classes.orderText} >
                                Filtrar
                            </Grid>

                            <Grid item>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <Select
                                        value={filter}
                                        onChange={handleChangeFilter}
                                        displayEmpty
                                        classes={{ root: classes.selectOrder }}
                                    >
                                    <MenuItem value="">
                                        Sin filtro
                                    </MenuItem>
                                    {request.categoria == 'SIN GLUTEN' ? 
                                        [
                                            <MenuItem value="ss">Sin soya</MenuItem>,
                                            categories && categories.length > 0 && categories.map(category => (
                                                <MenuItem value={category.name} key={category.id + category.name + "filter"}>{capitalize(category.name)}</MenuItem>
                                            ))
                                        ]
                                    :
                                    request.categoria == 'SIN SOYA' ?
                                        [
                                            <MenuItem value="sg">Sin gluten</MenuItem>,
                                            categories && categories.length > 0 && categories.map(category => (
                                                <MenuItem value={category.name} key={category.id + category.name + "filter2"}>{capitalize(category.name)}</MenuItem>
                                            ))
                                        ]
                                    :
                                        [
                                            <MenuItem value="ss">Sin soya</MenuItem>,
                                            <MenuItem value="sg">Sin gluten</MenuItem>,
                                            <MenuItem value="sssg">Sin soya y sin gluten</MenuItem>,
                                        ]
                                    }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid item container alignItems="center" style={{width: "fit-content", padding: "5px", paddingLeft: "55px"}}>
                            <Grid item className={classes.orderText} >
                                Ordenar por
                            </Grid>

                            <Grid item>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <Select
                                        value={order}
                                        onChange={handleChange}
                                        displayEmpty
                                        classes={{ root: classes.selectOrder }}
                                    >
                                    <MenuItem value="">
                                        Más vendidos
                                    </MenuItem>
                                    <MenuItem value="ascp">Menor a mayor precio</MenuItem>
                                    <MenuItem value="descp">Mayor a menor precio</MenuItem>
                                    <MenuItem value="ascn">A-Z nombre</MenuItem>
                                    <MenuItem value="descn">Z-A nombre</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} container direction="row" spacing={3} style={{marginBottom: "40px"}}>
                        {(products && products.data && products.data.length > 0) ? products.data.map((product) => (
                            <Grid item  xs={12} sm={6} md={4} lg={3} key={product.id + product.name + "productoTienda"}>
                                <Product 
                                    name={product.name} 
                                    img={product.foto} 
                                    price={product.precio} 
                                    discount={product.descuento} 
                                    brand={product.brand ? product.brand.name : "Sin marca"} 
                                    logo={product.brand ? product.brand.logo : "Logo_color_Mesa-de-trabajo-1.png"} 
                                    link={product.brand ? product.brand.link ?? "#" : "#"} 
                                    id={product.id}
                                    uuid={product.uuid}
                                    glutenFree={product.trigoFree}
                                    soyaFree={product.soyaFree}
                                    stock={product.stock}
                                    cantidad={cantidadProducto(product.id)}
                                />
                            </Grid>
                         ))
                        :
                        <>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item className={classes.sinResultadosTitle} >
                                ¡Ooops!
                            </Grid>

                            <Grid item style={{width: "100%"}} container justifyContent="center" alignItems="center">
                                <img className={classes.svgSinResultados} src="/img/ilustraciones/product-hunt-animate.svg" alt="" />
                            </Grid>

                            <Grid item className={classes.sinResultadosText}>
                                No se encontraron resultados
                            </Grid>

                        </Grid>
                        </>
                        }
                    </Grid>

                    <Grid item xs={12} container direction="row" spacing={3}>
                        <Paginacion links={products.links}/>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Products