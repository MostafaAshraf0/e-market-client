import Cookies from 'js-cookie'; // Import js-cookie
import { NextResponse, NextRequest } from 'next/server';


const protectedRoutes = ['/products/create'];

export function middleware(request: NextRequest) {

  const token = Cookies.get('token');

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