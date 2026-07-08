"use client";

import { useMemo, useState } from "react";
import { Search, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HostStatusBadge } from "../status-badge";
import { font, eyebrow, sectionTitle, monoData } from "@/lib/typography";
import { initials } from "@/lib/utils-portaria";
import { HOSTS } from "@/lib/mock-data";

export function HostsTab() {
  const [query, setQuery] = useState("");

  const [mostrarTelefone, setMostrarTelefone] = useState<string | null>(null);
  const [mostrarEmail, setMostrarEmail] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      HOSTS.filter(
        (h) =>
          h.name.toLowerCase().includes(query.toLowerCase()) ||
          h.department.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <Card className="border-slate-200">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
        <div>
          <p className={eyebrow}>{HOSTS.length} colaboradores</p>
          <CardTitle style={{ fontFamily: font.display }} className={`${sectionTitle} text-base mt-0.5`}>
            Diretório de funcionarios
          </CardTitle>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Procurar por nome ou departamento..."
            className="pl-8 h-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map((h) => (
            <div key={h.id} className="rounded-xl border border-slate-200 p-4 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="bg-[#2452FF]/10 text-[#2452FF] text-xs font-semibold">
                    {initials(h.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800 truncate">{h.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{h.department}</p>
                </div>
                <HostStatusBadge status={h.status} />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span style={{ fontFamily: font.mono }} className={monoData}>
                  Andar/sector: {h.extension}
                </span>
                <span>{h.visitsToday} visita(s) hoje</span>
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 gap-1.5 text-xs"
                  onClick={() => setMostrarTelefone(mostrarTelefone === h.id ? null : h.id)}
                >
                  <Phone className="w-3.5 h-3.5" />
                  {mostrarTelefone === h.id ? "+244 923 456 789" : "Ligar"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 gap-1.5 text-xs"
                  onClick={() =>
                    setMostrarEmail(mostrarEmail === h.id ? null : h.id)
                  }
                >
                  <Mail className="w-3.5 h-3.5" />
                  {mostrarEmail === h.id ? h.email : "E-mail"}
                </Button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-sm text-slate-400 py-10">
              Nenhum anfitrião encontrado.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
