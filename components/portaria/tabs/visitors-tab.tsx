"use client";

import { useMemo, useState } from "react";
import { Search, Plus, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "../status-badge";
import { font, eyebrow, sectionTitle, monoData } from "@/lib/typography";
import { initials } from "@/lib/utils-portaria";
import { VISITORS } from "@/lib/mock-data";
import type { Visitor, VisitorStatus } from "@/lib/types";

interface VisitorsTabProps {
  onNewCheckin: () => void;
  onSelect: (visitor: Visitor) => void;
}

export function VisitorsTab({ onNewCheckin, onSelect }: VisitorsTabProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"Todos" | VisitorStatus>("Todos");

  const filtered = useMemo(() => {
    return VISITORS.filter((v) => {
      const matchQuery =
        v.name.toLowerCase().includes(query.toLowerCase()) ||
        v.company.toLowerCase().includes(query.toLowerCase());
      const matchFilter = filter === "Todos" || v.status === filter;
      return matchQuery && matchFilter;
    });
  }, [query, filter]);

  return (
    <Card className="border-slate-200">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
        <div>
          <p className={eyebrow}>{filtered.length} registos</p>
          <CardTitle style={{ fontFamily: font.display }} className={`${sectionTitle} text-base mt-0.5`}>
            Registo de visitantes
          </CardTitle>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Procurar visitante..."
              className="pl-8 h-9 w-full sm:w-56"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={(v) => setFilter(v as "Todos" | VisitorStatus)}>
            <SelectTrigger className="h-9 w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="No prédio">No prédio</SelectItem>
              <SelectItem value="Agendado">Agendado</SelectItem>
              <SelectItem value="Atrasado">Atrasado</SelectItem>
              <SelectItem value="Finalizado">Finalizado</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={onNewCheckin} className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#1d40cc] gap-2 h-9 cursor-pointer" >
            <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Novo</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Visitante</TableHead>
                <TableHead className="hidden md:table-cell">Anfitrião</TableHead>
                <TableHead className="hidden lg:table-cell">Motivo</TableHead>
                <TableHead>Entrada</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-sm text-slate-400 py-10">
                    Nenhum visitante corresponde à procura.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((v) => (
                <TableRow key={v.id} className="cursor-pointer" onClick={() => onSelect(v)}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback className="bg-[#2452FF]/10 text-[#2452FF] text-[11px]">
                          {initials(v.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{v.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{v.company}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-slate-600">{v.host}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-slate-600">{v.reason}</TableCell>
                  <TableCell className={`text-sm text-slate-600 ${monoData}`} style={{ fontFamily: font.mono }}>
                    {v.checkin}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={v.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" className="text-slate-500">
                      Ver <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
