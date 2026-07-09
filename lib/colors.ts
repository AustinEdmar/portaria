// Tons "sólidos" — usados em StatCard, Badge, ícones, etc.
export type Tone = "blue" | "green" | "amber" | "red" | "purple" | "cyan" | "slate" | "pink";

export const TONES: Record<Tone, string> = {
    blue: "text-[#2452FF] bg-[#2452FF]/10",
    green: "text-[#137a58] bg-[#1FA97C]/10",
    amber: "text-[#8a5500] bg-[#E08A00]/10",
    red: "text-[#b91c1c] bg-[#DC2626]/10",
    purple: "text-[#6d28d9] bg-[#7C3AED]/10",
    cyan: "text-[#0e7490] bg-[#06B6D4]/10",
    slate: "text-slate-600 bg-slate-500/10",
    pink: "text-[#be185d] bg-[#EC4899]/10",
};

// Gradiente sutil de fundo — usado no fundo inteiro de cards (StatCard, etc.)
export const TONE_BACKGROUNDS: Record<Tone, string> = {
    blue: "bg-gradient-to-r from-cyan-500 to-blue-500",
    green: "bg-gradient-to-r from-emerald-400 to-cyan-400",
    amber: "bg-gradient-to-r from-yellow-400 to-orange-500",
    red: "bg-gradient-to-br from-rose-500 to-red-500",
    purple: "bg-gradient-to-br from-violet-500 to-purple-500",
    cyan: "bg-gradient-to-br from-blue-500 to-cyan-500",
    slate: "bg-gradient-to-br from-gray-500 to-slate-500",
    pink: "bg-gradient-to-br from-pink-500 to-rose-500",
};

// Gradientes — usados em botões de ação primária
export type Gradient = "primary" | "success" | "warning" | "danger" | "purple";

export const GRADIENTS: Record<Gradient, string> = {
    primary: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600",
    success: "bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500",
    warning: "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600",
    danger: "bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600",
    purple: "bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600",
};