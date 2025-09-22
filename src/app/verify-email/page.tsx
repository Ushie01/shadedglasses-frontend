"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForgotPassword, useVerifyEmail } from "@/api/auth";
import { handleApiError } from "@/lib/utils";
import { toast } from "sonner";

// Schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export default function VerifyEmail() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const { mutate, isPending } = useVerifyEmail();
  const { mutate: resendOtpMutate, isPending: isResending } =
    useForgotPassword();

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // Function to handle OTP resend
  const handleResendOtp = () => {
    if (!canResend) return;

    // Get the email from the form
    const email = getValues("email");

    if (!email) {
      toast?.error("Please enter your email address first");
      return;
    }

    // Call the API to resend OTP
    resendOtpMutate(
      { email },
      {
        onSuccess: () => {
          toast?.success("OTP has been resent to your email");
          // Reset countdown
          setCountdown(60);
          setCanResend(false);
        },
        onError: (err) => {
          handleApiError(err);
        },
      }
    );
  };

  const onSubmit = (data: any) => {
    // console.log("Form Data:", data);

    mutate(
      {
        email: data.email,
        token: data.otp,
      },
      {
        onSuccess: (response) => {
          toast?.success("Password reset successfully");
          router.push("/sign-in");
        },
        onError: (err) => {
          // handleApiError(err);
          toast?.error(
            "Invaild OTP or Password, kindly re-check for otp and password"
          );
        },
      }
    );
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center font-sans px-6 bg-black relative">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Page Content */}
      <div className="relative z-10 w-full max-w-md rounded-2xl p-8 border-[#92B917] border-[0.5px] shadow-lg">
        <h2 className="text-2xl font-semibold mb-8 text-center text-white">
          Email verification
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <input
              type="text"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full rounded-md bg-black border border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-[#92B917] transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* OTP */}
          <div>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter 6-digit OTP sent to your email"
              {...register("otp")}
              className="w-full rounded-md bg-black border border-gray-700 px-4 py-3 text-white focus:outline-none focus:border-[#92B917] transition"
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          <div className="flex items-center justify-end text-white">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={!canResend || isResending}
              className={`text-xs ${
                canResend && !isResending
                  ? "text-[#92B917] cursor-pointer"
                  : "text-gray-500 cursor-not-allowed"
              }`}
            >
              {isResending
                ? "Sending..."
                : canResend
                ? "Resend OTP"
                : `Resend OTP in ${countdown}s`}
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="relative w-full py-3 mt-2 cursor-pointer rounded-lg text-white border border-[#92B917] hover:bg-[#92B917] hover:text-black transition"
          >
            {isPending ? "Sending..." : "Confirmed"}
          </button>
        </form>
      </div>
    </main>
  );
}
