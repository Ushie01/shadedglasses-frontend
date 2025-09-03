"use client";

import { usePathname } from "next/navigation";
import Dashboard from "./pages/dashboard";
import Owner from "./pages/owner";

export default function User() {
  const pathname = usePathname();

  return (
    <div className="">
      <div>{pathname?.includes("Dashboard") && <Dashboard />}</div>
      <div>{pathname?.includes("Owner") && <Owner />}</div>
    </div>
  );
}
