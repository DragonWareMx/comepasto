import React, { useEffect } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';
import AsyncImage from './AsyncImage';
import Skeleton from 'react-loading-skeleton';

export default function CarruselBanners({banners}) {

    const responsive = {
        0: {
            items: 1,
        },
        400: {
            items: 1,
        },
        600: {
            items: 2,
        },
        700: {
            items: 3,
        },
        1000: {
            items: 3,
        }
    }

    const skeleton = <div style={{margin: "auto"}}>
        <Skeleton width="100%" 
            height={window.screen.width > 1265 ? "405px" : window.screen.width > 700 ? "30vw" : window.screen.width > 600 ? "45vw" : "92vw"}
            style={{maxHeight: "440px"}}
        />
    </div>

    return (
        <div style={{marginBottom:30}}>
            <OwlCarousel responsive={responsive}   
                rewind
                dots={false}
                autoplay 
                autoplayTimeout={10000} 
                autoplayHoverPause
                margin={8} >  
                {banners && banners.map((banner, index)=>(
                    <div key={index + "banner"}>
                        <AsyncImage
                        src={"/storage/banners/"+banner.url}
                        imageComponent={<img src={"/storage/banners/"+banner.url}/>}
                        loadingComponent={skeleton}
                        />
                    </div>
                    ))
                 }
            </OwlCarousel> 
        </div>
    )
}