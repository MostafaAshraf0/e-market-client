"use client";
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

interface OrderNowProps {
    cartId: string;
}

const OrderNow: React.FC<OrderNowProps> = ({ cartId }) => {
    const handleCheckout = async () => {
        try {
            const token = Cookies.get('userId');
            if (!token) {
                throw new Error('User not authenticated');
            }

            const userId = token;

            // Make a request to create an order
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order/create`, {
                userId,
                cartId
            });

            // Handle successful order creation
            console.log('Order created:', response.data);
            // You can redirect to an order confirmation page or show a success message here

        } catch (error) {
            console.error('Error creating order:', error);
            // Handle error
        }
    };

    return (
        <div className="flex justify-center p-5 gap-5">
            <Link href="/products">
            <Button variant="secondary">Continue Shopping</Button>
            </Link>
            <Button variant="destructive" onClick={handleCheckout}>Check Out</Button>
        </div>
    );
};

export default OrderNow;
