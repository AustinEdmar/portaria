import { Badge } from "@/components/ui/badge";
import type { HostStatus, VisitorStatus } from "@/lib/types";

const VISITOR_STATUS_STYLE: Record<VisitorStatus, string> = {
  "No prédio": "bg-[#1FA97C]/10 text-[#137a58] border-[#1FA97C]/30",
  Agendado: "bg-[#E08A00]/10 text-[#8a5500] border-[#E08A00]/30",
  Atrasado: "bg-[#DC2626]/10 text-[#b91c1c] border-[#DC2626]/30",
  Finalizado: "bg-slate-100 text-slate-500 border-slate-200",
};

const HOST_STATUS_STYLE: Record<HostStatus, string> = {
  Disponível: "bg-[#1FA97C]/10 text-[#137a58] border-[#1FA97C]/30",
  "Em reunião": "bg-[#E08A00]/10 text-[#8a5500] border-[#E08A00]/30",
  Fora: "bg-slate-100 text-slate-500 border-slate-200",
};

export function StatusBadge({ status }: { status: VisitorStatus }) {
  return (
    <Badge variant="outline" className={`font-medium ${VISITOR_STATUS_STYLE[status]}`}>
      {status}
    </Badge>
  );
}

export function HostStatusBadge({ status }: { status: HostStatus }) {
  return (
    <Badge variant="outline" className={`font-medium ${HOST_STATUS_STYLE[status]}`}>
      {status}
    </Badge>
  );
}
