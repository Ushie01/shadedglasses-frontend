"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@/api/auth";
import { toast } from "sonner";
import { handleApiError } from "@/lib/utils";

// Schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // Define the type based on our schema
  type SignInFormData = z.infer<typeof formSchema>;

  const { mutate, isPending, error } = useSignIn();

  const onSubmit = (data: SignInFormData) => {
    mutate(data, {
      onSuccess: (response) => {
        console.log("Login success:", response);

        // Save user data and tokens to localStorage
        if (response?.data) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("tokens", JSON.stringify(response.data.tokens));
        }

        toast.success(response?.message || "Login successful");
        router.push("/home");
      },
      onError: (err: any) => {
        handleApiError(err);

        console.log(err, "err");
        toast.error(err?.response?.data?.message || "Login failed");
      },
    });
  };
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center font-sans px-6 bg-black relative"
      // style={{
      //   backgroundImage: "url('/logo.png')",
      //   backgroundSize: "contain",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Page Content */}
      <div className="relative z-10 w-full max-w-md rounded-2xl p-8 border-[#92B917] border-[0.1px] shadow-lg">
        <h2 className="text-2xl font-semibold mb-8 text-center text-white">
          Sign in to your portal
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full rounded-md bg-black border border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-[#92B917] transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full rounded-md bg-black border border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-[#92B917] transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white cursor-pointer"
            >
              {showPassword ? (
                <EyeOff size={20} color="#92B917" />
              ) : (
                <Eye size={20} color="#92B917" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="/forgot-password"
              className="text-sm text-white hover:underline"
            >
              Forgot Password? <span className="font-[700]">Reset Now</span>
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="relative w-full py-3 mt-2 cursor-pointer rounded-lg text-white border border-[#92B917] hover:bg-[#92B917] hover:text-black transition"
          >
            {isPending ? "Signing in..." : "Sign in"}
          </button>

          <a
            href="/register"
            className="text-sm hover:underline text-center text-white"
          >
            New here?
            <span className="font-[700]"> Register eyewear</span>
          </a>
        </form>
      </div>
    </main>
  );
}
