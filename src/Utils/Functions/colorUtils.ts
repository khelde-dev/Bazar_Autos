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
