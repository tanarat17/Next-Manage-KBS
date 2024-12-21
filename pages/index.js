// Home Component
import React from "react";
import MenuCard from "./components/Menu/MenuCard";
import { useRouter } from "next/navigation";
import ModalData from "./components/Modal/ModalData";

export default function Home() {
  const router = useRouter();

  const navigateToPage = (page) => {
    router.push(page);
  };

  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen p-8 pb-20 gap-0 sm:p-0">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start mt-0 mb-0">
        <div className="flex flex-col gap-8 w-full">
          <MenuCard
            imageSrc="/pass.png"
            altText="Pass Image"
            onClick={() => navigateToPage("./components/Modal/ModalData")}
          />
        </div>

        <div className="flex flex-col gap-8 w-full">
          <MenuCard
            imageSrc="/live-fix.png"
            altText="Live Image"
            onClick={() => navigateToPage("/live")}
          />
        </div>
      </main>
    </div>
  );
}
