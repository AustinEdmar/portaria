import type { ComponentType } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { font, statValue } from "@/lib/typography";

type StatTone = "blue" | "green" | "amber" | "red";

const TONES: Record<StatTone, string> = {
  blue: "text-[#2452FF] bg-[#2452FF]/10",
  green: "text-[#137a58] bg-[#1FA97C]/10",
  amber: "text-[#8a5500] bg-[#E08A00]/10",
  red: "text-[#b91c1c] bg-[#DC2626]/10",
};

interface StatCardProps {
  label: string;
  value: string | number;
  hint: string;
  tone: StatTone;
  icon: ComponentType<{ className?: string }>;
}

export function StatCard({ label, value, hint, tone, icon: Icon }: StatCardProps) {
  return (
    <Card className="border-slate-200">
      <CardContent className="pt-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-slate-500 truncate">{label}</p>
            <p style={{ fontFamily: font.display }} className={`${statValue} mt-1.5`}>
              {value}
            </p>
            <p className="text-[11px] text-slate-400 mt-1.5">{hint}</p>
          </div>
          <span className={`p-2 rounded-lg shrink-0 ${TONES[tone]}`}>
            <Icon className="w-4 h-4" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
