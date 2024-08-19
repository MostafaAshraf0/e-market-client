"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '@/components/ui/Navbar';
import Image from 'next/image';
import OrderNow from '@/components/OrderNow';

interface CartItem {
    productId: {
        _id: string;
        title: string;
        price: number;
        description: string;
        imageUrl: string;
    };
    quantity: number;
}

interface Cart {
    _id: string;
    userId: string;
    items: CartItem[];
}

const CartPage: React.FC = () => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = Cookies.get('userId');
                if (!token) {
                    throw new Error('User not authenticated');
                }

                const userId = token;

                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}`);
                setCart(response.data);
            } catch (err) {
                console.error('Error fetching cart:', err);
                // setError('Error fetching cart data');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const handleQuantityChange = async (productId: string, action: 'increase' | 'decrease') => {
        try {
            const token = Cookies.get('userId');
            if (!token) {
                throw new Error('User not authenticated');
            }

            const userId = token;

            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/update-quantity`, {
                userId,
                productId,
                action
            });

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}`);
            setCart(response.data);
        } catch (err) {
            console.error('Error updating quantity:', err);
            setError('Error updating quantity');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <Navbar />
            <div className='p-3'>
                <h2 className="p-2 text-3xl">Cart</h2>
                {cart && cart.items.length > 0 ? (
                    
                    <ul>
                        {cart.items.map((item) => {
                            const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/` + item.productId.imageUrl.replace("src/", "");
                            return (
                                <li key={item.productId._id} className="flex p-5 border-y-2 border-zinc-600 mb-5 ">
                                    <Image
                                        src={imageUrl}
                                        alt={item.productId.title}
                                        width={150}
                                        height={150}
                                        unoptimized
                                    />
                                    <div className="p-3">
                                    <div>{item.productId.title}</div>
                                    <div>{item.productId.price} $</div>
                                    <div className='flex justify-between'>
                                        <button onClick={() => handleQuantityChange(item.productId._id, 'decrease')}>-</button>
                                        {item.quantity}
                                        <button onClick={() => handleQuantityChange(item.productId._id, 'increase')}>+</button>
                                    </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    
                ) : (
                    <p>Your cart is empty</p>
                )}
            </div>
            {cart && <OrderNow cartId={cart._id} />}
        </>
    );
};

export default CartPage;
