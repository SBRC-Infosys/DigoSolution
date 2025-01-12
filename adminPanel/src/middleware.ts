import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie } from 'cookies-next';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Fetch the token and user information from cookies
  const token = getCookie('token', { req: request });
  const user = getCookie('user', { req: request });

  const userNavigatingRoute = request.nextUrl.pathname;

  // If there's no token or user, redirect to signin
  if (!token || !user) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Parse user object from the cookie if needed (assumes it's JSON stringified)
  const parsedUser = JSON.parse(user);

  // Check if the user is trying to access an admin route
  if (userNavigatingRoute.startsWith('/admin')) {
    const userRole = parsedUser.role;

    // Allow access only if the user has 'admin' role
    if (userRole !== 'admin') {
      return NextResponse.redirect(new URL('/not-found', request.url));
    }
  }

  // Allow access to other routes if everything is valid
  return NextResponse.next();
}

// See "Matching Paths" below
export const config = {
  matcher: ['/admin/:path*','/:path'], // Apply middleware to /admin and all its subroutes
};
