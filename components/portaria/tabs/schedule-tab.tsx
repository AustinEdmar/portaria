"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  Clock3,
  RotateCw,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatCard } from "../stat-card";
import { font, eyebrow, sectionTitle } from "@/lib/typography";
import { VISITORS } from "@/lib/mock-data";

// --- Types ---------------------------------------------------------------
// Assumes VISITORS items look like { id, name, reason, host, expected, status }.
// `date` is treated as optional in the source data — items without it are
// pinned to "today" so the tab works even if mock-data hasn't been extended.

type VisitorStatus = "Agendado" | "Pré-aprovado" | "Cancelado" | string;

interface ScheduledVisitor {
  id: string | number;
  name: string;
  reason: string;
  host: string;
  expected: string; // "HH:MM"
  date?: string; // "YYYY-MM-DD"
  status: VisitorStatus;
  [key: string]: any;
}

const REASONS = ["Reunião", "Entrevista", "Entrega", "Visita técnica", "Formação", "Outro"];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function addDaysISO(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function sameDay(aISO: string, bISO: string) {
  return aISO === bISO;
}

function formatDateLabel(iso?: string) {
  const value = iso ?? todayISO();
  if (sameDay(value, todayISO())) return "Hoje";
  if (sameDay(value, addDaysISO(1))) return "Amanhã";
  const date = new Date(value + "T00:00:00");
  const label = date.toLocaleDateString("pt-PT", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

const emptyForm = {
  name: "",
  reason: REASONS[0],
  host: "",
  date: todayISO(),
  time: "09:00",
};

// --- Component -------------------------------------------------------------

export function ScheduleTab() {
  const [visitors, setVisitors] = useState<ScheduledVisitor[]>(() =>
    (VISITORS as ScheduledVisitor[]).map((v) => ({ ...v, date: v.date ?? todayISO() }))
  );
  const [search, setSearch] = useState("");
  const [dayFilter, setDayFilter] = useState<"all" | "today" | "tomorrow">("all");
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [rescheduleTarget, setRescheduleTarget] = useState<ScheduledVisitor | null>(null);
  const [rescheduleForm, setRescheduleForm] = useState({ date: todayISO(), time: "09:00" });

  const scheduled = useMemo(() => {
    return visitors
      .filter((v) => v.status === "Agendado" || v.status === "Pré-aprovado")
      .filter((v) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          v.name.toLowerCase().includes(q) ||
          v.host.toLowerCase().includes(q) ||
          v.reason.toLowerCase().includes(q)
        );
      })
      .filter((v) => {
        if (dayFilter === "all") return true;
        const label = formatDateLabel(v.date);
        if (dayFilter === "today") return label === "Hoje";
        if (dayFilter === "tomorrow") return label === "Amanhã";
        return true;
      })
      .sort((a, b) => `${a.date}${a.expected}`.localeCompare(`${b.date}${b.expected}`));
  }, [visitors, search, dayFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, ScheduledVisitor[]>();
    scheduled.forEach((v) => {
      const key = v.date ?? todayISO();
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(v);
    });
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [scheduled]);

  const totalCount = scheduled.length;
  const preApprovedCount = scheduled.filter((v) => v.status === "Pré-aprovado").length;
  const todayCount = scheduled.filter((v) => formatDateLabel(v.date) === "Hoje").length;

  function handleCreate() {
    if (!form.name.trim() || !form.host.trim()) return;
    const newVisitor: ScheduledVisitor = {
      id: `sch-${Date.now()}`,
      name: form.name.trim(),
      reason: form.reason,
      host: form.host.trim(),
      expected: form.time,
      date: form.date,
      status: "Agendado",
    };
    setVisitors((prev) => [...prev, newVisitor]);
    setForm(emptyForm);
    setIsNewOpen(false);
  }

  function openReschedule(v: ScheduledVisitor) {
    setRescheduleTarget(v);
    setRescheduleForm({ date: v.date ?? todayISO(), time: v.expected });
  }

  function handleReschedule() {
    if (!rescheduleTarget) return;
    setVisitors((prev) =>
      prev.map((v) =>
        v.id === rescheduleTarget.id
          ? { ...v, date: rescheduleForm.date, expected: rescheduleForm.time }
          : v
      )
    );
    setRescheduleTarget(null);
  }

  function handlePreApprove(id: ScheduledVisitor["id"]) {
    setVisitors((prev) => prev.map((v) => (v.id === id ? { ...v, status: "Pré-aprovado" } : v)));
  }

  function handleCancel(id: ScheduledVisitor["id"]) {
    if (!window.confirm("Cancelar este agendamento?")) return;
    setVisitors((prev) => prev.map((v) => (v.id === id ? { ...v, status: "Cancelado" } : v)));
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="Agendamentos" value={String(totalCount)} hint="ativos" tone="blue" icon={Users} />
        <StatCard
          label="Pré-aprovados"
          value={String(preApprovedCount)}
          hint="prontos para entrada"
          tone="green"
          icon={CheckCircle2}
        />
        <StatCard label="Hoje" value={String(todayCount)} hint="para hoje" tone="amber" icon={Clock3} />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar por nome, anfitrião ou motivo"
              className="pl-8 h-9"
            />
          </div>
          <Select value={dayFilter} onValueChange={(v) => setDayFilter(v as typeof dayFilter)}>
            <SelectTrigger className="h-9 w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os dias</SelectItem>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="tomorrow">Amanhã</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isNewOpen} onOpenChange={setIsNewOpen}>
          <Button className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#1d40cc]" onClick={() => setIsNewOpen(true)}>
            <CalendarPlus className="w-4 h-4" /> Novo agendamento
          </Button>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle style={{ fontFamily: font.display }}>Novo agendamento</DialogTitle>
              <DialogDescription>Preencha os dados da visita para agendar a entrada.</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="v-name">Nome do visitante</Label>
                <Input
                  id="v-name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Ex: Ana Ferreira"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Motivo</Label>
                  <Select value={form.reason ?? undefined} onValueChange={(v) => setForm((f) => ({ ...f, reason: v ?? "" }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {REASONS.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="v-host">Anfitrião</Label>
                  <Input
                    id="v-host"
                    value={form.host}
                    onChange={(e) => setForm((f) => ({ ...f, host: e.target.value }))}
                    placeholder="Ex: João Neto"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="v-date">Data</Label>
                  <Input
                    id="v-date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="v-time">Hora</Label>
                  <Input
                    id="v-time"
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewOpen(false)}>
                Cancelar
              </Button>
              <Button
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#1d40cc]"
                onClick={handleCreate}
                disabled={!form.name.trim() || !form.host.trim()}
              >
                Agendar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* List */}
      <Card className="border-slate-200">
        <CardHeader>
          <p className={eyebrow}>{totalCount} confirmados</p>
          <CardTitle style={{ fontFamily: font.display }} className={`${sectionTitle} text-base mt-0.5`}>
            Próximos agendamentos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {grouped.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-10 text-center">
              <CalendarDays className="w-8 h-8 text-slate-300" />
              <p className="text-sm text-slate-400">Sem agendamentos para os filtros selecionados.</p>
            </div>
          )}

          {grouped.map(([dateKey, items]) => (
            <div key={dateKey} className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                {formatDateLabel(dateKey)}
              </p>
              <div className="space-y-3">
                {items.map((v) => {
                  const isPreApproved = v.status === "Pré-aprovado";
                  const [hh, mm] = v.expected.split(":");
                  return (
                    <div
                      key={v.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between p-3.5 rounded-xl border border-slate-200"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center shrink-0 ${isPreApproved ? "bg-[#1FA97C]/10" : "bg-[#E08A00]/10"
                            }`}
                        >
                          <span
                            style={{ fontFamily: font.mono }}
                            className={`text-[10px] font-bold leading-none ${isPreApproved ? "text-[#0e6b4d]" : "text-[#8a5500]"
                              }`}
                          >
                            {hh}h
                          </span>
                          <span
                            style={{ fontFamily: font.mono }}
                            className={`text-[9px] ${isPreApproved ? "text-[#0e6b4d]" : "text-[#8a5500]"}`}
                          >
                            {mm}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-slate-800">{v.name}</p>
                            {isPreApproved && (
                              <Badge className="bg-[#1FA97C]/10 text-[#0e6b4d] hover:bg-[#1FA97C]/10 border-0 text-[10px]">
                                Pré-aprovado
                              </Badge>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400">
                            {v.reason} · com {v.host}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 sm:ml-auto">
                        <Button size="sm" variant="outline" className="gap-1.5" onClick={() => openReschedule(v)}>
                          <RotateCw className="w-3.5 h-3.5" /> Reagendar
                        </Button>
                        {!isPreApproved && (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-emerald-400 to-cyan-400 "
                            onClick={() => handlePreApprove(v.id)}
                          >
                            Pré-aprovar
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-slate-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleCancel(v.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Reschedule dialog */}
      <Dialog open={!!rescheduleTarget} onOpenChange={(open) => !open && setRescheduleTarget(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: font.display }}>Reagendar visita</DialogTitle>
            <DialogDescription>
              {rescheduleTarget && `${rescheduleTarget.name} · com ${rescheduleTarget.host}`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="r-date">Nova data</Label>
              <Input
                id="r-date"
                type="date"
                value={rescheduleForm.date}
                onChange={(e) => setRescheduleForm((f) => ({ ...f, date: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="r-time">Nova hora</Label>
              <Input
                id="r-time"
                type="time"
                value={rescheduleForm.time}
                onChange={(e) => setRescheduleForm((f) => ({ ...f, time: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRescheduleTarget(null)}>
              Cancelar
            </Button>
            <Button className="bg-[#2452FF] hover:bg-[#1d40cc]" onClick={handleReschedule}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}