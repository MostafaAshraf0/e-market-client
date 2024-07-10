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
import { BsCart3 } from "react-icons/bs";
import Image from 'next/image';
import textLogo from '../../../public/images/text-logo-b&R.png';
import textLogodark from '../../../public/images/text-logo-red.png';
import { motion } from "framer-motion"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { CiMenuBurger } from "react-icons/ci";

export default function Navbar() {
  return (
    <nav className="flex flex-wrap justify-between items-center p-2 gap-3">
      <div className="flex items-center gap-3">
        <Link href="/">
          <motion.div
            className="dark:hidden"
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
            <Image
              src={textLogo}
              alt="Logo"
              width={60}
              height={50}
              objectFit="cover"
            />
          </motion.div>

          <motion.div
            className="hidden dark:block"
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
            <Image
              src={textLogodark}
              alt="Logo"
              width={60}
              height={50}
              objectFit="cover"
            />
          </motion.div>
        </Link>
        <div className="absolute left-20 max-w-52">
          <Search/>
        </div>
        
      </div>

      <div className="hidden md:flex gap-5 flex-grow justify-center">
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
          <BsCart3 className="hover:text-slate-200 dark:hover:text-slate-700 size-5" />
        </ul>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="md:hidden">
          <CiMenuBurger className="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Navigation</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/">Home</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/products">Products</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/cart">
              <div className="flex items-center">
                <BsCart3 className="mr-2" />
                Cart
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <AuthWrapper
              authenticated={
                <Link href="/products/create">
                  <h1 className="hover:text-slate-200 dark:hover:text-slate-700">Create Product</h1>
                </Link>
              }
              roles={['admin']}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex gap-3">
        <AuthWrapper
          authenticated={<LogoutButton />}
          unauthenticated={<Link href="/user/signin"><Button>Sign In</Button></Link>}
        />
        <ul>
          <ModeToggle />
        </ul>
      </div>
    </nav>
  );
}
