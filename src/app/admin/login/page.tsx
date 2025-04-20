"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    // Add login logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 px-5">
      <div className="bg-white py-8 px-5 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Please login to your account
        </p>
        <div className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full rounded-md"
            />
          </div>
          <Button
            onClick={handleLogin}
            className="bg-blue-500 text-white hover:bg-blue-600 w-full py-2 rounded-md mt-4"
          >
            Login
          </Button>
        </div>
        {/* <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default LoginPage;
