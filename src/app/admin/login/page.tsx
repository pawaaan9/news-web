"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // import router
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/api/auth.api";
import { jwtDecode } from "jwt-decode";
import { menuItems } from "@/data/admin-menu";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // initialize router

  const handleLogin = async () => {
    try {
      setError(null); // Clear previous errors
      const response = await login({ email, password });

      // Save token and userRole to localStorage
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Decode token to get userRole or userRoleNo
      const decoded: any = jwtDecode(token);
      const userRoleNo =
        typeof decoded.userRoleNo !== "undefined"
          ? Number(decoded.userRoleNo)
          : typeof decoded.userRole !== "undefined"
          ? Number(decoded.userRole)
          : 0;
      localStorage.setItem("userRole", String(userRoleNo));

      // Find first accessible menu item
      const firstMenu = menuItems.find(
        (item) => Array.isArray(item.roles) && item.roles.includes(userRoleNo)
      );
      router.push(firstMenu ? firstMenu.href : "/admin/content");
    } catch (err: unknown) {
      console.error("Login failed:", err);

      // Narrow down the error type
      if (err instanceof Error) {
        setError(err.message || "An error occurred during login.");
      } else if (typeof err === "object" && err !== null && "response" in err) {
        const errorResponse = (
          err as { response?: { data?: { message?: string } } }
        ).response;
        setError(
          errorResponse?.data?.message || "An error occurred during login."
        );
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-5">
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
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          <Button
            onClick={handleLogin}
            className="bg-blue-500 text-white hover:bg-blue-600 w-full py-2 rounded-md mt-4"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
