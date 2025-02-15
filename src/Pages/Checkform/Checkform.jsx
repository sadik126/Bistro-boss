import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const Checkform = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        if (elements == null) {
            return;
        }

    }
    return (

        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
            <PaymentElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default Checkform;