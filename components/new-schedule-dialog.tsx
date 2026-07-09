"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { font } from "@/lib/typography";

export const SCHEDULE_REASONS = ["Reunião", "Entrevista", "Entrega", "Visita técnica", "Formação", "Outro"];

export function todayISO() {
    return new Date().toISOString().slice(0, 10);
}

export interface NewScheduleForm {
    name: string;
    reason: string;
    host: string;
    date: string;
    time: string;
}

const emptyForm: NewScheduleForm = {
    name: "",
    reason: SCHEDULE_REASONS[0],
    host: "",
    date: todayISO(),
    time: "09:00",
};

interface NewScheduleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (form: NewScheduleForm) => void;
}

export function NewScheduleDialog({ open, onOpenChange, onConfirm }: NewScheduleDialogProps) {
    const [form, setForm] = useState<NewScheduleForm>(emptyForm);

    function handleCreate() {
        if (!form.name.trim() || !form.host.trim()) return;
        onConfirm(form);
        setForm(emptyForm);
        onOpenChange(false);
    }

    function handleOpenChange(next: boolean) {
        if (!next) setForm(emptyForm);
        onOpenChange(next);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
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
                            <Select value={form.reason} onValueChange={(v) => setForm((f) => ({ ...f, reason: v ?? "" }))}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {SCHEDULE_REASONS.map((r) => (
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
                    <Button variant="outline" onClick={() => handleOpenChange(false)}>
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
    );
}