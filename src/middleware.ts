import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("middleware");
  const token = request.cookies.get("nextauth-token");
  const refToken = request.cookies.get("nextauth-refresh-token");
  const userId = request.cookies.get("nextauth-id");
  if (!token && !refToken) {
    console.log("no token");
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } else {
    console.log(token);
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin", "/list/:path*"],
};
