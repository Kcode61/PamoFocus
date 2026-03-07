"use client";

import { Footer } from "@/components/Footer";
import { jetbrainsMono, poppins } from "@/lib/fonts";
import { ArrowBigRightDash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Home() {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev >= 3599) {
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <div className="bg-white flex flex-col items-center dark:bg-[#0B0B0F] min-h-screen py-16">
      <div className="flex justify-center items-center flex-col  flex-1 gap-8 pb-16 px-6">
        <div className="relative  ">
          <div className="w-[260px] h-[260px] bg-[#202027]   ease duration-300 rounded-full flex items-center justify-center">
            <div className="w-[250px] h-[250px] bg-[#0B0B0F] rounded-full flex items-center justify-center text-white text-3xl"></div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1
              className={` text-7xl font-bold text-[#F87171] ${jetbrainsMono.className}`}
            >
              {formatTime(time)}
            </h1>

            <p
              className={`${poppins.className} font-semibold text-center mt-2 text-base text-[#f86d6d]`}
            >
              tempo perdido
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <h1 className="text-5xl font-bold text-[#F87171]">404</h1>
          <p
            className={`text-[#878789] ${poppins.className} font-semibold text-sm max-w-xs text-center mx-auto`}
          >
            Essa página não existe. Enquanto isso, seu tempo está passando...
          </p>
        </div>

        <Footer />

        <Link
          href="/"
          className="py-2.5 cursor-pointer hover:scale-95 px-6 flex gap-2 items-center group rounded-full font-medium hover:bg-[#30161B]/70 transition ease duration-300 bg-[#30161B] text-[#F87171] "
        >
          Voltar e ser produtivo{" "}
          <ArrowBigRightDash
            size={20}
            className="group-hover:-translate-x-1 transition-all ease duration-300"
          />
        </Link>
      </div>
    </div>
  );
}
