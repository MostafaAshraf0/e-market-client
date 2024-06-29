"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Navbar from "@/components/ui/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';

export interface Product {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  creator: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SearchResponse {
  products: Product[];
}

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    const fetchResults = async () => {
      if (keyword) {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get<SearchResponse>(`${process.env.NEXT_PUBLIC_API_URL}/search`, {
            params: { keyword }
          });
          setResults(response.data.products);
        } catch (err) {
          setError('Failed to fetch results');
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    };
  
    fetchResults();
  }, [keyword]);

  return (
    <>
      <Navbar />
      <div className="relative flex justify-center flex-wrap p-2 gap-5">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {results.length > 0 ? (
          results.map((product) => (
            <Card key={product._id} >
              <Link href={`/products/${product._id}`}>
              
              <CardHeader>
                <Image
                  className="rounded-md"
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${product.imageUrl.replace("src/", "")}`}
                  alt={product.title}
                  width={250}
                  height={250}
                  objectFit="cover"
                />
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              
              </Link>
              <CardContent>
                <p className="text-lg font-semibold">${product.price}</p>
              </CardContent>
              <CardFooter>
              <Button variant="outline" className="text-red-500">
                Add To Cart
              </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          !loading && !error && <p>No results found</p>
        )}
      </div>
    </>
  );
};

const SearchResultsWithSuspense: React.FC = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <SearchResults />
  </Suspense>
);

export default SearchResultsWithSuspense;
