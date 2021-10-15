import React from 'react';
import Layout from '../layouts/Layout';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import '/css/preguntas.css';
import '/css/terminos.css';

const Politica = () => {
    return (
        <>
        <Container>
            <Grid container
                direction="row"
                alignItems="center"
                style={{justifyContent:'space-between'}}
            > 
                <div style={{display:'flex',height:50,width:'100%'}}></div>
                <Grid item xs={12}>
                    <div className='preguntas_title'>POLÍTICA Y PRIVACIDAD</div>
                </Grid>

                <Grid item xs={12} className="terminos-texto">
                    Esta Política de privacidad describe cómo se recopila, utiliza y comparte su información 
                    personal cuando visita o hace una compra en <a href="https://www.comepasto.com/" target="_blank" style={{color:'#1DA3A8'}}>www.comepasto.com</a> (denominado en lo sucesivo 
                    el “Sitio”).

                    <Grid item xs={12} className="terminos-sub-title">
                        INFORMACIÓN PERSONAL QUE RECOPILAMOS
                    </Grid>

                    Cuando visita el Sitio, recopilamos automáticamente cierta información sobre su dispositivo, 
                    incluida información sobre su navegador web, dirección IP, zona horaria y algunas de las 
                    cookies que están instaladas en su dispositivo. Además, a medida que navega por el Sitio, 
                    recopilamos información sobre las páginas web individuales o los productos que ve, las 
                    páginas web o los términos de búsqueda que lo remitieron al Sitio e información sobre 
                    cómo interactúa usted con el Sitio. Nos referimos a esta información recopilada automáticamente 
                    como “Información del dispositivo”.
                    <br></br><br></br>
                    Recopilamos Información del dispositivo mediante el uso de las siguientes tecnologías:
                    <br></br><br></br>
                    <b>COOKIES</b>
                    <ul>
                        <li>Los “Archivos de registro” rastrean las acciones que ocurren en el Sitio y recopilan 
                            datos, incluyendo su dirección IP, tipo de navegador, proveedor de servicio de Internet, 
                            páginas de referencia/salida y marcas de fecha/horario.</li>
                        <li>Las “balizas web”, las “etiquetas” y los “píxeles” son archivos electrónicos utilizados 
                            para registrar información sobre cómo navega usted por el Sitio.</li>
                    </ul>
                    <br></br>
                    Además, cuando hace una compra o intenta hacer una compra a través del Sitio, recopilamos cierta 
                    información de usted, entre la que se incluye su nombre, dirección de envío, información de pago 
                    (la información de su tarjeta bancaria NO la recopilamos nosotros ni la almacenamos de ningún modo, 
                    pues usamos la pasarela de pago Stripe.com), dirección de correo electrónico y número de teléfono.  
                    Nos referimos a esta información como “Información del pedido”.
                    <br></br><br></br>
                    Cuando hablamos de “Información personal” en la presente Política de privacidad, nos referimos tanto 
                    a la Información del dispositivo como a la Información del pedido.

                    <Grid item xs={12} className="terminos-sub-title">
                        ¿CÓMO UTILIZAMOS SU INFORMACIÓN PERSONAL?
                    </Grid>
                    
                    Usamos la Información del pedido que recopilamos en general para preparar los pedidos realizados 
                    a través del Sitio (incluido el procesamiento de su información de pago, la organización de los envíos 
                    y/o confirmaciones de pedido).  Además, utilizamos esta Información del pedido para: comunicarnos con 
                    usted; examinar nuestros pedidos en busca de fraudes o riesgos potenciales; y cuando de acuerdo con 
                    las preferencias que usted compartió con nosotros, le proporcionamos información o publicidad 
                    relacionada con nuestros productos o servicios.
                    <br></br><br></br>
                    También utilizamos Google Analytics para ayudarnos a comprender cómo usan nuestros clientes el Sitio. 
                    Puede obtener más información sobre cómo Google utiliza su Información personal aquí: 
                    <a href="https://www.google.com/intl/es/policies/privacy/" target="_blank" style={{color:'#1DA3A8'}}>https://www.google.com/intl/es/policies/privacy/</a>.  Puede darse de baja de Google Analytics aquí: 
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" style={{color:'#1DA3A8'}}>https://tools.google.com/dlpage/gaoptout</a>.
                    <br></br><br></br>
                    Finalmente, también podemos compartir su Información personal para cumplir con las leyes y regulaciones aplicables, para responder a una citación, orden de registro u otra solicitud legal de información 
                    que recibamos, o para proteger nuestros derechos.

                    <Grid item xs={12} className="terminos-sub-title">
                        NO RASTREAR
                    </Grid>

                    Tenga en cuenta que no alteramos las prácticas de recopilación y uso de datos de nuestro Sitio cuando vemos una señal de No rastrear desde su navegador.

                    <Grid item xs={12} className="terminos-sub-title">
                        SUS DERECHOS
                    </Grid>

                    Tiene derecho a acceder a la información personal que tenemos sobre usted y a solicitar que su información personal sea corregida, actualizada o eliminada. 
                    Si desea ejercer este derecho, comuníquese con nosotros a través de la información de contacto que se encuentra a continuación. 

                    <Grid item xs={12} className="terminos-sub-title">
                    RETENCIÓN DE DATOS
                    </Grid>

                    Cuando realiza un pedido a través del Sitio, mantendremos su Información del pedido para nuestros registros a menos que y hasta que nos pida que eliminemos esta información.

                    <Grid item xs={12} className="terminos-sub-title">
                    CAMBIOS
                    </Grid>

                    Podemos actualizar esta política de privacidad periódicamente para reflejar, por ejemplo, cambios en nuestras prácticas o por otros motivos operativos, legales o reglamentarios.

                    <Grid item xs={12} className="terminos-sub-title">
                    CONTÁCTENOS
                    </Grid>

                    Para obtener más información sobre nuestras prácticas de privacidad, si tiene alguna pregunta o si desea presentar una queja, contáctenos por correo electrónico a &nbsp; 
                    <a href='mailto:comepastov@gmail.com' target="_blank" style={{color:'#1DA3A8'}}>comepastov@gmail.com</a> o por correo mediante el uso de la información que se proporciona a continuación:
                    <br></br><br></br>
                    Prolongación de Zinc 1544, Morelia, MIC, 58160, México.




                </Grid>

            </Grid>

        </Container>
    </>
    )
}


Politica.layout = page => <Layout children={page} title="Comepasto - Política y Privacidad" pageTitle="Política y Privacidad" />

export default Politica