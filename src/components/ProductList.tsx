"use client";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
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

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const itemsPerPage = 4;
  const router = useRouter();

  const fetchProducts = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<{ products: Product[], totalitems: number }>(
        "http://localhost:8080/products",
        { params: { page, limit: itemsPerPage } }
      );
      const productsWithImageUrl = response.data.products.map((product) => {
        const imageUrl = "http://localhost:8080/" + product.imageUrl.replace("src/", "");
        return { ...product, imageUrl };
      });
      setProducts(productsWithImageUrl);
      setTotalItems(response.data.totalitems);
    } catch (error) {
      setError((error as any).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center flex-wrap p-2 gap-5">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {products.map((product) => (
          <Card key={product._id}>
            <Link href={`/products/${product._id}`} passHref>
              
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
                  {/* <CardDescription>{product.description}</CardDescription> */}
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
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      <Footer />
    </>
  );
};