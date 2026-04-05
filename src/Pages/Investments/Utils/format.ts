// Utilidades de formato compartidas entre pantallas de inversiones.

const moneyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
});

export const formatMoney = (value: number | string): string => {
  const num = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(num)) return "$0.00";
  return moneyFormatter.format(num);
};

// "10 Oct 2024 • 09:15 AM"
export const formatDateTime = (iso: string): string => {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleDateString("es-MX", { month: "short" }).replace(".", "");
  const monthCap = month.charAt(0).toUpperCase() + month.slice(1);
  const year = date.getFullYear();
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${day} ${monthCap} ${year} • ${time}`;
};

// "05 Abr 2026"
export const formatShortDate = (iso: string): string => {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleDateString("es-MX", { month: "short" }).replace(".", "");
  const monthCap = month.charAt(0).toUpperCase() + month.slice(1);
  const year = date.getFullYear();
  return `${day} ${monthCap} ${year}`;
};

// Genera años desde 2026 hasta max(añoActual, 2026)
export const buildYearRange = (startYear = 2026): number[] => {
  const current = new Date().getFullYear();
  const end = Math.max(current, startYear);
  const years: number[] = [];
  for (let y = end; y >= startYear; y--) years.push(y);
  return years;
};
