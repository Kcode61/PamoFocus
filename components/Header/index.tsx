import { poppins } from "@/lib/fonts";
import { Settings } from "lucide-react";
type HeaderProps = {
  onOpenMenu: () => void;
};

export function Header({ onOpenMenu }: HeaderProps) {
  return (
    <header className="max-w-xl px-6  w-full mx-auto flex gap-4 justify-between">
      <h1 className="text-xl text-black/80 dark:text-gray-300">
        <span
          className={`font-semibold   text-black dark:text-white ${poppins.className}`}
        >
          Pamo
        </span>
        Focus
      </h1>

      <button
        className="p-2 flex items-center justify-center hover:bg-gray-200 rounded-full cursor-pointer transition ease duration-300 hover:scale-95  dark:hover:bg-[#16161d]"
        onClick={onOpenMenu}
      >
        <Settings className="text-slate-400" size={18} />
      </button>
    </header>
  );
}
