import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react'
import Button from "@material-ui/core/Button";
import route from 'ziggy-js';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import '/css/recetas.css';
import Skeleton from 'react-loading-skeleton'; 

//iconos
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AsyncImage from '../common/AsyncImage';

export default function Receta({img, nombre, id, descripcion}){

    return (
        <>
            <AsyncImage 
                src={"/storage/recetas/" + img}
                imageComponent={<img className="receta-image" src={"/storage/recetas/" + img} alt="" />}
                loadingComponent={<Skeleton width="100%" height={180} />}
            />
            <Tooltip title={nombre} arrow TransitionComponent={Zoom} placement="top-start">
                <InertiaLink href={route('ver-receta', id)} style={{textDecoration:'none'}}><Typography xs={12} className="receta-name" noWrap>{nombre}</Typography></InertiaLink>
            </Tooltip>
            {/* Maximo 100 caracteres de descripción, then ... */}
            <Typography xs={12} className="receta-desc" noWrap>{descripcion}</Typography>
            <InertiaLink href={route('admin.receta', id)} style={{textDecoration:'none'}}>
                <Button size="large" className="button-receta" endIcon={<ArrowForwardIcon>send</ArrowForwardIcon>}>
                    LEER MÁS
                </Button>
            </InertiaLink>
        </>
    );
}