import React, { useEffect, useState } from 'react';
import Sectiontitle from '../../Layout/Sectiontitle/Sectiontitle';
import { Elements } from '@stripe/react-stripe-js';
import Checkform from '../Checkform/Checkform';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51L4KKASJGWFrRQt8wPF6JUjMkUIrrrRXjeMh0bk7GMs8HvjfPS5VwCFNg53uzPnR1B4QpWHCQJIp6X9i8PSD8HD100Y3GFFVFn');

const Payment = () => {





    // const [stripePromise, setStripePromise] = useState(null);

    // useEffect(() => {
    //     const load = async () => {
    //         const stripe = await loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
    //         setStripePromise(stripe);
    //     };
    //     load();
    // }, []);
    return (
        <div>
            <Sectiontitle title={'Payment'} subtitle={'---At a Glance!---'}></Sectiontitle>
            <div>
                <h3 className='text-4xl'>Make Payment</h3>

                <Elements stripe={stripePromise} >
                    <Checkform></Checkform>
                </Elements>
            </div>

        </div>
    );
};

export default Payment;