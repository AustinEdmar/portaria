import type { ComponentType } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { font, statValue } from "@/lib/typography";
import { TONES, TONE_BACKGROUNDS, type Tone } from "@/lib/colors";

interface StatCardProps {
  label: string;
  value: string | number;
  hint: string;
  tone: Tone;
  icon: ComponentType<{ className?: string }>;
}

export function StatCard({ label, value, hint, tone, icon: Icon }: StatCardProps) {
  return (
    <Card className={`border-slate-200 ${TONE_BACKGROUNDS[tone]}`}>
      <CardContent className="pt-5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-white truncate">{label}</p>
            <p style={{ fontFamily: font.display }} className={`${statValue} mt-1.5 text-white `}>
              {value}
            </p>
            <p className="text-[11px] text-white  mt-1.5">{hint}</p>
          </div>
          <span className={`p-2 rounded-lg shrink-0  ${TONES[tone]}`}>
            <Icon className="w-4 h-4 text-white " />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}