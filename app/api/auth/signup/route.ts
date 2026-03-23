import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/db";
import { User } from "@/models/user";


interface UserCredentials {
    username:string,
    email:string,
    password:string
}


export async function POST (req:Request){
    const body:UserCredentials = await req.json();
    const {username,email,password} = body;

    if(!username || !email || !password){
        return NextResponse.json({error: "All fields are required"}, {status:400});
    }

    await connectToDatabase();

    const existingUser = await User.findOne({
        email,
    })

    if(existingUser){
        return NextResponse.json({error: "User with this email already exists"}, {status:400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    await User.create({
        name: username,
        email,
        password: hashedPassword,
    })

    
    return NextResponse.json({message: `Signed up with username: ${username}, email: ${email}`});


} 