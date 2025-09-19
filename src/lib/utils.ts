import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleApiError(err: any) {
  // Check if there are validation errors in the response
  const validationErrors = err?.response?.data?.errors;

  if (validationErrors) {
    // Loop through validation errors and display each as a separate toast
    Object.entries(validationErrors).forEach(([field, messages]) => {
      if (Array.isArray(messages)) {
        messages.forEach((message) => {
          toast.error(`${field}: ${message}`);
        });
      } else if (typeof messages === "string") {
        toast.error(`${field}: ${messages}`);
      }
    });
  } else {
    // Display a generic error message if no validation errors
    toast.error(err?.response?.data?.message || "An error occurred");
  }

  console.error("API Error:", err);
}
