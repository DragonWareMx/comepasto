import React from 'react';
import Layout from '../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { CircularProgress } from '@material-ui/core';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

//CSS
import '/css/preguntas.css';

//Componentes
import AsyncImage from '../components/common/AsyncImage';
import Acordeon from '../components/common/Acordeon';

//Iconos
import SearchIcon from '@material-ui/icons/Search';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import PaymentIcon from '@material-ui/icons/Payment';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { InertiaLink } from '@inertiajs/inertia-react';

const Preguntas = ({tipo, questions}) => {
    const [values, setValues] = React.useState({
        pregunta: '',
      });
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    return (
        <>
            <Container>
                <Grid container
                    direction="row"
                    alignItems="center"
                    style={{justifyContent:'space-between'}}
                > 
                    <div style={{display:'flex',height:66,width:'100%'}}></div>
                    <Grid item xs={12} sm={7}>
                        <div className='preguntas_title'>PREGUNTAS FRECUENTES</div>
                        <div className='preguntas_frase'>¡No te quedes con la duda!, ¿Cómo podemos ayudarte? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut </div>
                        <FormControl fullWidth style={{marginBottom:42}}>
                            <FilledInput
                                id="pregunta_busqueda"
                                placeholder="Escribe tu pregunta"
                                value={values.pregunta}
                                onChange={handleChange('pregunta')}
                                style={{backgroundColor:'#FFFFFF',color:'color: #B6B6B6', width:'100%', marginTop:45, height:40, paddingBottom:18}}
                                startAdornment={<InputAdornment position="start"><SearchIcon style={{color:'#B6B6B6',marginTop:18}}></SearchIcon></InputAdornment>}
                            />
                        </FormControl>
                        {/* tarjetitas de tipo de pregunta */}
                        <Grid container className='preguntas_seleccionar'>
                            <InertiaLink href={route('preguntas')} data={{ tipo: 'productos' }} style={{textDecoration: "none"}} preserveScroll preserveState item className={!tipo  || tipo=='productos' ? 'preguntas_sel_container' : 'preguntas_tipo_container' }>
                                <FastfoodOutlinedIcon className={!tipo  || tipo=='productos' ? 'preguntas_sel' : 'preguntas_tipo'} style={{fontSize:47}}></FastfoodOutlinedIcon>
                                <div className={!tipo  || tipo=='productos' ? 'preguntas_sel' : 'preguntas_tipo'} style={{fontSize:16}}>Sobre nuestros productos</div>
                            </InertiaLink>
                            <InertiaLink href={route('preguntas')} data={{ tipo: 'pagos' }} style={{textDecoration: "none"}} preserveScroll preserveState item className={tipo=='pagos' ? 'preguntas_sel_container' : 'preguntas_tipo_container'}>
                                <PaymentIcon className={tipo=='pagos' ? 'preguntas_sel' : 'preguntas_tipo'} style={{fontSize:47}}></PaymentIcon>
                                <div className={tipo=='pagos' ? 'preguntas_sel' : 'preguntas_tipo'} style={{fontSize:16}}>Pagos y proceso</div>
                            </InertiaLink>
                            <InertiaLink href={route('preguntas')} data={{ tipo: 'envios' }} style={{textDecoration: "none"}} preserveScroll preserveState item className={tipo=='envios' ? 'preguntas_sel_container' : 'preguntas_tipo_container'}>
                                <LocalShippingOutlinedIcon className={tipo=='envios' ? 'preguntas_sel' : 'preguntas_tipo'} style={{fontSize:47}}></LocalShippingOutlinedIcon>
                                <div className={tipo=='envios' ? 'preguntas_sel' : 'preguntas_tipo'} style={{fontSize:16}}>Sobre nuestros envios y servicios</div>
                            </InertiaLink>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <AsyncImage 
                            src={"/img/ilustraciones/questions.svg"}
                            imageComponent={<img className="pregunta_svg" src="/img/ilustraciones/questions.svg" alt="" />}
                            loadingComponent={<CircularProgress style={{width: 100, height: 100, color: "#1DA3A8", display:'flex', margin:'auto'}} />}
                        />
                    </Grid>
                    <Grid container style={{marginBottom:47}}>
                        {questions && questions.map((question, index)=>(
                            <Acordeon key={index} title={question.question} text={question.answer}></Acordeon>
                        ))}
                    </Grid>
                    <Grid container alignItems="center" style={{justifyContent:'center'}}>
                        <Grid item xs={12} style={{color:'#1DA3A8',fontFamily:'Atma',fontSize:25,textAlign:'center'}}>¿No encuentras tu pregunta?</Grid>
                        <Grid item xs={12} style={{color:'#535353',fontFamily:'Oxygen',fontSize:17,textAlign:'center'}}>Puedes ponerte en contacto con nosotros en</Grid>
                        <Grid item xs={5} style={{marginLeft:50}}>
                            <AsyncImage 
                                src={"/img/ilustraciones/contact.svg"}
                                imageComponent={<img className="pregunta_svg" src="/img/ilustraciones/contact.svg" alt="" />}
                                loadingComponent={<CircularProgress style={{width: 100, height: 100, color: "#1DA3A8", display:'flex', margin:'auto'}} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Grid item xs={12} className='preguntas_contacto preguntas_first'>Contacto directo</Grid>
                            <Grid item xs={12} className='preguntas_contacto_items'>
                                <div className='contacto_circles'><WhatsAppIcon style={{fontSize:20}}></WhatsAppIcon></div>
                                <div>WhatsApp 44 44 44 44 44</div>
                            </Grid>
                            <Grid item xs={12} className='preguntas_contacto_items'>
                                <div className='contacto_circles'><EmailIcon style={{fontSize:20}}></EmailIcon></div>
                                <div>E-mail corroe@ejemplo.com</div>
                            </Grid>
                            <div className='contacto_space'></div>
                            <Grid item xs={12} className='preguntas_contacto'>Redes sociales</Grid>
                            <Grid item xs={12} className='preguntas_contacto_items'>
                                <div className='contacto_circles'><FacebookIcon style={{fontSize:20}}></FacebookIcon></div>
                                <div>Facebook @comepasto</div>
                            </Grid>
                            <Grid item xs={12} className='preguntas_contacto_items'>
                                <div className='contacto_circles'><InstagramIcon style={{fontSize:20}}></InstagramIcon></div>
                                <div>Instagram @comepasto</div>
                            </Grid>
                            <div style={{display:'flex',width:'100%',height:20, backgroundColor:'transparent'}}></div>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}


Preguntas.layout = page => <Layout children={page} title="Comepasto - Preguntas Frecuentes" pageTitle="Preguntas Frecuentes" />

export default Preguntas