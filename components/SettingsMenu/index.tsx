"use client";
import { poppins } from "@/lib/fonts";
import { Coffee, LogOut, Moon, Sun, Timer, TimerReset, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ColorThemes } from "../ColorThemes";
import { useThemeStore } from "@/store/themeStore";
import Link from "next/link";
import { signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase-config";
import { usetimeStore } from "@/store/timeStore";

type MenuProps = {
  OnClose: () => void;
  isOpen: boolean;
  usuarioLogado: User | null;
};

export function SettingsMenu({ OnClose, isOpen, usuarioLogado }: MenuProps) {
  useEffect(() => {
    setMounted(true);
  }, []);

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const { primary } = useThemeStore((state) => state.theme);
  const timeFocus = usetimeStore((state) => state["time-Focus"]);
  const timeShort = usetimeStore((state) => state["time-Short"]);
  const timeBreak = usetimeStore((state) => state["time-Break"]);
  const setTimeFocus = usetimeStore((state) => state.setTimeFocus);
  const setTimeBreak = usetimeStore((state) => state.setTimeBreak);
  const setTimeShort = usetimeStore((state) => state.setTimeShort);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };
  const handleLogout = async () => {
    if (!auth) return;

    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 " onClick={OnClose} />
      )}
      <div
        className={`${isOpen ? "translate-x-0" : "translate-x-full"} h-screen transition-all ease duration-500 fixed top-0  w-80 z-50 right-0 bg-[#F6F7F9] dark:bg-[#0B0B0F] overflow-y-auto max-h-screen p-6  border-l-2 dark:border-[#E5E7EB] border-gray-200 flex  flex-col`}
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
        <div className=" flex flex-col gap-2 mb-4">
          <p className=" mb-2 mt-2 text-gray-400 dark:text-gray-200 font-bold">
            Conta
          </p>
          {usuarioLogado ? (
            <>
              <div className="p-3 rounded-xl bg-[#E2E4E9] dark:bg-[#202027] flex flex-col gap-1">
                <p className="text-xs text-gray-400 dark:text-gray-400 font-bold">
                  Conectado:
                </p>

                <p className="text-base text-slate-400 dark:text-gray-300 font-bold">
                  {usuarioLogado
                    ? usuarioLogado.email
                    : "Nenhum usuário logado"}
                </p>
                <p className="text-xs text-slate-400 dark:text-gray-400">
                  Suas configurações estão sincronizadas ✓
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-xl text-gray-400 dark:text-gray-200 py-2 px-4 border cursor-pointer transition dark:border-[#202027] border-[#E2E4E9] hover:bg-[#E8EAEE]  dark:hover:bg-[#202027] flex gap-4 items-center justify-center"
              >
                <LogOut size={18} />
                <span className="text-sm   font-semibold ">Sair da conta</span>
              </button>
            </>
          ) : (
            <>
              <p className="text-xs text-slate-400 dark:text-gray-400 font-medium">
                Faça login para salvar suas configurações na nuvem.
              </p>
              <Link
                href="/Auth"
                className="rounded-xl text-gray-400 dark:text-gray-200 py-2 px-4 border cursor-pointer transition dark:border-[#202027] border-[#E2E4E9] hover:bg-[#E8EAEE]  dark:hover:bg-[#202027] flex gap-4 items-center justify-center"
              >
                <LogOut size={18} />
                <span className="text-sm   font-semibold ">
                  Entrar / Criar conta
                </span>
              </Link>
            </>
          )}
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
        <div className=" flex flex-col mt-4 gap-4">
          <p className=" text-sm text-gray-400 dark:text-gray-200 font-bold">
            Configurações de tempo
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-[#E2E4E9] bg-[#E8EAEE] p-3 text-gray-700 transition-colors focus-within:border-gray-400 dark:border-[#202027] dark:bg-[#202027] dark:text-gray-200 dark:focus-within:border-gray-500">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-gray-400 dark:bg-[#0B0B0F] dark:text-gray-300">
                  <Timer size={18} />
                </span>
                <span className="text-sm font-semibold text-gray-400">
                  Focus time
                </span>
              </div>
              <label className="flex shrink-0 items-center rounded-lg border border-[#E2E4E9] bg-[#F6F7F9] px-2 dark:border-[#303039] dark:bg-[#0B0B0F]">
                <input
                  aria-label="Focus time in minutes"
                  type="number"
                  min={1}
                  max={120}
                  className="w-9 bg-transparent py-2 text-center text-sm font-bold tabular-nums text-gray-800 outline-none dark:text-gray-100"
                  value={Math.floor(timeFocus / 60)}
                  onChange={(e) =>
                    setTimeFocus(
                      Math.max(1, Math.min(120, Number(e.target.value) || 1)) *
                        60,
                    )
                  }
                />
                <span className="text-xs font-medium text-gray-400">min</span>
              </label>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-[#E2E4E9] bg-[#E8EAEE] p-3 text-gray-700 transition-colors focus-within:border-gray-400 dark:border-[#202027] dark:bg-[#202027] dark:text-gray-200 dark:focus-within:border-gray-500">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-gray-400 dark:bg-[#0B0B0F] dark:text-gray-300">
                  <Coffee size={18} />
                </span>
                <span className="text-sm font-semibold text-gray-400">
                  Break time
                </span>
              </div>
              <label className="flex shrink-0 items-center rounded-lg border border-[#E2E4E9] bg-[#F6F7F9] px-2 dark:border-[#303039] dark:bg-[#0B0B0F]">
                <input
                  aria-label="Break time in minutes"
                  type="number"
                  min={1}
                  max={120}
                  className="w-9 bg-transparent py-2 text-center text-sm font-bold tabular-nums text-gray-800 outline-none dark:text-gray-100"
                  value={Math.floor(timeBreak / 60)}
                  onChange={(e) =>
                    setTimeBreak(
                      Math.max(1, Math.min(120, Number(e.target.value) || 1)) *
                        60,
                    )
                  }
                />
                <span className="text-xs font-medium text-gray-400">min</span>
              </label>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-[#E2E4E9] bg-[#E8EAEE] p-3 text-gray-700 transition-colors focus-within:border-gray-400 dark:border-[#202027] dark:bg-[#202027] dark:text-gray-200 dark:focus-within:border-gray-500">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-gray-400 dark:bg-[#0B0B0F] dark:text-gray-300">
                  <TimerReset size={18} />
                </span>
                <span className="text-sm font-semibold text-gray-400">
                  Short break
                </span>
              </div>
              <label className="flex shrink-0 items-center rounded-lg border border-[#E2E4E9] bg-[#F6F7F9] px-2 dark:border-[#303039] dark:bg-[#0B0B0F]">
                <input
                  aria-label="Short break time in minutes"
                  type="number"
                  min={1}
                  max={120}
                  className="w-9 bg-transparent py-2 text-center text-sm font-bold tabular-nums text-gray-800 outline-none dark:text-gray-100"
                  value={Math.floor(timeShort / 60)}
                  onChange={(e) =>
                    setTimeShort(
                      Math.max(1, Math.min(120, Number(e.target.value) || 1)) *
                        60,
                    )
                  }
                />
                <span className="text-xs font-medium text-gray-400">min</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
