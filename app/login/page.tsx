"use client"
import PrimaryButton from "@/components/common/PrimaryButton";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react"

const LoginPage = () => {
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any)=>{
     e.preventDefault();
     await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/"
    })
  }

  return (
    <div className="flex flex-col gap-10 justify-center items-center min-h-[100vh] ">
      <h2 className="text-green-700 font-extrabold text-3xl"> Please Login</h2>
      <form className="flex flex-col gap-2  p-10 rounded shadow-lg w-100vw  md:w-[30vw] lg:w-[40vw]" onSubmit={handleSubmit}>
        <label htmlFor="Email" className="font-bold text-gray-600">
          Enter email
        </label>
        <input
          type="email"
          name="Email"
          placeholder="example@gmail.com"
          className="p-3 border-b-2 rounded-sm border-green-700"
           onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <label htmlFor="Password" className="font-bold text-gray-600">
          Enter password
        </label>
        <input
          type="password"
          name="Password"
          placeholder="Enter your password"
          className="p-3 border-b-2 rounded-sm border-green-700"
           onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <PrimaryButton>Login</PrimaryButton>
        <h1 className="text-center">
          Does't have an account?{" "}
          <Link href="/signup" className="text-green-700 hover:underline">
            Sign Up
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default LoginPage;
