"use client";
import AuthWrapper from '@/components/AuthWrapper';
import ProductList from '@/components/ProductList';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/Navbar';
import UsersList from '@/components/UsersList';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from "react";
import LogoutButton from "@/components/logoutButton";

export default function AdminNv(){
    
    return(
        <>
        <nav className="flex flex-wrap justify-between items-center p-2 gap-3">
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Link href="/">
        Home
        </Link>
        <Link href="/admin/dashboard">
        Dashboard
        </Link>
        <Link href="/admin/dashboard/userslist">
        Users List
        </Link>
        <Link href="/admin/dashboard/products">
        Products List
        </Link>
        <AuthWrapper
            authenticated={
              <Link href="/products/create">
                <h1 className="hover:text-slate-200 dark:hover:text-slate-700">Create Product</h1>
              </Link>
            }
          roles={['admin']}
          />
          <AuthWrapper/>
        <AuthWrapper
        authenticated={<LogoutButton />}
        unauthenticated={<Link href="/user/signin"><Button>Sign In</Button></Link>}
      />
        </nav>
        </>
    );
}