"use client";

import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from "next/image";


type Product = {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
};

export default function SingleProductPage() {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(
          `${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <Image src={product.imageUrl} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
}
