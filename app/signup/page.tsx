import React from "react";
import PrimaryButton from "@/components/common/PrimaryButton";
import Link from "next/link";
const SignupPage = () => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center min-h-[100vh] p-20">
      <h2 className="text-green-700 font-extrabold text-3xl"> Please SignUp</h2>
      <form className="flex flex-col gap-4  p-10 rounded shadow-lg w-100vw  md:w-[30vw] lg:w-[40vw]">
        <label htmlFor="username" className="font-bold text-gray-600">
          Enter username
        </label>
        <input
          type="text"
          name="username"
          placeholder="Tevor@873339"
          className="p-3 border-b-2 rounded-sm border-green-700"
        />
        <br />

        <label htmlFor="Email" className="font-bold text-gray-600">
          Enter email
        </label>
        <input
          type="email"
          name="Email"
          placeholder="example@gmail.com"
          className="p-3 border-b-2 rounded-sm border-green-700"
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
        />
        <br />
        <label htmlFor="confirmPassword" className="font-bold text-gray-600">
          Confirm password
        </label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className="p-3 border-b-2 rounded-sm border-green-700"
        />
        <br />

        <PrimaryButton>Sign Up</PrimaryButton>
        <h1 className="text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-green-700 hover:underline">
            Login
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default SignupPage;
