import { CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import Usecart from '../Usecart/Usecart';
import Useaxiossecure from '../Useaxiossecure/Useaxiossecure';
import { AuthContext } from '../Authprovider/Authprovider';
import Loading from '../Loading/Loading';
import { data } from 'react-router-dom';
import toast from 'react-hot-toast';

const Checkform = () => {
    const stripe = useStripe();
    const elements = useElements();

    const { user, loading } = useContext(AuthContext)
    console.log(user)

    const [error, setError] = useState("");

    const [transationId, settransationId] = useState('')

    const [clientSecret, setClientSecret] = useState('')

    const [cart, refetch] = Usecart()

    const totalprice = cart.reduce((total, item) => total + item.price, 0)

    const axiossecure = Useaxiossecure()


    if (loading) {
        return <Loading></Loading>
    }


    useEffect(() => {
        if (totalprice > 0) {
            axiossecure.post('/create-payment-intent', { price: totalprice })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }

    }, [axiossecure, totalprice])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (!card) {
            setError("Card element not found");
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.error("Payment Error:", error.message);
            setError(error.message);
        } else {
            console.log("Payment Success:", paymentMethod);
        }

        // if (card == null) {
        //     return;
        // }


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {

            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'Anonymous',
                    email: user?.email || 'Anonymous',
                    address: {
                        line1: "123 Test Street",
                        city: "New Delhi",
                        state: "Delhi",
                        postal_code: "110001",
                        country: "IN" // **India হওয়া লাগবে**
                    }
                },
            }
        })


        if (confirmError) {
            console.log(user)
            console.log('error', confirmError)
            console.log(clientSecret)
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent?.status === 'succeeded') {
                console.log('payment success')
                settransationId(paymentIntent.id)

                const payment = {
                    email: user.email,
                    price: totalprice,
                    transationId: paymentIntent.id,
                    date: new Date(),
                    cartId: cart.map(item => item._id),
                    menuItemId: cart.map(item => item.menuId),
                    status: 'pending'
                }

                const res = await axiossecure.post('/payments', payment)
                console.log(res)
                if (res.data.result.insertedId) {
                    refetch()
                    toast.success('Payment succesful!')
                }
            }
        }



        // if (error) {
        //     console.log('[error]', error);
        //     setError(error.message);
        // } else {
        //     console.log('[PaymentMethod]', paymentMethod);
        //     setError('')
        // }
    }
    return (

        <form onSubmit={handleSubmit} className='my-4 p-10'>
            <CardElement options={{
                style: {
                    base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } },
                    invalid: { color: '#9e2146' },
                },
            }} />
            <button className='btn btn-primary mt-10' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>

            <p className='text-red-700'>{error}</p>
            {transationId && <p className='text-green-700'>Payment Successfull with Transaction ID: {transationId}</p>}
        </form>
    );
};

export default Checkform;