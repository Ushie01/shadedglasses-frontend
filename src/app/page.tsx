import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans px-6">
      {/* Logo */}
      <div className="flex flex-col items-center mb-12 justify-center text-center">
        <Image
          src="/logo.png"
          alt="Shaded Goddess Logo"
          width={60}
          height={60}
          sizes="100"
          className="h-36 w-36"
        />
        <p className="mt-4 text-sm tracking-widest text-white">
          it’s power, mystery, and allure redefined. Each frame is a <br />{" "}
          crown for those who command attention without asking for it. Designed
          with precision, <br /> crafted with intention, and worn by those who
          know they are unforgettable.
        </p>
      </div>

      {/* Welcome Message */}
      <h2 className="text-3xl font-semibold mb-12 text-center">
        Welcome, <br /> Owner
      </h2>

      {/* Buttons */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <a href="/register">
          <button className="relative w-full py-3 rounded-lg text-[#92B917] border-[d4af37] border cursor-pointer overflow-hidden">
            <span className="absolute inset-0 rounded-lg border-[1px] border-[#92B917] animate-borderMove"></span>
            <span className="relative block rounded-lg bg-black px-6 py-2 text-white">
              Register Eyewear
            </span>
          </button>
        </a>

        <a href="/sign-in">
          <button className="relative w-full py-3 rounded-lg border-[d4af37] text-[#92B917] border cursor-pointer overflow-hidden">
            <span className="absolute inset-0 rounded-lg border-[1px] border-[#92B917] animate-borderMove"></span>
            <span className="relative block rounded-lg bg-black px-6 py-2 text-white">
              Sign In
            </span>
          </button>
        </a>
      </div>
    </main>
  );
}
