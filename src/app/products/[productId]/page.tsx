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
import Footer from "@/components/Footer";
import AuthWrapper from '@/components/AuthWrapper';

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
          `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
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
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/delete/${productId}`, {
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

  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/` + product.imageUrl.replace("src/", "");

  return (
    <>
    <Navbar/>
    <div className="flex justify-center p-5">
              <Image
                className="rounded-md"
                src={imageUrl}
                alt={product.title}
                layout="intrinsic"
                width={680}
                height={384}
                objectFit="cover"
                loading = 'lazy'
              />
    </div>
    <div className="flex justify-center flex-wrap p-2 gap-5 ">
    <Card className="min-w-80 w-1/2">
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <p>$ {product.price}</p>
            </CardContent>
            <CardFooter className="gap-5">
            <Button variant="outline" className="text-red-500">
                Add To Cart
              </Button>
              <AuthWrapper
              creator={product.creator}
              authenticated={
              <>
              <Button onClick={() => navigation.push(`/products/update/${product._id}`)} variant="outline" className="text-blue-500">
              Update Product
            </Button>
              <Button onClick={handleDelete} variant="outline" className="text-blue-500">
              Delete Product
            </Button>
            </>
            }
              />
              
            </CardFooter>
    </Card>
    </div>
            <div className="p-2">
              <Button onClick={() => navigation.push('/products')} variant="outline">
                Go Back to Product List
              </Button>
            </div>
    <Footer/>
    </>
  );
}
