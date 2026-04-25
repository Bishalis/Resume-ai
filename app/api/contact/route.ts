import connectToDatabase from "@/lib/db";
import { Contact } from "@/models/contact";
import { NextResponse } from "next/server";

interface contactCredentials {
    name: string;
    email: string;
    message: string;
}

export async function POST(req: Request) {
    try{
        const body: contactCredentials = await req.json();

        if (!body.name || !body.email || !body.message) {
            return new Response("All fields are required", { status: 400 });
        }

        // Here you would typically handle the contact form submission,
        await connectToDatabase();

        await Contact.create({
            name: body.name,
            email: body.email,
            message: body.message
        });

        return new NextResponse("Message send", { status: 201 });

    } catch (error) {
        console.error("Contact form submission error:", error);
}}