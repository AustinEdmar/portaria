"use client";

import { useState } from "react";
import { Building2, Bell, ShieldCheck, Plug } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { font, eyebrow, sectionTitle } from "@/lib/typography";

interface SettingRowProps {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function SettingRow({ title, description, checked, onCheckedChange }: SettingRowProps) {
  return (
    <div className="flex items-start justify-between gap-6 py-3.5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-800">{title}</p>
        <p className="text-[12px] text-slate-400 mt-0.5">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} className="shrink-0 mt-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#1d40cc]" />
    </div>
  );
}

export function SettingsTab() {
  const [requirePhoto, setRequirePhoto] = useState(true);
  const [requireDoc, setRequireDoc] = useState(true);
  const [autoExpire, setAutoExpire] = useState(true);
  const [notifyHostArrival, setNotifyHostArrival] = useState(true);
  const [notifyHostSms, setNotifyHostSms] = useState(false);
  const [notifyLateAlert, setNotifyLateAlert] = useState(true);

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-400" />
            <p className={eyebrow}>Edifício</p>
          </div>
          <CardTitle style={{ fontFamily: font.display }} className={`${sectionTitle} text-base mt-0.5`}>
            Dados gerais
          </CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="building-name">Nome do edifício</Label>
            <Input id="building-name" defaultValue="Torre A — Sede Luanda" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="timezone">Fuso horário</Label>
            <Input id="timezone" defaultValue="África/Luanda (UTC+01:00)" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="address">Endereço</Label>
            <Input id="address" defaultValue="Rua Amílcar Cabral, Luanda, Angola" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <p className={eyebrow}>Segurança</p>
          </div>
          <CardTitle style={{ fontFamily: font.display }} className={`${sectionTitle} text-base mt-0.5`}>
            Regras de check-in
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-slate-100">
          <SettingRow
            title="Exigir foto do documento"
            description="A receção deve capturar uma foto do documento de identificação antes de emitir o crachá."
            checked={requireDoc}
            onCheckedChange={setRequireDoc}
          />
          <SettingRow
            title="Exigir foto do visitante"
            description="Captura obrigatória do rosto do visitante durante o check-in."
            checked={requirePhoto}
            onCheckedChange={setRequirePhoto}
          />
          <SettingRow
            title="Expirar crachá automaticamente"
            description="O crachá deixa de ser válido às 23:59 do próprio dia, mesmo sem check-out registado."
            checked={autoExpire}
            onCheckedChange={setAutoExpire}
          />
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-slate-400" />
            <p className={eyebrow}>Notificações</p>
          </div>
          <CardTitle style={{ fontFamily: font.display }} className={`${sectionTitle} text-base mt-0.5`}>
            Avisos automáticos
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-slate-100">
          <SettingRow
            title="Notificar anfitrião na chegada"
            description="Enviar e-mail ao anfitrião assim que o visitante fizer check-in."
            checked={notifyHostArrival}
            onCheckedChange={setNotifyHostArrival}
          />
          <SettingRow
            title="Lembrete por SMS"
            description="Enviar SMS ao anfitrião 5 minutos após a chegada, caso ainda não tenha respondido."
            checked={notifyHostSms}
            onCheckedChange={setNotifyHostSms}
          />
          <SettingRow
            title="Alerta de atraso"
            description="Avisar a receção quando um visitante ultrapassar o tempo previsto de saída."
            checked={notifyLateAlert}
            onCheckedChange={setNotifyLateAlert}
          />
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Plug className="w-4 h-4 text-slate-400" />
            <p className={eyebrow}>Integrações</p>
          </div>
          <CardTitle style={{ fontFamily: font.display }} className={`${sectionTitle} text-base mt-0.5`}>
            Controlo de acesso
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <p className="text-[13px] text-slate-500 max-w-md">
            Ligue este sistema a catracas, fechaduras eletrónicas ou leitores de QR para liberar o
            acesso automaticamente ao validar o crachá.
          </p>
          <Button variant="outline" className="shrink-0">
            Configurar integração
          </Button>
        </CardContent>
      </Card>

      <Separator />

      <div className="flex justify-end gap-2">
        <Button variant="ghost">Cancelar</Button>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#1d40cc]">Guardar alterações</Button>
      </div>
    </div>
  );
}
