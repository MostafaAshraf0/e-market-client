"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { GoSearch } from "react-icons/go";
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

const Search: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (keyword) {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get<SearchResponse>(`${process.env.NEXT_PUBLIC_API_URL}/search`, {
            params: { keyword }
          });
          setSuggestions(response.data.products);
        } catch (err) {
          setError('Failed to fetch results');
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [keyword]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword) {
      router.push(`/searchresults?keyword=${keyword}`);
    }
  };

  const handleSuggestionClick = (suggestion: Product) => {
    setKeyword(suggestion.title);
    router.push(`/searchresults?keyword=${suggestion.title}`);
  };

  return (
    <>
      <div className="relative flex justify-center flex-wrap gap-5">
        <div className="w-full max-w-md relative" ref={searchContainerRef}>
          <form onSubmit={handleSearch}>
            <div className="relative flex items-center">
              <Input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search..."
                className="pr-16"
              />
              <Button type="submit" variant="outline" className="absolute right-0 top-0 h-full">
                <GoSearch />
              </Button>
            </div>
          </form>
          {keyword && suggestions.length > 0 && (
            <div className="absolute z-10 text-white bg-zinc-950 border border-gray-200 w-full mt-1 rounded-lg">
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {suggestions.map((product) => (
                <div
                  key={product._id}
                  className="p-2 hover:bg-zinc-400 cursor-pointer"
                  onClick={() => handleSuggestionClick(product)}
                >
                  {product.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;