"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from "@/components/ui/button";

interface OrderItem {
    productId: {
        _id: string;
        title: string;
        price: number;
    };
    quantity: number;
    price: number;
}

interface Order {
    _id: string;
    userId: string;
    items: OrderItem[];
    totalPrice: number;
    createdAt: string;
}

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = Cookies.get('userId');
                if (!token) {
                    throw new Error('User not authenticated');
                }

                const userId = token;

                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/${userId}`);
                setOrders(response.data);
            } catch (err) {
                console.error('Error fetching orders:', err);
                // setError('Error fetching orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Orders</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map(order => (
                        <li key={order._id}>
                            <h3>Order ID: {order._id}</h3>
                            <p>Total Price: ${order.totalPrice}</p>
                            <p>Ordered At: {new Date(order.createdAt).toLocaleString()}</p>
                            <ul>
                                {order.items.map(item => (
                                    <li key={item.productId._id}>
                                        <div>Product: {item.productId.title}</div>
                                        <div>Price: {item.price} USD</div>
                                        <div>Quantity: {item.quantity}</div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found</p>
            )}
        </div>
    );
};

export default OrderList;
