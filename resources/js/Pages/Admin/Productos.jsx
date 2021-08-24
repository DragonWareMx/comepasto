import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import route from 'ziggy-js';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '../../layouts/LayoutAdmin';

const Productos = () => {
    return ( 
        <>
        VISTA DE PRODUCTOS DEL ADMIN
    </>
    )
}


Productos.layout = page => <Layout children={page} title="Comepasto - Productos" pageTitle="Producto" />

export default Productos