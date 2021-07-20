import React from 'react';
import AsyncImage from '../common/AsyncImage';
import Skeleton from 'react-loading-skeleton';
import OwlCarousel from 'react-owl-carousel'; 
import { SRLWrapper } from "simple-react-lightbox";
import { renderToString } from 'react-dom/server'

//iconos
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function Product({ img, images }){
    const responsive = {
        0: {
            items: 1,
        }   
    }

    const skeleton = (
        <div style={{margin: "auto", marginTop: "50px",
        marginBottom: "50px", width: "fit-content"}}>
            <Skeleton width={343} height={343} />
        </div>
    )

    return (
        <>
            <SRLWrapper>
                <OwlCarousel responsive={responsive}   
                    rewind
                    dots={false}
                    nav={true}
                    autoplay 
                    autoplayTimeout={10000} 
                    autoplayHoverPause
                    margin={8}
                    navText={[
                        renderToString(
                            <ChevronLeftIcon style={{color: "#D2D2D2", fontSize: 40}}/>
                        ),
                        renderToString(
                            <ChevronRightIcon style={{color: "#D2D2D2", fontSize: 40}}/>
                        )
                    ]}
                > 
                        <div>
                            <AsyncImage
                                src={"/storage/products/"+img}
                                imageComponent={<img src={"/storage/products/"+img} style={{width: "80%", margin: "auto", marginTop: "50px", marginBottom: "50px"}} />}
                                loadingComponent={skeleton}
                            />
                        </div>
                        {images && images.length > 0 && images.map(image => (
                            <div key={image.url + image.descripcion}>
                                <AsyncImage
                                    src={"/storage/products/"+img}
                                    imageComponent={<img src={"/storage/products/"+image.url} style={{width: "80%", margin: "auto", marginTop: "50px", marginBottom: "50px"}} alt={image.descripcion ?? ""} />}
                                    loadingComponent={skeleton}
                                />
                            </div>
                        ))
                        }
                </OwlCarousel> 
            </SRLWrapper>
        </>
    );
}