"use client";
import React, { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import axios from 'axios';
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { GoArrowUpRight } from "react-icons/go";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Footer from "./Footer";
import { motion } from "framer-motion"

type Product = {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<{ products: Product[] }>(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const productsWithImageUrl = response.data.products.map((product) => {
          const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/` + product.imageUrl;
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

    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex  justify-center gap-5 p-5">
        <motion.h1
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center scroll-m-20 text-7xl font-extrabold tracking-tight lg:text-9xl">
          We Create
          <br />
          digital products
          <br />
          <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          className="scroll-m-20 border-b pb-2 text-5xl font-semibold tracking-tight first:mt-0 lg:text-8xl">
            that stand out.
          </motion.span>
          <br />
          <Link href={'/products'}>
          <span className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 inline-flex scroll-m-20  pb-2 text-xl font-semibold tracking-tight first:mt-0 lg:text-5xl gap-2">What Is New<GoArrowUpRight className="border-b mt-1 animate-bounce animate-infinite animate-ease-in-out"/> </span>
          </Link>
        </motion.h1>
      </div>

      <div className="flex justify-center">
        
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-xs lg:max-w-lg"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product._id}>
                <Link href={`/products/${product._id}`} passHref>
                <div className="p-1">
                  <Card>
                    <CardContent className="relative flex aspect-square items-center justify-center  p-6">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        className="object-cover w-full h-full rounded-xl"
                        layout="fill"
                      />
                      <span className="absolute rounded-lg bottom-2 left-2 bg-black bg-opacity-50 text-white text-xl font-semibold p-1">
                        {product.title}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>

      </div>
      <Footer/>
    </>
  );
}
