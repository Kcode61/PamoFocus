"use client";
import { auth } from "@/lib/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type menuprops = {
  setismodal: (value: boolean) => void;
  ismodal: boolean;
};
export function LoginMenu({ setismodal, ismodal }: menuprops) {
  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        LoginEmail,
        LoginPassword,
      );
      userCredential;
      router.push("/");
    } catch (error: any) {
      setErrorMsg("");
      switch (error.code) {
        case "auth/wrong-password":
          setErrorMsg("Senha ou email incorretos. Verifique suas credenciais.");
          break;
        case "auth/wrong-email":
          setErrorMsg("Senha ou email incorretos. Verifique suas credenciais.");
          break;
        default:
          setErrorMsg("Usuário não encontrado. Verifique suas credenciais.");
      }
    }
  };
  return (
    <form
      onSubmit={handleLogin}
      className={`w-full max-w-md flex flex-col transition-all duration-300 absolute gap-8 items-center   ${ismodal ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"} `}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold text-[#1D2030] dark:text-[#E5E7EB] ">
          Focus<span className="font-light">Flow</span>
        </h2>
        <p className=" font-medium text-[#1D2030] dark:text-[#707F94] ">
          Entre na sua conta
        </p>
      </div>

      <div className="flex w-full items-center flex-col gap-3">
        <div className="flex  gap-4 py-1 px-4 focus-within:ring-2 focus-within:ring-[#576DDB] border border-[#E2E4E9] dark:border-[#202027] w-full max-w-[400px] items-center   rounded-lg bg-[#E8EAEE] dark:bg-[#202027]">
          <Mail absoluteStrokeWidth size={18} className="text-gray-400" />
          <input
            type="email"
            placeholder="Seu@gmail.com"
            required
            className="w-full py-1  placeholder:text-gray-400  outline-none text-md  "
            value={LoginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div className="flex  gap-4 py-1 px-4 focus-within:ring-2 focus-within:ring-[#576DDB] w-full border border-[#E2E4E9] dark:border-[#202027] max-w-[400px] items-center   rounded-lg bg-[#E8EAEE] dark:bg-[#202027]">
          <Lock absoluteStrokeWidth size={18} className="text-gray-400" />
          <input
            type="password"
            placeholder="••••••"
            required
            className="w-full py-1  placeholder:text-gray-400 font-extrabold outline-none text-md  "
            value={LoginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <p className="text-[#A163DE]/80 font-medium text-sm">{errorMsg}</p>
        <button
          type="submit"
          className="py-2 max-w-[400px] w-full  bg-[#A163DE] text-white px-4 rounded-xl font-bold hover:scale-95 transition ease duration-300 cursor-pointer flex gap-2 items-center justify-center "
        >
          Entrar
          <ArrowRight size={20} />
        </button>
      </div>

      <p className="text-sm text-gray-400 font-medium dark:text-gray-500">
        Não tem uma conta?{" "}
        <span
          onClick={() => (setismodal(!ismodal), setErrorMsg(""))}
          className="text-[#A163DE] hover:text-[#A163DE]/80 cursor-pointer"
        >
          Criar conta
        </span>
      </p>
    </form>
  );
}
