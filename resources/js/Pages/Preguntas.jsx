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

const Preguntas = ({tipo, questions, pregunta}) => {
    const [values, setValues] = React.useState({
        pregunta: pregunta || '',
      });
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(event)
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
                                style={{backgroundColor:'#FFFFFF',color:'color: #B6B6B6', width:'100%', marginTop:45, height:40, paddingBottom:18, border:'1px solid #F2F2F2',borderRadius:4,boxShadow:'0px 4px 4px rgba(145, 145, 145, 0.25)'}}
                                startAdornment={<InputAdornment position="start"><InertiaLink id='searchbtn' href={route('preguntas')} data={{ tipo: tipo , pregunta:values.pregunta}} style={{textDecoration: "none"}} preserveScroll preserveState ><SearchIcon style={{color:'#B6B6B6',marginTop:18}}></SearchIcon></InertiaLink></InputAdornment>}
                            />
                        </FormControl>
                        {/* tarjetitas de tipo de pregunta */}
                        <Grid container className='preguntas_seleccionar'>
                            <InertiaLink href={route('preguntas')} data={{ tipo: 'productos' , pregunta:values.pregunta}} style={{textDecoration: "none"}} preserveScroll preserveState item className={!tipo  || tipo=='productos' ? 'preguntas_sel_container' : 'preguntas_tipo_container' }>
                                <FastfoodOutlinedIcon className={!tipo  || tipo=='productos' ? 'preguntas_sel' : 'preguntas_tipo'} style={{fontSize:47}}></FastfoodOutlinedIcon>
                                <div className={!tipo  || tipo=='productos' ? 'preguntas_sel' : 'preguntas_tipo'} style={{fontSize:16}}>Sobre nuestros productos</div>
                            </InertiaLink>
                            <InertiaLink href={route('preguntas')} data={{ tipo: 'pagos' , pregunta:values.pregunta}} style={{textDecoration: "none"}} preserveScroll preserveState item className={tipo=='pagos' ? 'preguntas_sel_container' : 'preguntas_tipo_container'}>
                                <PaymentIcon className={tipo=='pagos' ? 'preguntas_sel' : 'preguntas_tipo'} style={{fontSize:47}}></PaymentIcon>
                                <div className={tipo=='pagos' ? 'preguntas_sel' : 'preguntas_tipo'} style={{fontSize:16}}>Pagos y proceso</div>
                            </InertiaLink>
                            <InertiaLink href={route('preguntas')} data={{ tipo: 'envios' , pregunta:values.pregunta}} style={{textDecoration: "none"}} preserveScroll preserveState item className={tipo=='envios' ? 'preguntas_sel_container' : 'preguntas_tipo_container'}>
                                <LocalShippingOutlinedIcon className={tipo=='envios' ? 'preguntas_sel' : 'preguntas_tipo'} style={{fontSize:47}}></LocalShippingOutlinedIcon>
                                <div className={tipo=='envios' ? 'preguntas_sel' : 'preguntas_tipo'} style={{fontSize:16}}>Sobre nuestros envios y servicios</div>
                            </InertiaLink>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <a href="https://storyset.com/people" target="_blank" alt="People illustrations by Storyset">
                        <AsyncImage 
                            src={"/img/ilustraciones/questions.svg"}
                            imageComponent={<img className="pregunta_svg" src="/img/ilustraciones/questions.svg" alt="" />}
                            loadingComponent={<CircularProgress style={{width: 100, height: 100, color: "#1DA3A8", display:'flex', margin:'auto'}} />}
                        />
                        </a>
                    </Grid>
                    <Grid container style={{marginBottom:47}}>
                        {questions && questions.map((question, index)=>(
                            <Acordeon key={index} title={question.question} text={question.answer}></Acordeon>
                        ))}
                    </Grid>
                    <Grid container alignItems="center" style={{justifyContent:'center'}} id="contacto">
                        <Grid item xs={12} style={{color:'#1DA3A8',fontFamily:'Atma',fontSize:25,textAlign:'center'}}>¿No encuentras tu pregunta?</Grid>
                        <Grid item xs={12} style={{color:'#535353',fontFamily:'Oxygen',fontSize:17,textAlign:'center'}}>Puedes ponerte en contacto con nosotros en</Grid>
                        <Grid item xs={5} style={{marginLeft:50}}>
                            <a href="https://storyset.com/people" target="_blank" alt="People illustrations by Storyset">
                            <AsyncImage 
                                src={"/img/ilustraciones/contact.svg"}
                                imageComponent={<img className="pregunta_svg" src="/img/ilustraciones/contact.svg" alt="" />}
                                loadingComponent={<CircularProgress style={{width: 100, height: 100, color: "#1DA3A8", display:'flex', margin:'auto'}} />}
                            />
                            </a>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Grid item xs={12} className='preguntas_contacto preguntas_first'>Contacto directo</Grid>
                            <Grid item xs={12} className='preguntas_contacto_items'>
                                <div className='contacto_circles'><WhatsAppIcon style={{fontSize:20}}></WhatsAppIcon></div>
                                <a href='https://api.whatsapp.com/send?phone=524432431668' target='_blank' style={{textDecoration:'none',color:'#7e7e7e'}}>WhatsApp 44 32 43 16 68</a>
                            </Grid>
                            <Grid item xs={12} className='preguntas_contacto_items'>
                                <div className='contacto_circles'><EmailIcon style={{fontSize:20}}></EmailIcon></div>
                                <a href='mailto:comepastov@gmail.com' target='_blank' style={{textDecoration:'none',color:'#7e7e7e'}}>E-mail comepastov@gmail.com</a>
                            </Grid>
                            <div className='contacto_space'></div>
                            <Grid item xs={12} className='preguntas_contacto'>Redes sociales</Grid>
                            <Grid item xs={12} className='preguntas_contacto_items'>
                                <div className='contacto_circles'><FacebookIcon style={{fontSize:20}}></FacebookIcon></div>
                                <a href='https://www.facebook.com/Comepastovegano' target='_blank' style={{textDecoration:'none',color:'#7e7e7e'}}>Facebook@comepastovegano</a>
                            </Grid>
                            <Grid item xs={12} className='preguntas_contacto_items'>
                                <div className='contacto_circles'><InstagramIcon style={{fontSize:20}}></InstagramIcon></div>
                                <a href='https://www.instagram.com/comepastov/?hl=es-la' target='_blank' style={{textDecoration:'none',color:'#7e7e7e'}}>Instagram@comepasto</a>
                            </Grid>
                            <Grid item xs={12} className='preguntas_contacto_items'>
                                <div className='contacto_circles'><img src='/images/iconos/tiktok.svg' style={{fill:'#7e7e7e'}}></img></div>
                                <a href='https://www.tiktok.com/@comepastov?lang=es' target='_blank' style={{textDecoration:'none',color:'#7e7e7e'}}>TikTok@comepastov</a>
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