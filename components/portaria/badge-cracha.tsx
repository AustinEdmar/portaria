import { QrCode, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { font, monoData } from "@/lib/typography";
import { initials } from "@/lib/utils-portaria";
import type { Visitor, VisitorDraft } from "@/lib/types";

/**
 * Crachá digital do visitante — elemento de assinatura do produto.
 * O corte perfurado + QR remetem ao objeto físico real que a receção
 * entrega, reforçando a metáfora em toda a interface (login, pré-visualização,
 * detalhe do visitante).
 */
export function BadgeCracha({ visitor }: { visitor: VisitorDraft | Visitor | null }) {
  if (!visitor) return null;
  return (
    <div className="w-full max-w-[280px] mx-auto rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#1d40cc] px-4 py-2.5 flex items-center justify-between">
        <span style={{ fontFamily: font.display }} className="text-white text-[11px] font-bold tracking-wide">
          CRACHÁ DE VISITANTE
        </span>
        <ShieldCheck className="w-4 h-4 text-[#4C7CFF]" />
      </div>
      <div className="border-b border-dashed border-slate-300 relative px-4 pt-4 pb-3">
        <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#F5F6F8] border border-slate-200" />
        <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#F5F6F8] border border-slate-200" />
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14 border-2 border-slate-100">
            <AvatarFallback className="bg-[#2452FF]/10 text-[#2452FF] font-semibold">
              {initials(visitor.name || "V I")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p style={{ fontFamily: font.display }} className="font-bold text-slate-900 leading-tight truncate">
              {visitor.name || "Nome do visitante"}
            </p>
            <p className="text-xs text-slate-500 truncate">{visitor.company || "Empresa"}</p>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Anfitrião</span>
          <span className="text-slate-700 font-medium">{visitor.host || "—"}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Motivo</span>
          <span className="text-slate-700 font-medium truncate max-w-[160px]">{visitor.reason || "—"}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Pertences</span>
          <span className="text-slate-700 font-medium truncate max-w-[160px]">{visitor.leftObjects || "BI, Telefone"}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Validade</span>
          <span className="text-slate-700 font-medium">Hoje</span>
        </div>
      </div>
      <div className="px-4 pb-4 flex items-center justify-between">
        <span style={{ fontFamily: font.mono }} className={`text-[11px] text-slate-400 ${monoData}`}>
          ID {visitor.id || "VS-0000"}
        </span>
        <QrCode className="w-9 h-9 text-slate-800" />
      </div>
    </div>
  );
}
