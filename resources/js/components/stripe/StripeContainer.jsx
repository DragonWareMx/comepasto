import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = process.env.MIX_STRIPE_PUBLIC_KEY;

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
