import { App } from '@inertiajs/inertia-react'
import React from 'react'
import { render } from 'react-dom'
import SimpleReactLightbox from 'simple-react-lightbox'

const el = document.getElementById('app')

render(
    <SimpleReactLightbox>
        <App
            initialPage={JSON.parse(el.dataset.page)}
            resolveComponent={name => require(`./Pages/${name}`).default}
        />
    </SimpleReactLightbox>,
    el
)
