"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Calendar, Calendar1Icon, Glasses, GlassesIcon } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center justify-center bg-black h-screen w-screen">
      <div className="">
        <p className="font-bold text-4xl text-[#92B917]">Hello, Alice</p>

        <div className="flex items-center justify-start space-x-2 mt-4">
          <button className="border-[#5d5538] cursor-pointer border-[0.5px] rounded bg-[#171714] py-2 px-4 text-[#92B917] font-[500] text-sm">
            APHRODITE
          </button>
          <button className="border-[#5d5538] cursor-pointer border-[0.5px] bg-[#171714] rounded py-2 px-4 text-[#92B917] font-[400] text-sm">
            View Certificate Ownership
          </button>
        </div>

        <div className="flex w-full p-4 border-[#5d5538] border-[0.5px] rounded-lg mt-4 gap-2 bg-[#171714]">
          <div className="w-1/2 h-full">
            <div className="flex flex-col rounded-lg border-[0.5px] border-[#5d5538] w-full  h-28 items-center justify-between py-4 px-2">
              <p
                className="text-white font-[700] text-lg w-full
            "
              >
                Privacy Tint
              </p>
              <div className="flex items-center justify-between w-full">
                <p className="text-gray-400">Enable</p>
                <Switch
                  checked={enabled}
                  onCheckedChange={setEnabled}
                  className="data-[state=checked]:bg-[#92B917] data-[state=unchecked]:bg-[#5d5538]"
                />
              </div>
            </div>

            <div className="flex flex-col mt-2 rounded-lg border-[0.5px] border-[#5d5538] w-full  h-full items-center justify-between py-4 px-2">
              <p
                className="text-white font-[700] text-lg w-full
            "
              >
                Upcoming Drops
              </p>
              <div className="flex items-center justify-end w-full">
                <Calendar1Icon size={50} color="#92B917" />
              </div>

              <Button className="h-[40px] cursor-pointer rounded-lg w-full border border-[#92B917] mt-3 text-[#92B917] font-[700]">
                Explore
              </Button>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex flex-col rounded-lg border-[0.5px] h-[175px] border-[#5d5538] w-full items-center justify-between py-4 px-2">
              <p
                className="text-white font-[700] text-lg w-full
            "
              >
                Tech Guide
              </p>

              {/* <Glasses size={80} color="#92B917" className="w-full" /> */}
              <Image
                src="/glasses.svg"
                alt="glass icon"
                height={80}
                width={80}
              />

              <Button className="h-[40px] cursor-pointer rounded-lg w-full border border-[#92B917] text-[#92B917] font-[700]">
                View
              </Button>
            </div>

            <div className="flex flex-col rounded-lg mt-2 border-[0.5px] h-[195px] border-[#5d5538] w-full items-center justify-between py-4 px-2">
              <p
                className="text-white font-[700] text-lg w-full
            "
              >
                Styling Guide
              </p>

              <p className="text-gray-400 font-[400] text-sm">
                Curated <br /> recommendations <br /> for your Aphrodite <br />{" "}
                sunglasses
              </p>
              <Button className="h-[40px] cursor-pointer mt-4 rounded-lg w-full border border-[#92B917] text-[#92B917] font-[700]">
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
