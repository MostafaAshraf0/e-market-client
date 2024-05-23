"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/Navbar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from 'js-cookie';


const formSchema = z.object({
  title: z.string().max(10).min(2, {
    message: "Title must be at least 2 characters.",
  }),
  image: z.any(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.string().min(1, {
    message: "Price must be at least 1 character.",
  }),
});
// const token = localStorage.getItem('token');
// const getCookie = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// };


export default function CreateProduct() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false);
  const [createProductResult, setCreateProductResult] = useState<any>(null);

  // const staticCreator = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOiI2NjM0Y2Q4YzZhZTMxNjMwYzRmZjI5NjMiLCJpYXQiOjE3MTYzMjU5NzgsImV4cCI6MTcxNjMyOTU3OH0.3DRf3YPWSpyWnkAN20S84kmPFbIkdAZ1mRg42K4uNQQ";
  const token = Cookies.get('token');
  
  
  const createProduct = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('image', data.image[0]);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('creator', token || '');

      const response = await axios.post<{ message: string }>(
        "http://localhost:8080/product/create",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setCreateProductResult(response.data);
    } catch (error) {
      console.error("Error Creating Product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      image: null,
      description: "",
      price: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createProduct(values);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center p-4">
        <Card className="flex justify-center flex-wrap p-2 gap-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Type your Description " {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="outline"
                  >
                  {isLoading ? "Creating..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>

          <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your message has been sent.",
        })
      }}
    >
      Show Toast
    </Button>
          
          {createProductResult && (
            <div className=" mt-4">
              <p>
                {createProductResult.message ||
                  "Product creation request sent. Awaiting server response."}
              </p>
            </div>
          )}
          

        </Card>
      </div>
    </>
  );
}




