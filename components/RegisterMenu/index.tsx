"use client";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase-config";
import { useRouter } from "next/navigation";
type menuprops = {
  setismodal: (value: boolean) => void;
  ismodal: boolean;
};
export function RegisterMenu({ setismodal, ismodal }: menuprops) {
  const [RegisterName, setRegisterName] = useState("");
  const [RegisterEmail, setRegisterEmail] = useState("");
  const [RegisterPassword, setRegisterPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setErrorMsg(
        "Firebase não configurado. Configure as variáveis NEXT_PUBLIC_FIREBASE_*.",
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        RegisterEmail,
        RegisterPassword,
      );

      await updateProfile(userCredential.user, { displayName: RegisterName });
      router.push("/");
    } catch (error: any) {
      setErrorMsg("");
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMsg("Este e-mail já está sendo usado!");
          break;
        case "auth/weak-password":
          setErrorMsg("Senha muito fraca! Bota pelo menos 6 caracteres.");
          break;
        case "auth/invalid-email":
          setErrorMsg("Email invalido! Verifique se digitou certo.");
          break;
        default:
          setErrorMsg("Ocorreu um erro inesperado. Tenta de novo!");
      }
    }
  };
  return (
    <form
      onSubmit={handleRegister}
      className={`w-full transition-all duration-300 absolute max-w-md flex flex-col gap-8 items-center   ${!ismodal ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"} `}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold text-[#1D2030] dark:text-[#E5E7EB] ">
          Focus<span className="font-light">Flow</span>
        </h2>
        <p className=" font-medium text-center text-[#1D2030] dark:text-[#707F94] ">
          Crie sua conta
        </p>
      </div>

      <div className="flex w-full items-center flex-col gap-3">
        <div className="flex  gap-4 py-1 px-4 focus-within:ring-2 focus-within:ring-[#576DDB] border border-[#E2E4E9] dark:border-[#202027] w-full max-w-[400px] items-center   rounded-lg bg-[#E8EAEE] dark:bg-[#202027]">
          <User absoluteStrokeWidth size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Seu nome"
            required
            className="w-full py-1  placeholder:text-gray-400  outline-none text-md  "
            value={RegisterName}
            onChange={(e) => setRegisterName(e.target.value)}
          />
        </div>
        <div className="flex  gap-4 py-1 px-4 focus-within:ring-2 focus-within:ring-[#576DDB] border border-[#E2E4E9] dark:border-[#202027] w-full max-w-[400px] items-center   rounded-lg bg-[#E8EAEE] dark:bg-[#202027]">
          <Mail absoluteStrokeWidth size={18} className="text-gray-400" />
          <input
            type="email"
            placeholder="Seu@gmail.com"
            required
            className="w-full py-1  placeholder:text-gray-400  outline-none text-md  "
            value={RegisterEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
        </div>
        <div className="flex  gap-4 py-1 px-4 focus-within:ring-2 focus-within:ring-[#576DDB] w-full border border-[#E2E4E9] dark:border-[#202027] max-w-[400px] items-center   rounded-lg bg-[#E8EAEE] dark:bg-[#202027]">
          <Lock absoluteStrokeWidth size={18} className="text-gray-400" />
          <input
            type="password"
            placeholder="••••••"
            required
            className="w-full py-1  placeholder:text-gray-400 font-extrabold outline-none text-md  "
            value={RegisterPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
        </div>
        <p className="text-[#A163DE]/80 font-medium text-sm">{errorMsg}</p>
        <button
          type="submit"
          className="py-2 max-w-[400px] w-full  bg-[#A163DE] text-white px-4 rounded-xl font-bold hover:scale-95 transition ease duration-300 cursor-pointer flex gap-2 items-center justify-center "
        >
          Criar conta
          <ArrowRight size={20} />
        </button>
      </div>

      <p className="text-sm text-gray-400 font-medium dark:text-gray-500">
        Já tem uma conta?{" "}
        <span
          onClick={() => (setismodal(!ismodal), setErrorMsg(""))}
          className="text-[#A163DE] hover:text-[#A163DE]/80 cursor-pointer"
        >
          Entrar
        </span>
      </p>
    </form>
  );
}
