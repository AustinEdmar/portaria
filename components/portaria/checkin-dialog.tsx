"use client";

import { useState } from "react";
import { Camera, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BadgeCracha } from "./badge-cracha";
import { font } from "@/lib/typography";
import { HOSTS } from "@/lib/mock-data";
import type { VisitorDraft } from "@/lib/types";

interface CheckinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (visitor: VisitorDraft) => void;
}

const EMPTY_FORM: VisitorDraft = { name: "", company: "", host: "", reason: "" };

export function CheckinDialog({ open, onOpenChange, onConfirm }: CheckinDialogProps) {
  const [form, setForm] = useState<VisitorDraft>(EMPTY_FORM);

  const update =
    (key: keyof VisitorDraft) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  function handleConfirm() {
    onConfirm?.(form);
    setForm(EMPTY_FORM);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: font.display }}>Registar novo check-in</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 py-2">
          <div className="space-y-3.5">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" placeholder="Ex.: Marina Cardoso" value={form.name ?? ""} onChange={update("name")} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="doc">Documento</Label>
                <Input id="doc" placeholder="00.000.000-0" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="company">Empresa</Label>
                <Input id="company" placeholder="Opcional" value={form.company ?? ""} onChange={update("company")} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Funcionário a visitar</Label>
                <Select onValueChange={(v: string | null) => setForm((f) => ({ ...f, host: v ?? "" }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="A visitar funcionario(a) " />
                  </SelectTrigger>
                  <SelectContent>
                    {HOSTS.map((h) => (
                      <SelectItem key={h.id} value={h.name}>
                        {h.name} · {h.department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="leftObjects">Pertences deixados na recepção</Label>
                <Input id="leftObjects" placeholder="Ex.: Mala, Notebook" value={form.leftObjects ?? ""} onChange={update("leftObjects")} />
              </div>
            </div>


            <div className="space-y-1.5">
              <Label htmlFor="reason">Motivo da visita</Label>
              <Input id="reason" placeholder="Ex.: Reunião comercial" value={form.reason ?? ""} onChange={update("reason")} />
            </div>
            <Button variant="outline" className="w-full gap-2 text-slate-600">
              <Camera className="w-4 h-4" /> Capturar foto do documento
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-slate-200 py-6">
            <p className="text-[11px] uppercase tracking-wide text-slate-400 mb-3">Pré-visualização</p>
            <BadgeCracha visitor={form} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#1d40cc] gap-2" onClick={handleConfirm}>
            <ShieldCheck className="w-4 h-4" /> Confirmar entrada
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
