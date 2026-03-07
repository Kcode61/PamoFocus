import { create } from "zustand";

type Theme = {
  primary: string;
  secondary: string;
  accent: string;
};

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: {
    primary: "#425BD7",
    secondary: "#2EB87E",
    accent: "#8C4DCB",
  },
  setTheme: (theme) => set({ theme }),
}));
