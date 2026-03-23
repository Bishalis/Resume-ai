import { isAuthenticated } from "@/Utils/Auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/analyze","/contact","dashboard"];

export default function protectUserMiddleWare(req:NextRequest){
    if(!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)){
        const absoluteURL = new URL("/login", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL);
    }
     
}