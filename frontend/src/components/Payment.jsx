// src/components/Payment.js
import React, { useState } from 'react';
import axios from 'axios';

const Payment = ({ weddingId, amount }) => {
    const handlePayment = async () => {
        try {
            const response = await axios.post('/api/create_order/', {
                wedding_id: weddingId,
                amount: amount
            });

            const paymentData = response.data;

            const options = {
                key: paymentData.key,
                amount: paymentData.amount,
                currency: paymentData.currency,
                name: paymentData.name,
                description: paymentData.description,
                order_id: paymentData.order_id,
                prefill: paymentData.prefill,
                notes: paymentData.notes,
                theme: {
                    color: '#F37254'
                },
                handler: function (response) {
                    axios.post('/api/payment_success/', {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    }).then((res) => {
                        alert('Payment Successful');
                    }).catch((err) => {
                        alert('Payment Failed');
                    });
                },
                modal: {
                    ondismiss: function () {
                        console.log('Checkout form closed');
                    }
                }
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default Payment;
