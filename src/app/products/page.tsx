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
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
};

export default function ProductCard() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  
  const handleClick = () => {
    router.push('/products/${product._id}');
  }
  const fetchProducts = async () => {
    try {
      const response = await axios.get<{ products: Product[] }>(
        "http://localhost:8080/products"
      );
      const productsWithImageUrl = response.data.products.map((product) => {
        const imageUrl = "http://localhost:8080/" + product.imageUrl.replace("src/","");
        console.log("Image URL:", imageUrl);
        return {
          ...product,
          imageUrl: imageUrl,
        };
      });
      setProducts(productsWithImageUrl);
    } catch (error) {
      console.error("Error fetching products:", (error as any).message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
    <Navbar/>
      <div className="flex justify-center flex-wrap p-2 gap-5">
        {products.map((product) => (
          <Card key={product._id}>
            <Link href={`/products/${product._id}`} onClick={ handleClick} passHref>
            
            <CardHeader>
              <Image
                className="rounded-md"
                src={product.imageUrl}
                alt="Product"
                layout="fixed"
                width={250}
                height={250}
                objectFit="cover"
              />
              <CardTitle className="max-w-screen-2xl">{product.title}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            </Link>
            <CardContent>
              <p>$ {product.price}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="text-red-500">
                Add To Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
