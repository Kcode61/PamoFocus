"use client";

import { Buttons } from "@/components/Buttons";
import { Header } from "@/components/Header";
import { SettingsMenu } from "@/components/SettingsMenu";
import { TaskList } from "@/components/TaskList";
import { auth } from "@/lib/firebase-config";
import { jetbrainsMono } from "@/lib/fonts";
import { useThemeStore } from "@/store/themeStore";
import { onAuthStateChanged, User } from "firebase/auth";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type Modes = "Focus" | "Short Break" | "Long Break";
export default function Home() {
  const getModeTime = (mode: Modes) => {
    switch (mode) {
      case "Focus":
        return 1500;
      case "Short Break":
        return 300;
      case "Long Break":
        return 900;
    }
  };
  const { primary, secondary, accent } = useThemeStore((state) => state.theme);

  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState<number>(() => getModeTime("Focus"));
  const [isMode, SetMode] = useState<Modes>("Focus");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(1500);
  const [usuario, setUsuario] = useState<User | null>(null);

  const modeColors: Record<Modes, string> = {
    Focus: primary,
    "Short Break": secondary,
    "Long Break": accent,
  };

  useEffect(() => {
    if (!auth) {
      setUsuario(null);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
      } else {
        setUsuario(null);
      }
    });
    return () => unsubscribe();
  }, [router]);
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
  };

  const handleChangeMode = (mode: Modes) => {
    SetMode(mode);
    setIsRunning(false);
    setTime(getModeTime(mode));
    setTotalTime(getModeTime(mode));
  };

  const porcentagem = ((totalTime - time) / totalTime) * 100;
  return (
    <div
      className={` ${menuOpen ? "overflow-hidden h-screen" : ""} flex flex-col items-center bg-[#F6F7F9] dark:bg-[#0B0B0F] min-h-screen py-16`}
    >
      <SettingsMenu
        usuarioLogado={usuario}
        isOpen={menuOpen}
        OnClose={() => setMenuOpen(false)}
      />
      <Header onOpenMenu={() => setMenuOpen(true)} />
      <div className="flex justify-center items-center flex-col  flex-1 py-3 gap-8 pb-16 px-6">
        <div className="flex items-center md:mt-0 mt-10 rounded-full gap-2 bg-[#E8EAEE] dark:bg-[#1F1F26] p-1.5">
          <Buttons
            variant="Focus"
            title="Focus"
            active={isMode === "Focus"}
            onClick={() => handleChangeMode("Focus")}
          />

          <Buttons
            variant="Short Break"
            title="Short Break"
            active={isMode === "Short Break"}
            onClick={() => handleChangeMode("Short Break")}
          />

          <Buttons
            variant="Long Break"
            title="Long Break"
            active={isMode === "Long Break"}
            onClick={() => handleChangeMode("Long Break")}
          />
        </div>

        <div className="relative  ">
          <div
            className=" w-[300px] h-[300px] ease duration-300 rounded-full flex items-center justify-center [--track:#E8EAEE] dark:[--track:#202027]"
            style={{
              background: `conic-gradient(${modeColors[isMode]} ${porcentagem}%, var(--track) 0%)`,
            }}
          >
            <div className="w-[286px] h-[286px] bg-white dark:bg-[#0B0B0F] rounded-full flex items-center justify-center text-white text-3xl"></div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1
              className={`md:text-9xl text-7xl font-bold text-[#1D2030] dark:text-[#E0E4EB] ${jetbrainsMono.className}`}
            >
              {formatTime(time)}
            </h1>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => setIsRunning(!isRunning)}
            style={{
              backgroundColor:
                isMode === "Focus"
                  ? primary
                  : isMode === "Short Break"
                    ? secondary
                    : accent,
            }}
            className={`rounded-full py-4 px-8  cursor-pointer hover:scale-95 transition ease duration-300 flex gap-2 items-center text-white font-semibold`}
          >
            {isRunning ? (
              <div className="flex gap-2 items-center">
                <Pause size={18} />
                Pause
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <Play size={18} />
                Start
              </div>
            )}
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTime(getModeTime(isMode));
            }}
            className="rounded-full py-5 px-6 cursor-pointer text-gray-400 dark:text-white dark:bg-[#202027] bg-[#E8EAEE] dark:hover:bg-[#1C1C22]"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        <div className="flex gap-2 items-center">
          <div
            className={`dark:bg-[#202027] bg-gray-400  w-2 h-2 rounded-ful`}
          ></div>
          <div
            className={`dark:bg-[#202027] bg-gray-400  w-2 h-2 rounded-full ${totalTime === 0 ? "bg-[#202027]" : ""}`}
          ></div>
          <div className="dark:bg-[#202027] bg-gray-400  w-2 h-2 rounded-full"></div>
          <div className="dark:bg-[#202027] bg-gray-400  w-2 h-2 rounded-full"></div>
        </div>

        <TaskList />
      </div>
    </div>
  );
}
