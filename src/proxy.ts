import { NextResponse } from "next/server";

import { auth } from "@/auth";

export const proxy = auth((req) => {
  const isAuthenticated = !!req.auth;

  if (req.nextUrl.pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
