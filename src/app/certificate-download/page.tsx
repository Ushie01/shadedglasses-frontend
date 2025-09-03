"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { usePDF } from "react-to-pdf";
import { Download } from "lucide-react";
import Image from "next/image";

const CertificatePage = () => {
  // const targetRef = useRef();

  const { toPDF, targetRef } = usePDF({ filename: "certificate.pdf" });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h2 className="text-2xl font-semibold mb-4">Congratulations, Alice</h2>
      <p className="font-[400] text-gray-300 text-center">
        You are now an official Owner of Shaded Goddess. You are now part of the{" "}
        <br />
        Founders Series, a limited collection of only 50 units worldwide.
      </p>
      <div className="w-[350px] text-center mt-10">
        {/* Title */}
        {/* Certificate */}
        <div
          ref={targetRef}
          className="border border-[#d4af37] rounded-lg p-6 text-center bg-black text-[#d4af37] shadow-md"
        >
          <h3 className="text-3xl font-semibold tracking-wide">CERTIFICATE</h3>
          <p className="text-sm mb-2">OF OWNERSHIP</p>

          <p className="text-gray-300 mt-4">Model</p>
          <p className="text-xl font-bold text-white"> Zhandra</p>

          <p className="text-gray-300 mt-2">Unit Number</p>
          <p className="text-2xl font-bold text-white">34</p>

          <p className="text-gray-300 mt-2">Registration Date</p>
          <p className="text-2xl font-bold text-white">30/10/2028</p>

          <p className="text-gray-400 mt-3 cursor-pointer">Serial Numbr</p>
          <p className="font-semibold text-[#d4af37]">ZE/23450</p>

          {/* Optional Logo */}
          <div className="mt-2 flex justify-end">
            <Image src="/logo.png" alt="business logo" height={80} width={80} />
          </div>

          <p className="font-semibold text-[#d4af37] text-sm">
            This certificate confirms your exclusive ownership of this piece of
            the Shaded Goddess legacy. Authentication verified via NFC Owner’s
            Portal.
          </p>
        </div>

        <Button
          onClick={() => {
            console.log("Generating PDF...");
            toPDF();
          }}
          className="mt-4 h-[50px] !cursor-pointer w-full border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
        >
          <Download size={20} /> Share / Download Certificate
        </Button>
      </div>
    </div>
  );
};

export default CertificatePage;
