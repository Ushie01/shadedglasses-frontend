"use client";

import { usePathname } from "next/navigation";
import Dashboard from "./dashboard/page";
import Owner from "./owner/page";
import Sunglasses from "./sunglasses/page";
import Profile from "./profile/page";

export default function User() {
  const pathname = usePathname();

  return (
    <div className="">
      <div>{pathname?.includes("dashboard") && <Dashboard />}</div>
      <div>{pathname?.includes("owner") && <Owner />}</div>
      <div>{pathname?.includes("profile") && <Profile />}</div>
      <div>{pathname?.includes("sunglasses") && <Sunglasses />}</div>
    </div>
  );
}
