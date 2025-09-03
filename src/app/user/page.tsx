"use client";

import { usePathname } from "next/navigation";
import Dashboard from "./dashboard/page";
import Owner from "./owner/page";
import Sunglasses from "./sunglasses/page";

export default function User() {
  const pathname = usePathname();

  return (
    <div className="">
      <div>{pathname?.includes("Dashboard") && <Dashboard />}</div>
      <div>{pathname?.includes("Owner") && <Owner />}</div>
      <div>{pathname?.includes("Sunglasses") && <Sunglasses />}</div>
      <div>{pathname?.includes("Sunglasses") && <Sunglasses />}</div>
      <div>{pathname?.includes("Sunglasses") && <Sunglasses />}</div>
      <div>{pathname?.includes("Sunglasses") && <Sunglasses />}</div>
    </div>
  );
}
