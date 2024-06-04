"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/ui/Navbar";
import axios from 'axios';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

type Product = {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  creator: string;
  createdAt: string;
  updatedAt: string;
};


export default function SingleProduct({ params }: any) {
  const [product, setProduct] = useState<Product | null>(null);
  const navigation = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { productId } = params as { productId: string };
        if (!productId) {
          console.error('No product ID found');
          return;
        }

        const response = await axios.get<{ message: string; product: Product }>(
          `http://localhost:8080/products/${productId}`
        );
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [params]);

  const handleDelete = async () => {
    try {
      const { productId } = params as { productId: string };
      const token = Cookies.get('token');
      await axios.delete(`http://localhost:8080/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigation.push('/products');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const imageUrl = "http://localhost:8080/" + product.imageUrl.replace("src/", "");

  return (
    <>
    <Navbar/>
    <div className="flex justify-center flex-wrap p-2 gap-5">
    <Card>
            <CardHeader>
              <Image
                className="rounded-md"
                src={imageUrl}
                alt="Product"
                layout="fixed"
                width={250}
                height={250}
                objectFit="cover"
              />
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <p>$ {product.price}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigation.push('/products')} variant="outline" className="text-red-500">
                Go Back to Product List
              </Button>
              <Button onClick={() => navigation.push(`/products/update/${product._id}`)} variant="outline" className="text-blue-500">
              Update Product
            </Button>
              <Button onClick={handleDelete} variant="outline" className="text-blue-500">
              Delete Product
            </Button>
            </CardFooter>
    </Card>
    </div>
      <button onClick={() => navigation.push('/products')}>Go Back to Product List</button>
    </>
  );
}
