"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { font, eyebrow } from "@/lib/typography";
import Link from "next/link";

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
  loading?: boolean;
  error?: string | null;
}

/**
 * Ecrã de autenticação — a metade escura reutiliza a paleta e o motivo
 * "crachá perfurado" do resto do produto, para que o primeiro ecrã que
 * a receção vê já comunique "sistema de segurança/controlo de acesso".
 */
export function LoginForm({ onSubmit, loading = false, error = null }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.(email, password);
  }

  return (
    <div className="min-h-screen w-full flex bg-[#F5F6F8]">
      {/* Painel de marca — oculto em ecrãs pequenos */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#0B1220] relative overflow-hidden flex-col justify-between p-10">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }} />

        <div className="relative flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-[#2452FF] flex items-center justify-center">
            <ShieldCheck className="w-4.5 h-4.5 text-white" />
          </div>
          <p style={{ fontFamily: font.display }} className="text-white font-bold text-sm">
            Portaria+
          </p>
        </div>

        <div className="relative space-y-6">
          <p style={{ fontFamily: font.display }} className="text-white text-3xl font-extrabold leading-tight max-w-sm">
            Cada visita, com crachá, hora e anfitrião registados.
          </p>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
            Controlo de acesso de visitantes para edifícios corporativos —
            check-in em segundos, ocupação em tempo real e relatórios prontos
            para auditoria.
          </p>

          {/* Crachá ilustrativo — mesmo motivo usado no check-in */}
          <div className="w-full max-w-[240px] rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
            <div className="border-b border-dashed border-white/15 relative px-4 pt-4 pb-3">
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0B1220] border border-white/10" />
              <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0B1220] border border-white/10" />
              <p className="text-[10px] uppercase tracking-wide text-slate-500">Acesso validado</p>
              <p style={{ fontFamily: font.display }} className="text-white font-bold text-sm mt-1">
                Torre A — Receção
              </p>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span style={{ fontFamily: font.mono }} className="text-[11px] text-slate-500">
                24 check-ins hoje
              </span>
              <QrCode className="w-6 h-6 text-slate-500" />
            </div>
          </div>
        </div>

        <p className="relative text-[11px] text-slate-600">© 2026 Portaria+ · Todos os direitos reservados</p>
      </div>

      {/* Formulário */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 rounded-md bg-[#2452FF] flex items-center justify-center">
              <ShieldCheck className="w-4.5 h-4.5 text-white" />
            </div>
            <p style={{ fontFamily: font.display }} className="text-slate-900 font-bold text-sm">
              Portaria+
            </p>
          </div>

          <p className={eyebrow}>Acesso à receção</p>
          <h1 style={{ fontFamily: font.display }} className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">
            Entrar na sua conta
          </h1>
          <p className="text-sm text-slate-500 mt-1.5">
            Use as credenciais fornecidas pelo administrador do sistema.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="turno@empresa.co.ao"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <button type="button" className="text-[12px] text-[#2452FF] hover:underline">
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 pr-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-[13px] text-[#b91c1c] bg-[#DC2626]/10 border border-[#DC2626]/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* <Button type="submit" className="w-full bg-[#2452FF] hover:bg-[#1d40cc] gap-2" disabled={loading}>
              <ShieldCheck className="w-4 h-4" />
              {loading ? "A validar..." : "Entrar"}
            </Button> */}

            <Button className="w-full bg-[#2452FF] hover:bg-[#1d40cc] gap-2">
              <ShieldCheck className="w-4 h-4" />
              <Link href="/" className="ml-1 font-medium  cursor-pointer">
                Entrar
              </Link>
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-[11px] text-slate-400">ou</span>
            <Separator className="flex-1" />
          </div>

          <Button variant="outline" className="w-full gap-2">
            <QrCode className="w-4 h-4" /> Entrar com crachá de funcionário
          </Button>

          <p className="text-[12px] text-slate-400 text-center mt-8">
            Precisa de acesso? Contacte o administrador do sistema.
          </p>
        </div>
      </div>
    </div>
  );
}
