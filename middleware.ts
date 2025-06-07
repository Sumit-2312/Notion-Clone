// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const protectedRoutes = ["/login", "/register"];
  const { pathname } = request.nextUrl;

  // Assume you have an "authToken" cookie (could be named differently!)
//   const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  // or we can also fetch the token from the cookies
   const token = request.cookies.get('next-auth.session-token')?.value;
 // we can not use getServerSession or useSession bcz middleware in nextjs runs on edge and does not use nodejs api
 

  // If user is already logged in and trying to access login/register, redirect
  if (protectedRoutes.includes(pathname)) {
    if (token) {
      // User is logged in; redirect to homepage
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Otherwise, continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};
