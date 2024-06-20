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
        const response = await axios.get<{ products: Product[] }>("http://localhost:8080/products");
        const productsWithImageUrl = response.data.products.map((product) => {
          const imageUrl = "http://localhost:8080/" + product.imageUrl.replace("src/", "");
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
        <h1 className="text-center scroll-m-20 text-7xl font-extrabold tracking-tight lg:text-9xl">
          We Create
          <br />
          digital products
          <br />
          <span className="scroll-m-20 border-b pb-2 text-5xl font-semibold tracking-tight first:mt-0 lg:text-8xl">
            that stand out.
          </span>
          <br />
          <Link href={'/products'}>
          <span className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 inline-flex scroll-m-20  pb-2 text-xl font-semibold tracking-tight first:mt-0 lg:text-5xl gap-2">What Is New<GoArrowUpRight className="border-b mt-1"/> </span>
          </Link>
        </h1>
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
