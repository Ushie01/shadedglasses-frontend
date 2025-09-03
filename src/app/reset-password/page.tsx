"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

// Schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    alert("Password reset link sent!");
    router.push("/sign-in");
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center font-sans px-6 bg-black relative"
      style={{
        backgroundImage: "url('/logo.png')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Page Content */}
      <div className="relative z-10 w-full max-w-md rounded-2xl p-8 border-white border-[0.5px] shadow-lg">
        <h2 className="text-2xl font-semibold mb-8 text-center text-white">
          Forgot Password Page
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="E-mail"
              {...register("email")}
              className="w-full rounded-md bg-black border border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="/reset-password"
              className="text-sm text-[#d4af37] hover:underline"
            >
              Forgot Password? <span className="font-[700]">Reset Now</span>
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="relative w-full py-3 mt-2 cursor-pointer rounded-lg text-[#d4af37] border border-[#d4af37] hover:bg-[#d4af37] hover:text-black transition"
          >
            Send Password Reset Link
          </button>

          <a
            href="/sign-in"
            className="text-sm text-[#d4af37] hover:underline text-center"
          >
            Remembered your password?
            <span className="font-[700]"> Login to your account</span>
          </a>
        </form>
      </div>
    </main>
  );
}
