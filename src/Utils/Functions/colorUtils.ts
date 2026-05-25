const COLOR_NAME_MAP: Record<string, string> = {
  negro: "#1c1c1c",
  blanco: "#f8f8f8",
  rojo: "#dc2626",
  azul: "#2563eb",
  "azul marino": "#1e3a5f",
  verde: "#16a34a",
  gris: "#6b7280",
  "gris claro": "#d1d5db",
  "gris oscuro": "#374151",
  plata: "#c0c0c0",
  plateado: "#c0c0c0",
  dorado: "#d4af37",
  oro: "#d4af37",
  amarillo: "#eab308",
  naranja: "#f97316",
  morado: "#7c3aed",
  violeta: "#7c3aed",
  lila: "#a78bfa",
  rosa: "#ec4899",
  "rosa claro": "#f9a8d4",
  cafe: "#92400e",
  café: "#92400e",
  marron: "#92400e",
  marrón: "#92400e",
  beige: "#d4b896",
  crema: "#fffdd0",
  arena: "#c2a97e",
  turquesa: "#06b6d4",
  celeste: "#38bdf8",
  vino: "#881337",
  guinda: "#881337",
  champagne: "#f7e7ce",
  cobre: "#b87333",
  bronce: "#cd7f32",
};

export const resolveCarColor = (color: string): string => {
  if (!color) return "#9ca3af";
  const trimmed = color.trim();
  if (trimmed.startsWith("#")) return trimmed;
  return COLOR_NAME_MAP[trimmed.toLowerCase()] ?? "#9ca3af";
};

// ── Chart color palette (categorical) ─────────────────────────────────────────
// 16 vars CSS definidas en index.css (claro + obscuro). Si total > 16, genera
// colores adicionales rotando hue en OKLCH para mantener separación visual.
export const CHART_PALETTE_SIZE = 16;

/**
 * Devuelve color para serie/segmento en gráficas categóricas (pie, donut, bars).
 * Usa --chart-1..16 hasta el índice 15. A partir del 16 genera OKLCH dinámico
 * con hue distribuido alrededor del círculo para máxima separación.
 */
export const getChartColor = (index: number, total?: number): string => {
  if (index < CHART_PALETTE_SIZE) {
    return `var(--chart-${index + 1})`;
  }
  // Overflow: rotación de hue. Si conocemos el total, distribuimos uniforme;
  // si no, paso fijo de 37° (primo, evita repeticiones cercanas).
  const step = total && total > CHART_PALETTE_SIZE ? 360 / total : 37;
  const hue = (index * step) % 360;
  return `oklch(0.65 0.22 ${hue.toFixed(1)})`;
};
