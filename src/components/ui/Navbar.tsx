import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../ModeToggle";
import Link from "next/link";
import LogoutButton from "../logoutButton";
import AuthWrapper from '@/components/AuthWrapper';

export default function Navbar() {
  return (
    <>
      <nav className="flex justify-between p-2 gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex  gap-2">
          <ul>
            <Link href="/">
            <Button>Home</Button>
            </Link>
          </ul>
          <ul>
            <Link href="/products">
            <Button>Products</Button>
            </Link>
          </ul>
          <ul>
            <Button>Cart</Button>
          </ul>
          <ul>
          <AuthWrapper
          authenticated={
            <Link href="/products/create">
            <Button>create product</Button>
            </Link>
          }
          />
          </ul>
        </div>
        <div>
          <Input type="email" placeholder="Search" />
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
