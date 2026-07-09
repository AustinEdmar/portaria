"use client";

import { useState } from "react";
import { Download, FileText, Clock3, TrendingUp, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatCard } from "../stat-card";
import { MiniBarChart } from "../mini-bar-chart";
import { font, eyebrow, sectionTitle, monoData } from "@/lib/typography";
import { WEEKLY_VISITS, REASON_BREAKDOWN } from "@/lib/mock-data";

const EXPORTS = [
  { name: "Relatório de acessos — junho 2026", date: "01/07/2026", size: "212 KB" },
  { name: "Relatório de acessos — maio 2026", date: "01/06/2026", size: "198 KB" },
  { name: "Auditoria de segurança — Q2 2026", date: "30/06/2026", size: "1.1 MB" },
];

const PERIOD_LABELS: Record<string, string> = {
  "7d": "Últimos 7 dias",
  "30d": "Últimos 30 dias",
  q: "Este trimestre",
};

// --- Helpers -----------------------------------------------------------

/**
 * Normalizes chart data into { label, value } pairs regardless of whether
 * the source objects use `label`/`name`/`day` or `value`/`count`/`percent`.
 * Adjust the key lists below if your actual mock-data shape differs.
 */
function normalize(data: any[]): { label: string; value: number }[] {
  return data.map((d) => ({
    label: String(d.label ?? d.name ?? d.day ?? d.reason ?? ""),
    value: Number(d.value ?? d.count ?? d.percent ?? d.total ?? 0),
  }));
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function toCSV(rows: (string | number)[][]): string {
  return rows
    .map((row) =>
      row
        .map((cell) => {
          const val = String(cell);
          // Quote cells that contain a comma, quote, or newline
          return /[",\n;]/.test(val) ? `"${val.replace(/"/g, '""')}"` : val;
        })
        .join(";")
    )
    .join("\r\n");
}

// --- Component -----------------------------------------------------------

export function ReportsTab() {
  const [period, setPeriod] = useState("7d");
  const [exportingCSV, setExportingCSV] = useState(false);
  const [exportingPDF, setExportingPDF] = useState<string | null>(null);

  const weekly = normalize(WEEKLY_VISITS as any[]);
  const reasons = normalize(REASON_BREAKDOWN as any[]);

  const stats = [
    { label: "Total de visitas", value: "141", hint: "período selecionado" },
    { label: "Duração média", value: "47 min", hint: "por visita" },
    { label: "Hora de pico", value: "14h–15h", hint: "maior concentração" },
  ];

  // ---- CSV export (native, no dependencies) ----
  function handleExportCSV() {
    setExportingCSV(true);
    try {
      const rows: (string | number)[][] = [];

      rows.push(["Relatório de acessos"]);
      rows.push(["Período", PERIOD_LABELS[period] ?? period]);
      rows.push(["Gerado em", new Date().toLocaleString("pt-PT")]);
      rows.push([]);

      rows.push(["Resumo"]);
      rows.push(["Métrica", "Valor", "Detalhe"]);
      stats.forEach((s) => rows.push([s.label, s.value, s.hint]));
      rows.push([]);

      rows.push(["Entradas por dia"]);
      rows.push(["Dia", "Visitas"]);
      weekly.forEach((r) => rows.push([r.label, r.value]));
      rows.push([]);

      rows.push(["Visitas por motivo (%)"]);
      rows.push(["Motivo", "Percentagem"]);
      reasons.forEach((r) => rows.push([r.label, r.value]));

      // Prefix with UTF-8 BOM so Excel opens accented characters correctly
      const csv = "\uFEFF" + toCSV(rows);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const filename = `relatorio-acessos-${period}-${Date.now()}.csv`;
      triggerDownload(blob, filename);
    } finally {
      setExportingCSV(false);
    }
  }

  // ---- PDF export (needs: npm install jspdf jspdf-autotable) ----
  async function handleExportPDF(reportName?: string) {
    const key = reportName ?? "current";
    setExportingPDF(key);
    try {
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;

      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const marginX = 40;
      let y = 50;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(reportName ?? "Relatório de acessos", marginX, y);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100);
      y += 18;
      doc.text(`Período: ${PERIOD_LABELS[period] ?? period}`, marginX, y);
      y += 14;
      doc.text(`Gerado em: ${new Date().toLocaleString("pt-PT")}`, marginX, y);
      y += 20;

      doc.setTextColor(0);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Resumo", marginX, y);
      y += 8;

      autoTable(doc, {
        startY: y,
        margin: { left: marginX, right: marginX },
        head: [["Métrica", "Valor", "Detalhe"]],
        body: stats.map((s) => [s.label, s.value, s.hint]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [36, 82, 255] },
      });

      // @ts-ignore - autoTable attaches lastAutoTable to the doc instance
      y = doc.lastAutoTable.finalY + 24;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Entradas por dia", marginX, y);
      y += 8;

      autoTable(doc, {
        startY: y,
        margin: { left: marginX, right: marginX },
        head: [["Dia", "Visitas"]],
        body: weekly.map((r) => [r.label, r.value]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [36, 82, 255] },
      });

      // @ts-ignore
      y = doc.lastAutoTable.finalY + 24;

      if (y > 700) {
        doc.addPage();
        y = 50;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Visitas por motivo (%)", marginX, y);
      y += 8;

      autoTable(doc, {
        startY: y,
        margin: { left: marginX, right: marginX },
        head: [["Motivo", "Percentagem"]],
        body: reasons.map((r) => [r.label, `${r.value}%`]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [31, 169, 124] },
      });

      const safeName = (reportName ?? `relatorio-acessos-${period}`)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      doc.save(`${safeName}.pdf`);
    } finally {
      setExportingPDF(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
        <div>
          <p className={eyebrow}>Período</p>
          <p style={{ fontFamily: font.display }} className={`${sectionTitle} text-base mt-0.5`}>
            {PERIOD_LABELS[period]}
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={(val) => val && setPeriod(val)}>
            <SelectTrigger className="h-9 w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="q">Este trimestre</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleExportCSV}
            disabled={exportingCSV}
          >
            {exportingCSV ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            Exportar CSV
          </Button>
          <Button
            className="gap-2 bg-gradient-to-r from-emerald-400 to-cyan-400 "
            onClick={() => handleExportPDF()}
            disabled={exportingPDF === "current"}
          >
            {exportingPDF === "current" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
            Exportar PDF
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="Total de visitas" value="141" hint="período selecionado" tone="green" icon={TrendingUp} />
        <StatCard label="Duração média" value="47 min" hint="por visita" tone="green" icon={Clock3} />
        <StatCard label="Hora de pico" value="14h–15h" hint="maior concentração" tone="amber" icon={FileText} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="border-slate-200">
          <CardHeader className="pb-0">
            <p className={eyebrow}>Volume</p>
            <CardTitle style={{ fontFamily: font.display }} className={`${sectionTitle} text-base text-slate-600  mt-0.5`}>
              Entradas por dia
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <MiniBarChart data={WEEKLY_VISITS} color="#2452FF" />
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-0">
            <p className={eyebrow}>Composição</p>
            <CardTitle style={{ fontFamily: font.display }} className={`${sectionTitle} text-base mt-0.5`}>
              Visitas por motivo (%)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <MiniBarChart data={REASON_BREAKDOWN} color="#1FA97C" />
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200">
        <CardHeader>
          <p className={eyebrow}>Histórico</p>
          <CardTitle style={{ fontFamily: font.display }} className={`${sectionTitle} text-base mt-0.5`}>
            Relatórios exportados
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {EXPORTS.map((e, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="p-2 rounded-lg bg-[#2452FF]/10 text-[#2452FF] shrink-0">
                  <FileText className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{e.name}</p>
                  <p style={{ fontFamily: font.mono }} className={`text-[11px] text-slate-400 ${monoData}`}>
                    {e.date} · {e.size}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="gap-1.5 text-slate-500 shrink-0"
                onClick={() => handleExportPDF(e.name)}
                disabled={exportingPDF === e.name}
              >
                {exportingPDF === e.name ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                Descarregar
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}