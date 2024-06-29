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
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from 'js-cookie';
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.string().min(1, { message: "Price must be at least 1 character." }),
  image: z.any().optional(),
});

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

export default function UpdateProduct({ params }: any) {
  const [product, setProduct] = useState<Product | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { productId } = params as { productId: string };
        if (!productId) {
          console.error('No product ID found in params');
          return;
        }

        const response = await axios.get<{ message: string; product: Product }>(
          `http://localhost:8080/products/${productId}`
        );
        setProduct(response.data.product);
        reset({
          title: response.data.product.title,
          description: response.data.product.description,
          price: response.data.product.price.toString()
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [params, reset]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('price', data.price);
      if (data.image?.[0]) {
        formData.append('image', data.image[0]);
      }
      // else {
      //   formData.append('imageUrl', product.imageUrl);
      // }
      
      const token = Cookies.get('token');
      const { productId } = params as { productId: string };

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/${productId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      router.push(`/products/${productId}`);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/` + product.imageUrl.replace("src/", "");

  return (
    <>
      <Navbar />
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
            <CardTitle>Update : {product.title}</CardTitle>
            <CardDescription>Update the product details below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label>Title</label>
                <Input {...register('title')} />
                {errors.title && <p>{errors.title.message}</p>}
              </div>
              <div>
                <label>Description</label>
                <Textarea {...register('description')} />
                {errors.description && <p>{errors.description.message}</p>}
              </div>
              <div>
                <label>Price</label>
                <Input {...register('price')} />
                {errors.price && <p>{errors.price.message}</p>}
              </div>
              <div>
                <label>Image</label>
                <Input type="file" {...register('image')}/>
              </div>
              <Button type="submit" variant="outline">
                Update Product
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/products')} variant="outline" className="text-red-500">
              Go Back to Product List
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
