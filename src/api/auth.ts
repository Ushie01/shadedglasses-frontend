import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";

// sign-in
async function signInUser(payload: { email: string; password: string }) {
  try {
    const { data } = await api.post("/auth/login", payload);
    return data;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
}

export function useSignIn() {
  return useMutation({
    mutationFn: signInUser,
  });
}

// register
async function registerUser(payload: {
  fullName: string;
  email: string;
  password: string;
  model: string;
  serialNumber: string;
  role: string;
}) {
  try {
    const { data } = await api.post("/auth/register", payload);
    return data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
}

export function useSignUp() {
  return useMutation({
    mutationFn: registerUser,
  });
}
