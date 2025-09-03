import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans px-6">
      {/* Logo */}
      <div className="flex flex-col items-center mb-12">
        {/* <Image
          src="/logo.png" 
          alt="Shaded Goddess Logo"
          width={60}
          height={60}
        /> */}
        <h1 className="mt-4 text-lg tracking-widest text-[#d4af37]">
          SHADED GODDESS
        </h1>
      </div>

      {/* Welcome Message */}
      <h2 className="text-3xl font-semibold mb-12 text-center">
        Welcome, <br /> Owner
      </h2>

      {/* Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button className="relative w-full py-3 rounded-lg text-[#d4af37] border-[d4af37] border cursor-pointer overflow-hidden">
          <span className="absolute inset-0 rounded-lg border-[1px] border-[#d4af37] animate-borderMove"></span>
          <span className="relative block rounded-lg bg-black px-6 py-2">
            Register Sunglasses
          </span>
        </button>

        <button className="relative w-full py-3 rounded-lg border-[d4af37] text-[#d4af37] border cursor-pointer overflow-hidden">
          <span className="absolute inset-0 rounded-lg border-[1px] border-[#d4af37] animate-borderMove"></span>
          <span className="relative block rounded-lg bg-black px-6 py-2">
            Sign In
          </span>
        </button>
      </div>
    </main>
  );
}
