"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { font, eyebrow, sectionTitle, monoData } from "@/lib/typography";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Camera,
  ShieldCheck,
  Lock,
  Smartphone,
  Monitor,
  Clock,
  LogOut,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";




import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { initials } from "@/lib/utils-portaria";
import { CURRENT_USER, SESSIONS, ACTIVITY_LOG } from "@/lib/mock-data";



export function ProfileTab() {
  const router = useRouter();
  const [user, setUser] = useState(CURRENT_USER);
  const [twoFactor, setTwoFactor] = useState(true);
  const [saved, setSaved] = useState(false);

  function updateField<K extends keyof typeof user>(key: K, value: (typeof user)[K]) {
    setUser((u) => ({ ...u, [key]: value }));
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-6">




      {/* Cabeçalho do perfil */}
      <Card className="border-slate-200">
        <CardContent className="py-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative shrink-0">
            <Avatar className="h-20 w-20 border-2 border-slate-100">
              <AvatarFallback className="bg-[#2452FF]/10 text-[#2452FF] text-xl font-bold">
                {initials(user.name)}
              </AvatarFallback>
            </Avatar>
            <button
              className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#0B1220] text-white border-2 border-white"
              aria-label="Alterar foto de perfil"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
              <p style={{ fontFamily: font.display }} className="font-extrabold text-slate-900 text-lg">
                {user.name}
              </p>
              <Badge variant="outline" className="gap-1 text-[#2452FF] bg-[#2452FF]/10 border-[#2452FF]/30">
                <ShieldCheck className="w-3 h-3" /> {user.role}
              </Badge>
            </div>
            <p className="text-sm text-slate-500 mt-1">{user.department} · {user.building}</p>
            <p style={{ fontFamily: font.mono }} className={`text-[11px] text-slate-400 mt-1.5 ${monoData}`}>
              No sistema desde {user.joinedOn}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dados pessoais */}
      <Card className="border-slate-200">
        <CardHeader>
          <p className={eyebrow}>Conta</p>
          <CardTitle style={{ fontFamily: font.display }} className={`${sectionTitle} text-base mt-0.5`}>
            Dados pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="profile-name">Nome completo</Label>
            <Input id="profile-name" value={user.name} onChange={(e) => updateField("name", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-email">E-mail</Label>
            <Input id="profile-email" type="email" value={user.email} onChange={(e) => updateField("email", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-phone">Telefone</Label>
            <Input id="profile-phone" value={user.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+244 9XX XXX XXX" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="profile-department">Departamento / posto</Label>
            <Input id="profile-department" value={user.department} onChange={(e) => updateField("department", e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Segurança */}
      <Card className="border-slate-200">
        <CardHeader>
          <p className={eyebrow}>Segurança</p>
          <CardTitle style={{ fontFamily: font.display }} className={`${sectionTitle} text-base mt-0.5`}>
            Senha e autenticação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="current-password">Senha atual</Label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input id="current-password" type="password" placeholder="••••••••" className="pl-9" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-password">Nova senha</Label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input id="new-password" type="password" placeholder="••••••••" className="pl-9" />
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-slate-800">Autenticação de dois fatores</p>
              <p className="text-[12px] text-slate-400 mt-0.5">
                Exige um código adicional enviado por SMS ao iniciar sessão num novo dispositivo.
              </p>
            </div>
            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} className="shrink-0 mt-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#1d40cc]" />
          </div>
        </CardContent>
      </Card>

      {/* Sessões ativas */}
      {/* <Card className="border-slate-200">
        <CardHeader>
          <p className={eyebrow}>Dispositivos</p>
          <CardTitle style={{ fontFamily: font.display }} className={`${sectionTitle} text-base mt-0.5`}>
            Sessões ativas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {SESSIONS.map((s) => {
            const Icon = s.device.toLowerCase().includes("android") || s.device.toLowerCase().includes("ios")
              ? Smartphone
              : Monitor;
            return (
              <div key={s.id} className="flex items-center justify-between gap-3 py-3 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="p-2 rounded-lg bg-slate-100 text-slate-500 shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {s.device} {s.current && <span className="text-[#137a58]">· sessão atual</span>}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">{s.location} · {s.lastActive}</p>
                  </div>
                </div>
                {!s.current && (
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-[#b91c1c] shrink-0 gap-1.5">
                    <LogOut className="w-3.5 h-3.5" /> Encerrar
                  </Button>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card> */}

      {/* Atividade recente */}
      {/*  <Card className="border-slate-200">
        <CardHeader>
          <p className={eyebrow}>Auditoria</p>
          <CardTitle style={{ fontFamily: font.display }} className={`${sectionTitle} text-base mt-0.5`}>
            Atividade recente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {ACTIVITY_LOG.map((a) => (
            <div key={a.id} className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
              <span className="p-1.5 rounded-lg bg-[#2452FF]/10 text-[#2452FF] shrink-0 mt-0.5">
                <Clock className="w-3.5 h-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-800">{a.action}</p>
                <p className="text-[12px] text-slate-500">{a.detail}</p>
              </div>
              <span style={{ fontFamily: font.mono }} className={`text-[11px] text-slate-400 shrink-0 ${monoData}`}>
                {a.time}
              </span>
            </div>
          ))}
        </CardContent>
      </Card> */}



      <Separator />

      <div className="flex justify-end gap-2">
        <Button variant="ghost">Cancelar</Button>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#1d40cc] ">Guardar alterações</Button>
      </div>
    </div>
  );
}
