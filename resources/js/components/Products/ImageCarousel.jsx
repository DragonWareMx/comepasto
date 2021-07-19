import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AsyncImage from '../common/AsyncImage';
import Skeleton from 'react-loading-skeleton';
import OwlCarousel from 'react-owl-carousel'; 
import { SRLWrapper } from "simple-react-lightbox";

//iconos
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
    
}));

export default function Product({ img, images }){
    const classes = useStyles();

    const responsive = {
        0: {
            items: 1,
        }   
    }

    const skeleton = (
        <div style={{marginTop: "25px",
        marginBottom: "12px"}}>
            <Skeleton width={159} height={173} />
        </div>
    )

    return (
        <>
            <SRLWrapper>
                <OwlCarousel responsive={responsive}   
                    rewind
                    dots={false}
                    autoplay 
                    autoplayTimeout={10000} 
                    autoplayHoverPause
                    margin={8}
                > 
                        <div>
                            <AsyncImage
                                src={"/storage/products/1.png"}
                                imageComponent={<img src={"/storage/products/1.png"}/>}
                                loadingComponent={skeleton}
                            />
                        </div>
                        <div>
                            <AsyncImage
                                src={"/storage/products/2.png"}
                                imageComponent={<img src={"/storage/products/2.png"}/>}
                                loadingComponent={skeleton}
                            />
                        </div>
                        <div>
                            <AsyncImage
                                src={"/storage/products/3.png"}
                                imageComponent={<img src={"/storage/products/3.png"}/>}
                                loadingComponent={skeleton}
                            />
                        </div>
                </OwlCarousel> 
            </SRLWrapper>
        </>
    );
}