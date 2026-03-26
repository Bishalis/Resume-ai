import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(req:NextRequest){
    const token  = await getToken({req, secret:process.env.BETTER_AUTH_SECRET})
    if(!token){
        const absoluteURL = new URL("/login", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL);
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/analyze", "/contact"],
};