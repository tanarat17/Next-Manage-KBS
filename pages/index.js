import React, { useState } from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import MenuCard from "../components/Menu/MenuCard";
import ModalData from "../components/Modal/ModalData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen p-8 pb-20 gap-0 sm:p-0">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start mt-0 mb-0">
        <div className="flex flex-col gap-8 w-full">
          <MenuCard
            imageSrc="/pass.png"
            altText="Pass Image"
            onClick={() => setIsModalOpen(true)}
          />
          <MenuCard
            imageSrc="/live.png"
            altText="Live Image"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </main>
      <ModalData
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}