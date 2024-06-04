import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import Image from "next/image";
import axios from 'axios';

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

interface SearchProps {
  placeholder?: string;
}

const Search: React.FC<SearchProps> = ({ placeholder = "Search..." }) => {
  const [keyword, setKeyword] = useState<string>('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (keyword) {
        setLoading(true);
        setError(null);
        setHasSearched(true);
        try {
          const response = await axios.get<SearchResponse>(`http://localhost:8080/search`, {
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
        setError(null);
        setHasSearched(false);
      }
    };

    fetchResults();
  }, [keyword]);

  return (
    <>
      <div className="flex justify-center flex-wrap gap-5">
        <div className="w-full max-w-md">
          <Input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={placeholder}
          />
        </div>
      </div>

      <div className="flex justify-center flex-wrap p-2 gap-5">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {results.length > 0 ? (
          results.map((product) => (
            <div key={product._id} className="w-full max-w-md p-4 m-2 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-bold">{product.title}</h2>
              <Image
                className="rounded-md"
                src={`http://localhost:8080/${product.imageUrl.replace("src/", "")}`}
                alt={product.title}
                width={250}
                height={250}
                objectFit="cover"
              />
              <p>{product.description}</p>
              <p className="text-lg font-semibold">${product.price}</p>
            </div>
          ))
        ) : (
          
          hasSearched && !loading && !error && <p>No results found</p>
          
        )}
      </div>
    </>
  );
};

export default Search;
