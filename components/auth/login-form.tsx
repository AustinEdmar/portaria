"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, QrCode, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { font, eyebrow } from "@/lib/typography";
import Link from "next/link";
import Image from "next/image";

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void;
  loading?: boolean;
  error?: string | null;
}

/**
 * Ecrã de autenticação — a metade escura reutiliza a paleta e o motivo
 * "crachá perfurado" do resto do produto. O selo do próprio ecrã de login
 * é a linha de perfuração central: como se o painel de marca fosse o
 * canhoto do crachá, e o formulário fosse a parte que se destaca e usa.
 */
export function LoginForm({ onSubmit, loading = false, error = null }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  const timeLabel = now
    ? new Intl.DateTimeFormat("pt-AO", {
      timeZone: "Africa/Luanda",
      hour: "2-digit",
      minute: "2-digit",
    }).format(now)
    : "--:--";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.(email, password);
  }

  return (
    <div className="min-h-screen w-full flex bg-[#F5F6F8] relative">
      {/* Painel de marca — oculto em ecrãs pequenos */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#0B1220] relative overflow-hidden flex-col justify-between p-10">
        {/* imagem de fundo — troca o src pela tua foto (receção, portaria, edifício, etc.) */}
        <Image
          src="/images/security.jpeg"
          alt=""
          fill
          priority
          className="object-cover opacity-40 grayscale-[20%]"
        />
        {/* vinheta escura sobre a imagem, para o texto e o cartão continuarem legíveis */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/70 via-[#0B1220]/80 to-[#0B1220]" />
        {/* textura de fundo: grelha de pontos + vinheta */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(600px circle at 15% 0%, rgba(36,82,255,0.25), transparent 60%), radial-gradient(500px circle at 100% 100%, rgba(36,82,255,0.12), transparent 55%)",
          }}
        />

        <div className="relative flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md   bg-gradient-to-r
    from-cyan-500
    to-blue-500
    hover:from-cyan-600
    hover:to-blue-600 flex items-center justify-center shadow-[0_0_0_4px_rgba(36,82,255,0.15)]">
            <ShieldCheck className="w-4.5 h-4.5 text-white" />
          </div>
          <p style={{ fontFamily: font.display }} className="text-white font-bold text-sm tracking-tight">
            Portaria+
          </p>
        </div>

        <div className="relative space-y-7">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22C55E]" />
            </span>
            <span style={{ fontFamily: font.mono }} className="text-[10.5px] text-slate-400 tracking-wide">
              Sistema em linha · {timeLabel} WAT
            </span>
          </div>

          <p
            style={{ fontFamily: font.display }}
            className="text-white text-3xl font-extrabold leading-[1.15] tracking-tight max-w-sm"
          >
            Transforme entradas em dados, e dados em segurança.
          </p>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
            Controlo de acesso de visitantes para edifícios corporativos —
            check-in em segundos, ocupação em tempo real e relatórios prontos
            para auditoria.
          </p>

          {/* Pilha de crachás ilustrativa */}
          <div className="relative w-full max-w-[248px] pt-2">
            <div className="absolute inset-x-3 top-0 h-full rounded-2xl border border-white/10 bg-white/[0.02] rotate-[3deg]" />
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur-sm overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] -rotate-[1.5deg]">
              <div className="border-b border-dashed border-white/15 relative px-4 pt-4 pb-3">
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0B1220] border border-white/10" />
                <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0B1220] border border-white/10" />
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">Acesso validado</p>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
                </div>
                <p style={{ fontFamily: font.display }} className="text-white font-bold text-sm mt-1">
                  Torre A — Receção
                </p>
              </div>
              <div className="px-4 py-3 flex items-center justify-between gap-3">
                <span style={{ fontFamily: font.mono }} className="text-[11px] text-slate-500 shrink-0">
                  24 check-ins hoje
                </span>
                {/* mini código de barras */}
                <div className="flex items-end gap-[2px] h-5 opacity-70">
                  {[3, 5, 2, 6, 4, 2, 5, 3, 6, 2, 4, 5, 3, 2].map((h, i) => (
                    <span
                      key={i}
                      className="w-[2px] bg-slate-400"
                      style={{ height: `${h * 3}px` }}
                    />
                  ))}
                </div>
              </div>
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
          <h1
            style={{ fontFamily: font.display }}
            className="text-[26px] font-extrabold text-slate-900 mt-1.5 tracking-tight"
          >
            Entrar na sua conta
          </h1>
          <p className="text-sm text-slate-500 mt-1.5">
            Use as credenciais fornecidas pelo administrador do sistema.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative group">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#2452FF]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="turno@empresa.co.ao"
                  className="pl-9 h-11 border-slate-200 focus-visible:ring-2 focus-visible:ring-[#2452FF]/25 focus-visible:border-[#2452FF] transition-shadow"
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
                <button type="button" className="text-[12px] text-[#2452FF] hover:underline underline-offset-2">
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative group">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#2452FF]" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 pr-9 h-11 border-slate-200 focus-visible:ring-2 focus-visible:ring-[#2452FF]/25 focus-visible:border-[#2452FF] transition-shadow"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 
               bg-gradient-to-r
    from-cyan-500
    to-blue-500
    hover:from-cyan-600
    hover:to-blue-600
    gap-2
    shrink-0
    shadow-[0_10px_25px_-8px_rgba(14,165,233,0.5)]
hover:shadow-[0_14px_30px_-8px_rgba(14,165,233,0.65)]
    transition-all
              "
            >
              {loading ? (
                "A validar..."
              ) : (
                <Link href="/" className="flex items-center gap-2 font-bold">
                  Entrar
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-[11px] text-slate-400">ou</span>
            <Separator className="flex-1" />
          </div>

          <Button variant="outline" className="w-full h-11 gap-2 border-slate-200 hover:border-[#2452FF]/40 hover:bg-[#2452FF]/5 transition-colors">
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