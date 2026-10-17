import { create } from "zustand";

type TimeStore = {
  "time-Short": number;
  "time-Focus": number;
  "time-Break": number;
  setTimeShort: (time: number) => void;
  setTimeFocus: (time: number) => void;
  setTimeBreak: (time: number) => void;
};

export const usetimeStore = create<TimeStore>((set) => ({
  "time-Short": 300,
  "time-Focus": 1500,
  "time-Break": 900,
  setTimeShort: (time) => set({ "time-Short": time }),
  setTimeFocus: (time) => set({ "time-Focus": time }),
  setTimeBreak: (time) => set({ "time-Break": time }),
}));
