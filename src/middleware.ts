import { verifySession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/budgets/:path*',
    '/transactions/:path*',
    '/settings/:path*',
    '/login',
    '/register',
  ],
};

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value;
  const session = sessionCookie ? await verifySession(sessionCookie) : null;

  const pathname = request.nextUrl.pathname;

  const isProtectedRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/budgets') ||
    pathname.startsWith('/transactions') ||
    pathname.startsWith('/settings');

  const isAuthRoute =
    pathname.startsWith('/login') || pathname.startsWith('/register');

  if (isProtectedRoute && !session) {
    return Response.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && session) {
    return Response.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
