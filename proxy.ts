import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow API routes to pass through (auth handling is done in the route handlers)
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Check for session cookie
  const sessionCookie = request.cookies.get("better-auth.session_token");

  if (!sessionCookie) {
    // If trying to access protected routes
    if (pathname === "/" || pathname.startsWith("/chat")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // If logged in and trying to access login/register
    if (["/login", "/register"].includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/chat/:id*",
    "/login",
    "/register",
  ],
};
