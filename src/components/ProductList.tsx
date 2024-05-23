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
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
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

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

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
      <div className="flex justify-center flex-wrap p-2 gap-5">
        {products.map((product) => (
          <Card key={product._id}>
            <Link href={`/products/${product._id}`}>
            
            <CardHeader>
              <Image
                className="rounded-md "
                src={product.imageUrl}
                alt="Product"
                layout="fixed"
                width={250}
                height={250}
                objectFit="cover"
              />
              <CardTitle>{product.title}</CardTitle>
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
