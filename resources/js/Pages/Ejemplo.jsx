import React from 'react';
import Layout from '../layouts/Layout';
import Cart from '../components/layout/Cart'

const Welcome = () => {
    return (
        <div>
            <h1>Welcome</h1>
            <p style={{ fontFamily: "Atma" }}>Hello Viledruid, gracias por hackearnos y welcome to your first Inertia app!</p>
            <Cart />
        </div >
    )
}

Welcome.layout = page => <Layout children={page} title="Inicio" pageTitle="Inicio" />

export default Welcome