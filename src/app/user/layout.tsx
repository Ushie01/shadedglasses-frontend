"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LayoutDashboard,
  User,
  Infinity,
  FileText,
  Repeat,
  Folder,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LogoutButton from "@/components/LogoutButton";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const pathname = usePathname();

  const currentPage = pathname.split("/").pop();
  // console.log(currentPage);

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      link: "/user/dashboard",
    },
    {
      label: "Owners",
      icon: User,
      link: "/user/owner",
    },
    {
      label: "Profile",
      icon: User,
      link: "/user/profile",
    },
    {
      label: "Sunglasses",
      icon: Infinity,
      link: "/user/sunglasses",
    },
    {
      label: "Certificates",
      icon: FileText,
      link: "/certificate",
    },
    {
      label: "Transfers",
      icon: Repeat,
      link: "/transfers",
    },
    {
      label: "Content Manager",
      icon: Folder,
      link: "/content-manager",
    },
  ];

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111] p-6 flex flex-col gap-6">
        {/* <div className="flex items-center gap-2 text-[#92B917] font-bold">
          <p className="text-2xl">SHADED GODDESS</p>
        </div> */}

        <div className="flex items-center w-full justify-center">
          <Image
            sizes="100"
            src="/logo.png"
            width={150}
            height={150}
            alt="logo"
          />
        </div>

        {menuItems.map((item: any, idx: number) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.label;

          return (
            <Link href={item.link || "#"} key={item.label}>
              <div
                key={idx}
                onClick={() => setActiveMenu(item.label)}
                className={`flex items-center space-x-3 py-1 h-[47px] cursor-pointer rounded-lg w-full justify-start pl-2 transition-all duration-300 ease-in-out ${
                  isActive
                    ? "bg-[#92B917] text-black font-semibold transform"
                    : "hover:bg-gray-400 hover:transform hover:translate-x-2 text-gray-200"
                }`}
              >
                {isActive && (
                  <div className="h-full w-1 rounded-full bg-black"></div>
                )}
                <Icon size={20} />
                <span className="text-[16px]">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold mb-6 mt-20 capitalize">
            {currentPage}
          </h1>
          <LogoutButton />
        </div>
        {/* Search + Export */}
        {children}
      </main>
    </div>
  );
}
