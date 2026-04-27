export interface CarModel {
  id: string;
  brand: string;
  name: string;
  year_of_car: number;
  full_name: string;
}

export interface CarModelsMetadata {
  timestamp: string;
  requestId: string;
  dataCount: number;
  dataCountFormatted: string;
}

export interface CarModelsResponse {
  success: boolean;
  data: CarModel[];
  message: string;
  metadata: CarModelsMetadata;
}

export type VehicleStatus = "Vendido" | "Inventario" | "En espera" | "Reparacion";

export interface VehicleDetails {
  brand: string;
  model: string;
  year_of_car: number;
  color: string;
  purchase_date: string;
  sale_date: string | null;
  status: VehicleStatus;
  purchase_price: number | string;
  price_for_sale: number | string;
}

export const INITIAL_VEHICLE_DETAILS: VehicleDetails = {
  brand: "",
  model: "",
  year_of_car: new Date().getFullYear(),
  color: "#3b82f6",
  purchase_date: "",
  sale_date: "",
  status: "Inventario",
  purchase_price: "",
  price_for_sale: "",
};

export type VehicleYear = number;

export const getYearOptions = (): number[] => {
  return Array.from(
    { length: new Date().getFullYear() - 1950 + 1 },
    (_, i) => new Date().getFullYear() - i
  );
};
export const YEAR_OPTIONS = getYearOptions();

export const COLOR_PRESETS = [
  { name: "Blanco", value: "#ffffff" },
  { name: "Negro", value: "#000000" },
  { name: "Gris", value: "#6b7280" },
  { name: "Plata", value: "#d1d5db" },
  { name: "Rojo", value: "#ef4444" },
  { name: "Azul", value: "#3b82f6" },
  { name: "Verde", value: "#22c55e" },
  { name: "Amarillo", value: "#eab308" },
];

export const STATUS_OPTIONS: VehicleStatus[] = ["Vendido", "Inventario", "En espera", "Reparacion"];

export interface ExpenseDetail {
  amount: number | string;
  note: string;
}

export interface VehicleExpenses {
  tires: ExpenseDetail;
  bodywork: ExpenseDetail;
  upholstery: ExpenseDetail;
  ceiling: ExpenseDetail;
  steeringWheel: ExpenseDetail;
  cover: ExpenseDetail;
  mechanic: ExpenseDetail;
  caps: ExpenseDetail;
  fine: ExpenseDetail;
  kit: ExpenseDetail;
  hatShelf: ExpenseDetail;
  oilService: ExpenseDetail;
  oil: ExpenseDetail;
  spareCap: ExpenseDetail;
  alignment: ExpenseDetail;
  handle: ExpenseDetail;
  headlights: ExpenseDetail;
}

export interface ExpenseConfig {
  key: keyof VehicleExpenses;
  label: string;
}

export const EXPENSE_ITEMS: ExpenseConfig[] = [
  { key: "tires", label: "Llantas" },
  { key: "bodywork", label: "Hojalatería" },
  { key: "upholstery", label: "Tapicería" },
  { key: "ceiling", label: "Cielo" },
  { key: "steeringWheel", label: "Volante" },
  { key: "cover", label: "Funda" },
  { key: "mechanic", label: "Mecánico" },
  { key: "caps", label: "Tapones" },
  { key: "fine", label: "Multa" },
  { key: "kit", label: "Kit" },
  { key: "hatShelf", label: "Sombrerera" },
  { key: "oilService", label: "Rin/Llaveta" },
  { key: "oil", label: "Aceite" },
  { key: "spareCap", label: "Tapón Facción" },
  { key: "alignment", label: "Alineación" },
  { key: "handle", label: "Manija" },
  { key: "headlights", label: "Faros/Calaveras" },
];

const defaultExpense: ExpenseDetail = { amount: "", note: "" };

export const INITIAL_EXPENSES: VehicleExpenses = {
  tires: defaultExpense,
  bodywork: defaultExpense,
  upholstery: defaultExpense,
  ceiling: defaultExpense,
  steeringWheel: defaultExpense,
  cover: defaultExpense,
  mechanic: defaultExpense,
  caps: defaultExpense,
  fine: defaultExpense,
  kit: defaultExpense,
  hatShelf: defaultExpense,
  oilService: defaultExpense,
  oil: defaultExpense,
  spareCap: defaultExpense,
  alignment: defaultExpense,
  handle: defaultExpense,
  headlights: defaultExpense,
};

export const COST_TYPE_OVERRIDES: Record<string, string> = {
  "Rin/Llaveta": "rin_llaveta",
  "Tapón Facción": "tapon_facion",
  "Faros/Calaveras": "faros_calaveras",
};
