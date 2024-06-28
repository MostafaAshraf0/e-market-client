import Cookies from 'js-cookie';
import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = [
  { path: '/products/create', roles: ['editor','admin'] },
  { path: '/products/update', roles: ['editor','admin'] },
  { path: '/admin', roles: ['editor','admin'] },
  { path: '/admin/dashboard', roles: ['editor','admin'] },
  { path: '/admin/dashboard/userslist', roles: ['editor','admin'] },
  { path: '/admin/dashboard/products', roles: ['editor','admin'] },
];

interface JWTPayload {
  role: string;
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }
  return secret;
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const protectedRoute = protectedRoutes.find(
    (route) => route.path === request.nextUrl.pathname
  );

  if (!protectedRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/user/signin', request.url));
  }

  try {
    const secret = new TextEncoder().encode(getJwtSecret());
    const { payload } = await jwtVerify(token, secret) as { payload: JWTPayload };

    if (protectedRoute.roles && !protectedRoute.roles.includes(payload.role)) {
      return NextResponse.redirect(
        new URL('/user/unauthorized', request.url)
      );
    }

    return NextResponse.next();
  } catch (err) {
    console.error('Error during JWT verification:', err);
    return NextResponse.redirect(new URL('/user/signin', request.url));
  }
}

export const config = {
  matcher: [
    '/products/create',
    '/products/update',
    '/admin',
    '/admin/dashboard',
    '/admin/dashboard/userslist',
    '/admin/dashboard/products',
  ],
};