"use client";

import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";
import { useGetUserCertificate, useGetUserProfile } from "@/api/user";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import { CertificatesPagination } from "../components/pagination";

// Import html2canvas and jsPDF directly for better control
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CertificatePage = () => {
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const certificateRefs = useRef<HTMLDivElement[]>([]); // Array of refs for multiple certificates

  const { data: userProfile } = useGetUserProfile(user?.id || "");
  const { data: userCertificate, isPending } = useGetUserCertificate(
    user?.id || "",
    page,
    1
  );

  // Manual PDF generation with better error handling
  const handleDownloadPDF = useCallback(async (certificateIndex = 0) => {
    setIsGenerating(true);

    try {
      const targetElement = certificateRefs.current[certificateIndex];

      if (!targetElement) {
        throw new Error(
          `Certificate element at index ${certificateIndex} not found`
        );
      }

      console.log("Target element found:", targetElement);

      // Wait for images to load
      const images = targetElement.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map((img: HTMLImageElement) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            setTimeout(reject, 5000); // 5 second timeout
          });
        })
      );

      // Generate canvas with high quality settings
      const canvas = await html2canvas(targetElement, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#000000",
        width: targetElement.offsetWidth,
        height: targetElement.offsetHeight,
        logging: true, // Enable logging for debugging
      });

      console.log("Canvas generated successfully");

      // Create PDF
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate dimensions to fit the page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio =
        (Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 72) / 96;
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;

      // Center the image on the page
      const x = (pdfWidth - finalWidth) / 2;
      const y = (pdfHeight - finalHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);
      pdf.save(`certificate-${Date.now()}.pdf`);

      console.log("PDF generated successfully");
    } catch (error: unknown) {
      console.error("Failed to generate PDF:", error);
      alert(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  // Function to set ref for each certificate
  const setCertificateRef = useCallback((el: HTMLDivElement | null, index: number) => {
    if (el) {
      certificateRefs.current[index] = el;
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h2 className="text-2xl font-semibold mb-4">
        Congratulations, {userProfile?.owner?.fullName.split(" ")[0] || "User"}
      </h2>
      <p className="font-[400] text-gray-300 text-center">
        You are now an official Owner of Shaded Goddess. You are now part of the{" "}
        <br />
        Founders Series, a limited collection of only 50 units worldwide.
      </p>

      {isPending ? (
        <Skeleton className="w-[350px] h-[600px] mt-10 bg-gray-400" />
      ) : (
        userCertificate?.certificates?.map((certificate: any, index: number) => (
          <div key={index} className="w-[350px] text-center mt-10">
            {/* Certificate content with proper ref */}
            <div
              ref={(el) => setCertificateRef(el, index)}
              id={`certificate-${index}`} // Add ID for debugging
              style={{
                backgroundColor: "#000000",
                color: "#92B917",
                minHeight: "500px",
                padding: "24px",
                border: "1px solid #92B917",
                borderRadius: "8px",
              }}
              className="text-center shadow-md"
            >
              <h3
                className="text-3xl font-semibold tracking-wide"
                style={{ color: "#92B917" }}
              >
                CERTIFICATE
              </h3>
              <p className="text-sm mb-2" style={{ color: "#92B917" }}>
                OF OWNERSHIP
              </p>

              <p className="mt-4" style={{ color: "#d1d5db" }}>
                Model
              </p>
              <p className="text-xl font-bold" style={{ color: "#ffffff" }}>
                {certificate.model}
              </p>

              <p className="mt-2" style={{ color: "#d1d5db" }}>
                Unit Number
              </p>
              <p className="text-2xl font-bold" style={{ color: "#ffffff" }}>
                {certificate.unitNumber}
              </p>

              <p className="mt-2" style={{ color: "#d1d5db" }}>
                Registration Date
              </p>
              <p className="text-2xl font-bold" style={{ color: "#ffffff" }}>
                {new Date(certificate.createdAt).toLocaleDateString()}
              </p>

              <p className="mt-3" style={{ color: "#9ca3af" }}>
                Serial Number
              </p>
              <p className="font-semibold" style={{ color: "#92B917" }}>
                {certificate.serialNumber}
              </p>

              {/* Logo section */}
              <div className="mt-2 flex justify-end">
                <img
                  src="/logo.png"
                  alt="business logo"
                  style={{
                    height: "80px",
                    width: "80px",
                    objectFit: "contain",
                  }}
                  crossOrigin="anonymous"
                  onLoad={() => console.log("Logo loaded successfully")}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    console.error("Logo failed to load");
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              <p
                className="font-semibold text-sm mt-4"
                style={{ color: "#ffffff" }}
              >
                This certificate confirms your exclusive ownership of this piece
                of the Shaded Goddess legacy. Authentication verified via NFC
                Owner's Portal.
              </p>
            </div>

            <Button
              onClick={() => handleDownloadPDF(index)}
              className="mt-4 h-[50px] !cursor-pointer w-full border border-[#92B917] text-white hover:bg-[#92B917] hover:text-black"
              disabled={isPending || isGenerating}
            >
              <Download size={20} />
              {isGenerating
                ? "Generating PDF..."
                : "Share / Download Certificate"}
            </Button>
          </div>
        ))
      )}

      <div className="mt-10">
        <CertificatesPagination
          page={userCertificate?.pagination.page}
          pages={userCertificate?.pagination.pages}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
        />
      </div>
    </div>
  );
};

export default CertificatePage;
