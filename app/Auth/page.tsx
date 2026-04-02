"use client";

import { LoginMenu } from "@/components/LoginMenu";
import { RegisterMenu } from "@/components/RegisterMenu";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Auth() {
  const [ismodal, setismodal] = useState(false);
  return (
    <section className="py-16 px-4 bg-[#F6F7F9] dark:bg-[#0B0B0F] min-h-screen flex items-center justify-center">
      <Link
        href="/"
        className="flex gap-2 items-center absolute top-5 cursor-pointer font-semibold left-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
      >
        <ArrowLeft /> Voltar
      </Link>
      <LoginMenu setismodal={setismodal} ismodal={ismodal} />
      <RegisterMenu setismodal={setismodal} ismodal={ismodal} />
    </section>
  );
}
