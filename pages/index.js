import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import MenuCard from "../components/MenuCard";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen p-8 pb-20 gap-0 sm:p-0 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start mt-0 mb-0">
          {/* ใช้ Card Component */}
          <div className="flex flex-col gap-8 w-full">
          <MenuCard imageSrc="/pass.png" altText="Pass Image" />
          <MenuCard imageSrc="/live.png" altText="Live Image" />
          </div>
      </main>
    </div>
  );
}
