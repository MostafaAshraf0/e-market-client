"use client"
 
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/Navbar";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    // .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    // .regex(/[0-9]/, { message: 'Contain at least one number.' })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: 'Contain at least one special character.',
    // })
    .trim(),
    role: z.string(),
})

export default function Singup(){
  const [isLoading, setIsLoading] = useState(false)
  const [signupResult, setSignupResult] = useState<any>(null)
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      role: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      const response = await axios.put("http://localhost:8080/user/signup", values)
      setSignupResult(response.data)
      router.push('/user/signin');
    } catch (error) {
      console.error("Signup Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

    return(
      <>
      <Navbar />
      <div className="flex justify-center p-5">
        <Card className="flex justify-center flex-wrap p-2 gap-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 min-w-72">
              <h1>Sign Up</h1>
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
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
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Signing Up..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>

          {/* <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Role</FormLabel>
            <FormControl>
              <select {...field} className="block w-full p-2 border rounded">
                <option value="">Select a role</option>
                <option value="user">User</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}

          {signupResult && (
            <div className="mt-4">
              <p>{signupResult.message || "Signup request sent. Awaiting server response."}</p>
            </div>
          )}
        </Card>
      </div>
    </>
    );
}