import Cookies from 'js-cookie';
import { NextResponse, NextRequest } from 'next/server';

// Define protected routes
const protectedRoutes = ['/products/create'];

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get('token')?.value;
  // const token = localStorage.getItem('token');

  console.log('samo 3aleko');

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL('/user/signin', request.url));
    }
  }
  return NextResponse.next();
}


export const config = {
  matcher: ['/products/create'],
};