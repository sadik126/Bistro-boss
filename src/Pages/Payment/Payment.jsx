import React from 'react';
import Sectiontitle from '../../Layout/Sectiontitle/Sectiontitle';
import { Elements } from '@stripe/react-stripe-js';

const Payment = () => {

    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
    return (
        <div>
            <Sectiontitle title={'Payment'} subtitle={'---At a Glance!---'}></Sectiontitle>
            <div>
                <h3 className='text-4xl'>Make Payment</h3>

                <Elements stripe={stripePromise}>
                </Elements>
            </div>

        </div>
    );
};

export default Payment;