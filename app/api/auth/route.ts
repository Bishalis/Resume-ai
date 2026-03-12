import { NextResponse } from "next/server";
interface UserCredentials {
    email:String,
    password:String
}


export async function POST (req:Request){
    const body:UserCredentials = await req.json();
    const {email,password} = body;
    if(!email || !password){
        return NextResponse.json({error: "Email and password are required"}, {status:400});
    }


    return NextResponse.json({message: `Logged in with email: ${email}`});


} 