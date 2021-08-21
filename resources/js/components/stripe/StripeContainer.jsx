import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = 'pk_test_51JPXdrJJv3IraniFMcNAPsL4ORQAPd3UniuFsPaFFjMvMeBpEv5BsS7QIkrAGAreWywRIpN6mXUlNFIVe8fOlUc600jOkNPJDj';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise} fonts={[
            { src: "url(https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,500,600)", family: "Montserrat" }
        ]}>
            <PaymentForm />
        </Elements>
    )
}
