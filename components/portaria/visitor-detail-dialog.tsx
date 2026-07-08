"use client";

import { Phone, Mail, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BadgeCracha } from "./badge-cracha";
import { StatusBadge } from "./status-badge";
import { font, monoData } from "@/lib/typography";
import type { Visitor } from "@/lib/types";

interface VisitorDetailDialogProps {
  visitor: Visitor | null;
  onOpenChange: (open: boolean) => void;
  onCheckout?: (visitor: Visitor) => void;
}

export function VisitorDetailDialog({ visitor, onOpenChange, onCheckout }: VisitorDetailDialogProps) {
  return (
    <Dialog open={!!visitor} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: font.display }}>Detalhe do visitante</DialogTitle>
        </DialogHeader>
        {visitor && (
          <div className="grid md:grid-cols-2 gap-6 py-2">
            <BadgeCracha visitor={visitor} />
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Documento</span>
                <span className={`font-medium ${monoData}`} style={{ fontFamily: font.mono }}>{visitor.doc}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Entrada</span>
                <span className={`font-medium ${monoData}`} style={{ fontFamily: font.mono }}>{visitor.checkin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Saída prevista</span>
                <span className={`font-medium ${monoData}`} style={{ fontFamily: font.mono }}>{visitor.expected}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Estado</span>
                <StatusBadge status={visitor.status} />
              </div>
              <Separator />
              <div className="flex gap-2 pt-1">
                <Button size="sm" variant="outline" className="gap-1.5 flex-1">
                  <Phone className="w-3.5 h-3.5" />
                  Ligar anfitrião
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5 flex-1">
                  <Mail className="w-3.5 h-3.5" />
                  Notificar
                </Button>
              </div>
              <Button
                size="sm"
                className="w-full gap-1.5 bg-[#DC2626] hover:bg-[#b91c1c]"
                onClick={() => onCheckout?.(visitor)}
              >
                <LogOut className="w-3.5 h-3.5" /> Registar saída
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
