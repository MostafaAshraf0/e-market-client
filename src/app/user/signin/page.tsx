"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Card} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/ui/Navbar";
import axios from "axios"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { jwtDecode } from "jwt-decode";
import { handleLogout } from '@/utils/logout';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    // .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    // .regex(/[0-9]/, { message: 'Contain at least one number.' })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: 'Contain at least one special character.',
    // })
    .trim(),
})

export default function Singup(){
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<any>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const setLogoutTimeout = (expiresIn: number) => {
    const timeout = expiresIn - Date.now();
    setTimeout(() => {
      handleLogout();
    }, timeout);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setLoginError(null)
    try {
      const response = await axios.post(`${process.env.API_URL}/user/login`, values)
      const { token, userId } = response.data

      Cookies.set('token', token, { expires: 1 , path: '/' });
      Cookies.set('userId', userId, { expires: 1, path: '/' });
      // localStorage.setItem('token', token)
      // localStorage.setItem('userId', userId)

      const decodedToken: { exp: number, role: string } = jwtDecode(token);
      setLogoutTimeout(decodedToken.exp * 1000);
      Cookies.set('role', decodedToken.role, { expires: 1, path: '/' });

      

      router.push('/')
    } catch (error) {
      setLoginError("Invalid email or password. Please try again.")
      console.error("Login Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

    return(
      <>
      <Navbar />
      <div className="flex justify-center p-5">
        <Card className="flex justify-center flex-wrap p-2 gap-5 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 min-w-72">
              <h1>Sign In</h1>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {loginError && (
                <p className="text-red-500">{loginError}</p>
              )}
              <Link href="/user/signup">
                <p  className="text-gray-500 hover:text-gray-400 pt-2 ">
                Don&rsquo;t Have Acount ?
                </p>
              </Link>
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </>
    );
}