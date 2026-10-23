"use client";
import { useThemeStore } from "@/store/themeStore";
import { useEffect, useState } from "react";

type theme = {
  primary: string;
  secondary: string;
  accent: string;
  id: number;
  name: string;
};
export function ColorThemes() {
  const [activeTheme, setActiveTheme] = useState<number | null>(null);
  const SetColorTheme = useThemeStore((state) => state.setTheme);
  useEffect(() => {
    const savedTheme = localStorage.getItem("color-theme");

    if (savedTheme) {
      const theme = JSON.parse(savedTheme);

      setActiveTheme(theme.id);

      SetColorTheme({
        primary: theme.primary,
        secondary: theme.secondary,
        accent: theme.accent,
      });
    }
  }, [SetColorTheme]);
  const themes: theme[] = [
    {
      id: 1,
      primary: "#425BD7",
      secondary: "#2EB87E",
      accent: "#8C4DCB",
      name: "azul",
    },
    {
      id: 2,
      primary: "#DD3C57",
      secondary: "#34B29D",
      accent: "#B353C6",
      name: "Rosa",
    },
    {
      name: "Esmeralda",
      id: 3,
      primary: "#2BAB76",
      secondary: "#3399CC",
      accent: "#CB4D8C",
    },
    {
      id: 4,
      primary: "#EC9213",
      secondary: "#30A6A6",
      accent: "#774DCB",
      name: "Âmbar",
    },
    {
      id: 5,
      primary: "#944EDA",
      secondary: "#34B27D",
      accent: "#CB4D62",
      name: "Violeta",
    },
    {
      id: 6,
      primary: "#1DACC9",
      secondary: "#34B25E",
      accent: "#CB4DA1",
      name: "Ciano",
    },
  ];
  return (
    <div className="flex-1  mt-4 flex flex-col gap-4">
      <p className=" text-sm text-gray-400 dark:text-gray-200 font-bold">
        Tema de cor
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
        {themes.map((theme) => (
          <div
            key={theme.id}
            onClick={() => {
              setActiveTheme(theme.id);
              SetColorTheme({
                primary: theme.primary,
                secondary: theme.secondary,
                accent: theme.accent,
              });

              localStorage.setItem("color-theme", JSON.stringify(theme));
            }}
            style={{
              borderColor: activeTheme === theme.id ? theme.primary : "#202027",
              backgroundColor:
                activeTheme === theme.id ? "#1a1a22" : "transparent",
            }}
            className="p-3  cursor-pointer rounded-xl  border border-[#202027]  flex items-center justify-center flex-col gap-1"
          >
            <div
              className="w-6 h-6 rounded-full"
              style={{
                backgroundColor: theme.primary,
              }}
            ></div>
            <p className="text-sm text-gray-500 ">{theme.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
