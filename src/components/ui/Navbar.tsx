"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../ModeToggle";
import Link from "next/link";
import LogoutButton from "../logoutButton";
import AuthWrapper from '@/components/AuthWrapper';
import dynamic from "next/dynamic";
import Search from "../Search";

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between p-2 gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex pt-2  gap-5">
          <ul>
            <Link href="/">
            <h1 className="hover:text-slate-200 dark:hover:text-slate-700">Home</h1>
            </Link>
          </ul>
          <ul>
            <Link href="/products">
            <h1 className="hover:text-slate-200 dark:hover:text-slate-700">Products</h1>
            </Link>
          </ul>
          <ul>
            <h1 className="hover:text-slate-200 dark:hover:text-slate-700">Cart</h1>
          </ul>
          <ul>
          <AuthWrapper
          authenticated={
            <Link href="/products/create">
            <h1 className="hover:text-slate-200 dark:hover:text-slate-700">Create Product</h1>
            </Link>
          }
          />
          </ul>
        </div>
        <div>
          {/* <Input type="email" placeholder="Search" /> */}
          <Search/>
        </div>
        <AuthWrapper
        authenticated={<LogoutButton />}
        unauthenticated={<Link href="/user/signin"><Button>Sign In</Button></Link>}
      />
        <ul>
          <ModeToggle />
        </ul>
      </nav>
    </>
  );
}
