"use client";

import { useState } from "react";
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

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const owners = [
    {
      name: "Alice Johnson",
      email: "alicej@example.com",
      sunglasses: "Aphrodite",
      serial: "ZH34K8D",
    },
    {
      name: "Bob Smith",
      email: "bobsmith@example.com",
      sunglasses: "Callisto",
      serial: "EH51JK2",
    },
    {
      name: "Carol Davis",
      email: "caroldavis@example.com",
      sunglasses: "Elysian",
      serial: "LY21EJ0",
    },
    {
      name: "Dave Wilson",
      email: "davewilson@example.com",
      sunglasses: "Zhandra",
      serial: "FR89UC3",
    },
  ];

  const filtered = owners.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase()) ||
      o.sunglasses.toLowerCase().includes(search.toLowerCase()) ||
      o.serial.toLowerCase().includes(search.toLowerCase())
  );

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      link: "/dashboard",
    },
    {
      label: "Owners",
      icon: User,
      link: "/home",
    },
    {
      label: "Sunglasses",
      icon: Infinity,
      link: "/sunglasses",
    },
    {
      label: "Certificates",
      icon: FileText,
      link: "/certificate-download",
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
        <div className="flex items-center gap-2 text-yellow-500 font-bold">
          <p className="text-2xl">SHADED GODDESS</p>
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
                    ? "bg-[#d4af37] text-black font-semibold transform"
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
        <h1 className="text-4xl font-bold mb-6 mt-20">Dashboard</h1>

        {/* Search + Export */}
        <div className="flex items-center gap-4 mb-6 bg-[#1c1c1c] p-2 rounded-lg mt-10">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, model, serial..."
            className="!border-none text-white placeholder:text-gray-500 !focus:outline-none !focus:ring-0 !focus:border-0"
          />

          <Button className="bg-yellow-700 cursor-pointer">Export</Button>
        </div>

        {/* Table */}
        <h2 className="text-xl font-semibold mb-4">Owners</h2>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-500">
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Sunglasses</TableHead>
              <TableHead className="text-white">Serial</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((o, idx) => (
              <TableRow
                key={idx}
                className="border-t-0 border-b border-gray-700"
              >
                <TableCell key={idx} className="border-0">
                  {o.name}
                </TableCell>
                <TableCell key={idx}>{o.email}</TableCell>
                <TableCell key={idx}>{o.sunglasses}</TableCell>
                <TableCell key={idx}>{o.serial}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
