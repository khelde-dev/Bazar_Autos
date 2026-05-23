import { ArrowRight, AtSign, CarFront, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "./Hooks/UseLoginMutation";
import { initialLoginForm, type LoginForm } from "./types/Login.types";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginForm>(initialLoginForm);

  const { mutate, isPending } = useLoginMutation();

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as keyof LoginForm]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground lg:grid lg:grid-cols-2">
      {/* Brand panel — visible on lg+ only */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-[#1a4bd3] via-[#2f63f6] to-[#3b6df6] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 0%, transparent 40%), radial-gradient(circle at 80% 80%, white 0%, transparent 40%)",
          }}
          aria-hidden="true"
        />
        <div className="relative flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
            <CarFront size={28} className="rotate-12 text-white" strokeWidth={1.75} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-tight">Bazar de Autos</span>
            <span className="text-xs uppercase tracking-[0.3em] text-white/70">
              Acceso profesional
            </span>
          </div>
        </div>

        <div className="relative space-y-6">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight">
            Gestión integral
            <br />
            <span className="text-white/70">para tu bazar de autos.</span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-white/80">
            Catálogo, inversionistas, gastos y rendimiento en una sola plataforma.
            Información consolidada y decisiones basadas en datos reales.
          </p>
        </div>

        <div className="relative flex items-center gap-2 text-xs text-white/70">
          <ShieldCheck size={16} />
          <span>Conexión cifrada · Sesión protegida</span>
        </div>
      </aside>

      {/* Form panel */}
      <main className="flex min-h-screen items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile brand */}
          <div className="flex flex-col items-center gap-3 lg:hidden">
            <div className="relative">
              <div className="flex size-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#2f63f6] to-[#1a4bd3] shadow-lg shadow-blue-500/30">
                <CarFront size={48} className="rotate-12 text-white" strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-1 shadow-sm">
                <ShieldCheck
                  size={18}
                  className="text-[#3b6df6]"
                  fill="#3b6df6"
                  stroke="white"
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-semibold tracking-tight">¡Qué bueno verte!</h1>
            <p className="text-sm text-muted-foreground">
              Inicia sesión para entrar al Bazar de Autos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="login-email">Correo electrónico</Label>
              <div className="relative">
                <AtSign
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleFieldChange}
                  placeholder="tu@correo.com"
                  className="h-11 pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">Contraseña</Label>
              <div className="relative">
                <Lock
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleFieldChange}
                  placeholder="••••••••"
                  className="h-11 pl-10 pr-10 tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={isPending} className="h-11 w-full text-base">
              {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
              {!isPending && <ArrowRight />}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
