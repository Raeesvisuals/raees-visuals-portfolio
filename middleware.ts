import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path starts with /secure-admin (but not /secure-admin/login)
  if (pathname.startsWith('/secure-admin') && pathname !== '/secure-admin/login') {
    const session = request.cookies.get('admin_session');
    
    // If no session cookie, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL('/secure-admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/secure-admin/:path*',
  ],
};
