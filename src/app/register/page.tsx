"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

// Schema
const formSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    model: z.string().min(1, "Please select a model"),
    serial: z.string().min(5, "Serial number must be at least 5 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
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
    alert("Certificate generated successfully!");
    router.push("/sign-in");
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center font-sans px-6 bg-black relative"
      style={{
        backgroundImage: "url('/logo.png')", // put your transparent logo here
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Page Content */}
      <div className="relative z-10 w-full max-w-md rounded-2xl p-8 border border-white shadow-lg">
        <h2 className="text-2xl font-semibold mb-8 text-center text-white">
          Register Eyewear
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="w-full rounded-md bg-black border border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="E-mail "
              {...register("email")}
              className="w-full rounded-md bg-black border border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Sunglasses Model */}
          <div>
            <select
              {...register("model")}
              className="w-full rounded-md bg-black border border-gray-700 px-4 py-3 text-gray-400 focus:outline-none focus:border-[#d4af37] transition"
            >
              <option value="">Sunglasses Model</option>
              <option value="classic">Classic</option>
              <option value="aviator">Aviator</option>
              <option value="sport">Sport</option>
            </select>
            {errors.model && (
              <p className="text-red-500 text-sm mt-1">
                {errors.model.message}
              </p>
            )}
          </div>

          {/* Serial Number */}
          <div>
            <input
              type="text"
              placeholder="Serial Number"
              {...register("serial")}
              className="w-full rounded-md bg-black border border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition"
            />
            {errors.serial && (
              <p className="text-red-500 text-sm mt-1">
                {errors.serial.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full rounded-md bg-black border border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="w-full rounded-md bg-black border border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a
              href="/reset-password"
              className="text-sm text-[#d4af37] hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="relative w-full py-3 mt-2 rounded-lg text-[#d4af37] border border-[#d4af37] hover:bg-[#d4af37] hover:text-black transition"
          >
            Register Ownership
          </button>

          <a
            href="/sign-in"
            className="text-sm text-[#d4af37] hover:underline text-center"
          >
            Already a member?
            <span className="font-[700]"> Sign in</span>
          </a>
        </form>
      </div>
    </main>
  );
}
