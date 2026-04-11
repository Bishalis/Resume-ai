"use client";

import PrimaryButton from "@/components/common/PrimaryButton";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors("");
    setMessage("");

    if (!email || !password) {
      setErrors("Please fill in all fields");
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setErrors("Invalid email or password");
      return;
    }

    setMessage("Login successful");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10">
      <h2 className="text-3xl font-extrabold text-green-700">Please Login</h2>

      <form
        className="flex w-full max-w-md flex-col gap-2 rounded p-10 shadow-lg"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="font-bold text-gray-600">
          Enter email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="example@gmail.com"
          className="w-full rounded-sm border-b-2 border-green-700 p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password" className="mt-4 font-bold text-gray-600">
          Enter password
        </label>
        <div className="relative mt-2">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            className="w-full rounded-sm border-b-2 border-green-700 p-3 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {errors && (
          <div className="mt-4 rounded-md bg-red-50 p-3 text-center text-sm font-medium text-red-700">
            {errors}
          </div>
        )}

        {message && (
          <div className="mt-4 rounded-md bg-green-50 p-3 text-center text-sm font-medium text-green-700">
            {message}
          </div>
        )}

        <div className="mt-4">
          <PrimaryButton>Login</PrimaryButton>
        </div>

        <h1 className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-green-700 hover:underline">
            Sign Up
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default LoginPage;