"use client"
import React from "react";
import PrimaryButton from "@/components/common/PrimaryButton";
import SocialLinks from "@/components/common/SocialLinks";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
export default function ContactPage() {
const[name,setName] = useState("");
const[email,setEmail] = useState("");
const[comment,setComment] = useState("");
  const handleContactForm = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     console.log(name,email,comment + "form submitted")
  }
  return (
    <div className="h-[100vh] flex items-center justify-center  lg:justify-around  mx-auto flex-col md:flex-row gap-10 ">
      <div className="md:w-[40vw]">
        <h1 className="font-extrabold  leading-snug text-4xl text-green-700">
          Feel free to contact us !
        </h1>
        <br />
        <p className="text-gray-600 text-2xl font-bold pb-10">If you have any enquiry or just want to say hi, please use the contact form!</p>
        <Link href={'mailto:shahibishal786526@gmail.com'} className="text-green-700 hover:underline flex gap-5 pb-10">
        <Mail ></Mail>
         example@gmail.com
        </Link>

        <p>Checkout our socials!</p>
         <div className="flex gap-5 pt-5">
          <SocialLinks></SocialLinks>
         </div>
      </div>
     
       
        <form
          method="post"
          onSubmit={handleContactForm}
          className="flex flex-col gap-10  md:w-[60vh] text-center mt-10 text-shadow-white shadow p-10"
        >
          <input
           required
            name="Name"
            placeholder="Enter your full name"
            className=" rounded-sm p-2 border-b-2 border-green-700"
            onChange={(e)=>setName(e.target.value)}

          />
            
          <input onChange={(e)=>setEmail(e.target.value)} name="Email" placeholder="Enter your Email " className="rounded-sm p-2 border-b-2 border-green-700" required />
          <textarea
          onChange={(e)=>setComment(e.target.value)}
            name=""
            id=""
            placeholder="Is there any concerns..."
            className="h-20 p-2 rounded border-2 border-green-700"
          required></textarea>
          <PrimaryButton>Submit</PrimaryButton>
        </form>


    </div>
  );
}
