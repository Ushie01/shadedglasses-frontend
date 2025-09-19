"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to logout");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="border-[#92B917] text-[#92B917] hover:bg-[#92B917] hover:text-black"
    >
      <LogOut size={18} />
      Logout
    </Button>
  );
};

export default LogoutButton;