import { font, monoData } from "@/lib/typography";

interface MiniBarChartProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
}

/**
 * Gráfico de barras minimalista, sem dependências externas.
 * Reutilizado no painel geral (ocupação por hora) e nos relatórios
 * (entradas por dia / motivo).bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#1d40cc]
 */
export function MiniBarChart({ data, color = "#2452FF", height = 112 }: MiniBarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-1.5 px-1" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
          <div className="w-full flex items-end justify-center" style={{ height: height - 20 }}>
            <div
              className="w-full rounded-t-sm bg-gradient-to-t from-emerald-400 to-cyan-400 transition-all duration-300 group-hover:opacity-90"
              style={{
                height: `${(d.value / max) * 100}%`,
                minHeight: 4,
              }}
              title={`${d.label}: ${d.value}`}
            />
          </div>
          <span
            style={{ fontFamily: font.mono }}
            className={`text-[9px] text-slate-400 ${monoData}`}
          >
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}
