import { useThemeStore } from "@/store/themeStore";

type variant = "Focus" | "Short Break" | "Long Break";
type props = {
  title: string;
  variant: variant;
  onClick: () => void;
  active: boolean;
};
export function Buttons({ title, variant, onClick, active }: props) {
  const { primary, secondary, accent } = useThemeStore((state) => state.theme);

  const bgColor =
    variant === "Focus"
      ? primary
      : variant === "Short Break"
        ? secondary
        : accent;

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: active ? bgColor : "transparent",
      }}
      className={`py-1.5 px-4 cursor-pointer transition ease duration-300 rounded-full 
      dark:hover:text-white ${active ? "text-white" : "text-gray-400 dark:text-[#474D5A]"} hover:text-gray-600 dark:hover:text-gray-500 font-semibold  `}
    >
      {title}
    </button>
  );
}
