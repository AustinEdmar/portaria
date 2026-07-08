/* ------------------------------------------------------------------ */
/* Escala tipográfica do Portaria+                                     */
/*                                                                      */
/* Três famílias, cada uma com um papel fixo — nunca misturadas fora   */
/* do seu papel:                                                       */
/*   • Manrope (display)  → títulos, valores em destaque, nomes        */
/*   • Inter (corpo)      → texto corrido, labels, botões              */
/*   • JetBrains Mono     → tudo que é dado/identificador: horas, IDs, */
/*                          documentos, códigos — reforça a leitura de  */
/*                          "sistema de controlo/segurança"             */
/* ------------------------------------------------------------------ */

export const FONT_IMPORTS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
`;

export const font = {
  display: "Manrope",
  body: "Inter",
  mono: "JetBrains Mono",
} as const;

/** Rótulo pequeno em maiúsculas — usado para categorizar uma secção */
export const eyebrow =
  "text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-400";

/** Título de página, no cabeçalho */
export const pageTitle =
  "font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight";

/** Título de secção/cartão */
export const sectionTitle =
  "font-bold text-slate-800 text-sm tracking-tight";

/** Valor numérico em destaque (KPIs) */
export const statValue =
  "font-extrabold text-slate-900 text-[28px] leading-none tracking-tight";

/** Texto de dado/identificador (horas, IDs, documentos) */
export const monoData = "tracking-tight tabular-nums";
