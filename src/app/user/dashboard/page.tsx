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

export default function Dashboard() {
  const [search, setSearch] = useState("");

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

  return (
    <main className="flex-1">
      {/* Search + Export */}
      <div className="flex items-center gap-4 mb-6 bg-[#1c1c1c] p-2 rounded-lg mt-[43px]">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, model, serial..."
          className="border-none focus:border-none focus:outline-none focus:ring-0 focus-visible:ring-0 bg-transparent text-white placeholder:text-gray-500"
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
            <TableRow key={idx} className="border-t-0 border-b border-gray-700">
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
  );
}
