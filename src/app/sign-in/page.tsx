"use client";

import { SnackbarMessageType } from "@/enums/snackbarMessages";
import { LoginSchema, loginSchema } from "@/lib/formValidationSchemas";
import { signInRequest } from "@/services/authenticate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState<SnackbarMessageType>(
    SnackbarMessageType.Info,
  );
  const [message, setMessage] = useState("User registered successfully!");
  const [showMessage, setShowMessage] = useState(false);
  const { register, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      setLoading(true);
      const { token, refreshToken, user } = await signInRequest(data);
      console.log(refreshToken);
      const expirationDate = new Date(refreshToken.expiresIn * 1000);
      console.log("expirationDate: " + expirationDate);
      setCookie(undefined, "nextauth-token", token, {
        expires: expirationDate,
      });
      setCookie(undefined, "nextauth-refresh-token", refreshToken.id, {
        expires: expirationDate,
      });
      setCookie(undefined, "nextauth-id", user.id);
      setMessageType(SnackbarMessageType.Success);
      setMessage("User signed in successfully");
      setShowMessage(true);
      router.push("/admin");
    } catch (error) {
      setMessageType(SnackbarMessageType.Error);
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("An unknown error occurred while registering the user.");
      }
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
            Welcome Back!
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <input
                {...register("username")}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                {...register("password")}
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
                required
              />
              <a
                href="#"
                className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Forgot Password?
              </a>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                />
                <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Account
              </a>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
