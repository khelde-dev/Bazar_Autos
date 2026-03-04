import React, { useState } from "react";
import {
  CarFront,
  ShieldCheck,
  AtSign,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Iniciando sesión", { email, password });
  };

  return (
    <>
      <main className="bg-white w-full max-w-105 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 relative z-10 flex flex-col items-center">
        <div className="relative mb-6 mt-2">
          <div className="w-20 h-20 bg-linear-to-br from-[#2f63f6] to-[#1a4bd3] rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <CarFront size={60} className="text-white stroke-[1.5]" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-sm">
            <div className="bg-white rounded-full flex items-center justify-center">
              <ShieldCheck
                size={20}
                className="text-[#3b6df6]"
                fill="#3b6df6"
                stroke="white"
                strokeWidth={2}
              />
            </div>
          </div>
        </div>
        <div className="text-center mb-10 w-full">
          <h1 className="text-[28px] font-bold text-slate-800 tracking-tight mb-2">
            ¡Qué bueno verte!
          </h1>
          <p className="text-slate-500 text-[15px]">
            Inicia sesión en el Bazar de Autos
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="space-y-2">
            <label className="block text-[14px] font-semibold text-slate-700">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <AtSign size={20} className="text-slate-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>
          <div className="space-y-2 pb-1">
            <label className="block text-[14px] font-semibold text-slate-700">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={20} className="text-slate-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3.5 bg-white border border-slate-200 rounded-2xl text-[15px] text-slate-800 placeholder:text-slate-400 placeholder:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all tracking-wider"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-linear-to-br from-[#2f63f6] to-[#1a4bd3] hover:from-[#2552d6] hover:to-[#163fa8] text-white font-semibold text-[16px] py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-[0_8px_20px_-6px_rgba(47,99,246,0.5)] active:scale-[0.98]"
          >
            Iniciar SesiónS
            <ArrowRight size={20} className="stroke-[2.5]" />
          </button>
        </form>
      </main>
    </>
  );
}
