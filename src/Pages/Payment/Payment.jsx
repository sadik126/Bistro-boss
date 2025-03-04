import React, { useEffect, useState } from 'react';
import Sectiontitle from '../../Layout/Sectiontitle/Sectiontitle';
import { Elements } from '@stripe/react-stripe-js';
import Checkform from '../Checkform/Checkform';
import { loadStripe } from '@stripe/stripe-js';
import Loading from '../Loading/Loading';

const stripePromise = loadStripe('pk_test_51L4KKASJGWFrRQt8wPF6JUjMkUIrrrRXjeMh0bk7GMs8HvjfPS5VwCFNg53uzPnR1B4QpWHCQJIp6X9i8PSD8HD100Y3GFFVFn');

const Payment = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Stripe লোড হলে লোডিং স্টেট পরিবর্তন করবো
        stripePromise.then(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loading></Loading>
    }


    return (
        <div>
            <Sectiontitle title={'Payment'} subtitle={'---At a Glance!---'}></Sectiontitle>
            <div>
                <h3 className='text-4xl text-center'>Make Payment</h3>

                <Elements stripe={stripePromise} >
                    <Checkform></Checkform>
                </Elements>
            </div>

        </div>
    );
};

export default Payment;