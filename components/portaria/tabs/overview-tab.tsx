"use client";

import { Users, ShieldCheck, CalendarClock, AlertTriangle, Plus, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatCard } from "../stat-card";
import { MiniBarChart } from "../mini-bar-chart";
import { font, eyebrow, sectionTitle, monoData } from "@/lib/typography";
import { initials } from "@/lib/utils-portaria";
import { VISITORS, OCCUPANCY_TODAY } from "@/lib/mock-data";

export function OverviewTab({ onNewCheckin }: { onNewCheckin: () => void }) {
  const now = VISITORS.filter((v) => v.status === "No prédio");
  const scheduled = VISITORS.filter((v) => v.status === "Agendado");
  const late = VISITORS.filter((v) => v.status === "Atrasado");

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Visitantes hoje" value={VISITORS.length + 18} hint="+18% vs. ontem" tone="blue" icon={Users} />
        <StatCard label="No prédio agora" value={now.length} hint="ocupação em tempo real" tone="green" icon={ShieldCheck} />
        <StatCard label="Agendados" value={scheduled.length} hint="para as próximas horas" tone="amber" icon={CalendarClock} />
        <StatCard label="Atrasados" value={late.length} hint="acima do tempo previsto" tone="red" icon={AlertTriangle} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-slate-200">
          <CardHeader className="pb-0">
            <p className={eyebrow}>Tráfego de entradas</p>
            <CardTitle style={{ fontFamily: font.display }} className={`${sectionTitle} text-base mt-0.5`}>
              Fluxo de hoje, por hora
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <MiniBarChart data={OCCUPANCY_TODAY} />
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <p className={eyebrow}>Ao vivo</p>
              <CardTitle style={{ fontFamily: font.display }} className={`${sectionTitle} text-base mt-0.5`}>
                No prédio agora
              </CardTitle>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#1FA97C] animate-pulse shrink-0" />
          </CardHeader>
          <CardContent className="space-y-3">
            {now.length === 0 && (
              <p className="text-xs text-slate-400 py-4 text-center">Nenhum visitante no edifício.</p>
            )}
            {now.map((v) => (
              <div key={v.id} className="flex items-center gap-2.5">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-[#1FA97C]/10 text-[#137a58] text-[11px]">
                    {initials(v.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-800 truncate">{v.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">com {v.host}</p>
                </div>
                <span
                  style={{ fontFamily: font.mono }}
                  className={`flex items-center gap-1 text-[11px] text-slate-400 ${monoData}`}
                >
                  <Clock className="w-3 h-3" />
                  {v.checkin}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 border-dashed">
        <CardContent className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <p style={{ fontFamily: font.display }} className="font-bold text-slate-800 text-sm">
              Chegou um visitante novo?
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Emita o crachá e registe a entrada em menos de 30 segundos.
            </p>
          </div>
          <Button onClick={onNewCheckin} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#1d40cc] gap-2 shrink-0">
            <Plus className="w-4 h-4" /> Novo check-in
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
