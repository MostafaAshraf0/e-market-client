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
import AddToCart from "@/components/AddToCart";

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
    <div className="p-2">
              <Button onClick={() => navigation.push('/products')} variant="secondary">
                Go Back to Product List
              </Button>
            </div>
    <div className="flex justify-center flex-wrap p-2 gap-5 ">
              <Image
                className="rounded-md"
                src={imageUrl}
                alt={product.title}
                layout="intrinsic"
                width={680}
                height={384}
                objectFit="cover"
                loading = 'lazy'
                unoptimized
              />
    <Card className="lg:min-w-96 md:min-w-full min-w-full">
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <p>$ {product.price}</p>
            </CardContent>
            <CardFooter className="gap-5">
            <AddToCart productId={params.productId}/>
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
            
    <Footer/>
    </>
  );
}
