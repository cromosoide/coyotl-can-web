import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except login page itself)
  if (pathname.startsWith("/admin")) {
    // Allow the login page
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const session = request.cookies.get("coyotl_session");
    if (!session || session.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
