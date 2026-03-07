"use client";
import { poppins } from "@/lib/fonts";
import { Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ColorThemes } from "../ColorThemes";
import { useThemeStore } from "@/store/themeStore";

type MenuProps = {
  OnClose: () => void;
  isOpen: boolean;
};

export function SettingsMenu({ OnClose, isOpen }: MenuProps) {
  const { primary } = useThemeStore((state) => state.theme);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 " onClick={OnClose} />
      )}
      <div
        className={`${isOpen ? "translate-x-0" : "translate-x-full"} h-screen transition-all ease duration-500 fixed top-0  w-80 z-50 right-0 bg-[#F6F7F9] dark:bg-[#0B0B0F] p-6  border-l-2 dark:border-[#E5E7EB] border-gray-200 flex  flex-col`}
      >
        <div className="flex  mb-4 items-center justify-between">
          <h2
            className={`${poppins.className}  text-lg text-black dark:text-gray-200 font-bold`}
          >
            Settings
          </h2>
          <button
            onClick={OnClose}
            className=" hover:bg-gray-200 hover:scale-95 dark:hover:bg-[#16161d] transition ease duration-300 cursor-pointer rounded-full  p-2"
          >
            <X size={18} className="text-gray-300" absoluteStrokeWidth />
          </button>
        </div>
        <div className=" flex flex-col gap-4">
          <p className=" text-sm text-gray-400 dark:text-gray-200 font-bold">
            Aparência
          </p>
          <div className="py-3 px-4 rounded-xl items-center text-gray-400 bg-[#E8EAEE] dark:bg-[#202027] flex justify-between">
            <div className="flex gap-2 items-center">
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
              <p>{isDark ? "Modo escuro" : "Modo Claro"}</p>
            </div>

            <div
              onClick={toggleTheme}
              style={{
                backgroundColor: isDark ? primary : "#E2E4E9",
              }}
              className="w-12 cursor-pointer  h-6 rounded-full  relative"
            >
              <div
                className={`absolute top-1/2 -translate-y-1/2  left-0.5 w-5 h-5 rounded-full transition-transform duration-300 ease-in-out
                   ${isDark ? "translate-x-6 bg-[#0B0B0F]" : "translate-x-0 bg-[#F6F7F9]"}`}
              ></div>
            </div>
          </div>
        </div>
        <ColorThemes />
      </div>
    </>
  );
}
