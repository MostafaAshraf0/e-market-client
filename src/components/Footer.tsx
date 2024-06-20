import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

export default function Footer(){
    return(
        <div className="relative h-32 md:h-52 w-full">

        <div className="absolute inset-x-0 bottom-0 h-16 ">
        <footer className="flex justify-around pt-4 w-full bg-zinc-50 dark:bg-zinc-900 mt-3 min-h-52 ">
            <div>
                <h1>
                Contact Us
                <h2>Email : <span className="opacity-50">puzzless.games@gmail.com</span></h2>
                <h2>Phone : <span className="opacity-50">+9050505050</span></h2>
                </h1>
            </div>
            <div>
                <h1>
                Follow Us
                <Link href={'https://www.instagram.com/puzzless.games/?igsh=Mjk4ZzNwZGVjYXY2&utm_source=qr'}>
                <FaInstagram className="size-10"/>
                </Link>
                </h1>
            </div>
        </footer>
        </div>
        </div>
    );
}