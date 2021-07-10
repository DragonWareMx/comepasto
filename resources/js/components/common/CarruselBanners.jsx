import React, { useEffect } from 'react'
import { usePage } from '@inertiajs/inertia-react'
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';

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

    return (
        <div style={{marginBottom:30}}>
            <OwlCarousel responsive={responsive}   
                loop 
                dots={false}
                autoplay 
                autoplayTimeout={2000} 
                autoplayHoverPause
                margin={8} >  
                {banners && banners.map((banner, index)=>(
                    <img src={"/storage/banners/"+banner.url}/>
                    ))
                 }
            </OwlCarousel> 
        </div>
    )
}