"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100 dark:bg-neutral-950">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg p-6 sm:p-8 bg-white dark:bg-neutral-900 rounded-xl shadow-lg space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">Login</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      type="email"
                      {...field}
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="text-sm pr-10"
                      />
                      {/* Eye Toggle Icon */}
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>

                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Forgot Password Link */}
            <div className="text-sm text-left">
              <Link
                href="/forgot-password"
                className="text-gray-600 hover:font-semibold hover:underline hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Button type="submit" className="w-full text-sm sm:text-base cursor-pointer">
              Login
            </Button>
          </form>
        </Form>

       {/* Register Redirect */}
        <div className="text-center">
          <p className="text-sm">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="inline-block text-sm font-semibold text-black hover:underline dark:text-white"
            >
              Go to Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
