import type { VehicleStatus } from "../../Shopping/Types/ShooppVehicle.types";

export type CostType =
  | "llantas"
  | "hojalateria"
  | "tapiceria"
  | "cielo"
  | "volante"
  | "funda"
  | "mecanico"
  | "tapones"
  | "multa"
  | "kit"
  | "sombrerera"
  | "rin_llaveta"
  | "aceite"
  | "tapon_facion"
  | "alineacion"
  | "manija"
  | "faros_calaveras";

// ── API raw shapes (lo que viene del backend) ─────────────────────────────

export interface ApiCarCost {
  cost_id: string;
  car_id: string;
  cost_type: string;
  amount: string; // "3000.00"
  note: string | null;
  created: string;
}

export interface CarListItem {
  car_id: string;
  brand: string;
  model: string;
  color: string; // "#f7ce3b" o "Gris"
  year_of_car: number;
  purchase_price: string; // "$157,690.00" (initial + costs)
  price_for_sale: string; // "$215,000.00"
  initial_purchase_price: string; // "$150,000.00" (raw, sin costs)
  purchase_date: string;
  sale_date: string | null;
  status: string;
  costs: ApiCarCost[];
  año: number;
  mes: number;
  dia: number;
  created: string;
}

export interface CarPagination {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface CarListData {
  search: string;
  rows: CarListItem[];
  pagination: CarPagination;
}

interface CarsMetadata {
  timestamp: string;
  requestId: string;
  dataCount: number;
  dataCountFormatted: string;
}

export interface CarListResponse {
  success: boolean;
  data: CarListData;
  message: string;
  metadata: CarsMetadata;
}

// ── Form / Edit shapes (parseado, listo para usar) ────────────────────────

export interface CarCost {
  cost_type: CostType;
  amount: number;
  note: string;
}

export interface CarDetail {
  car_id: string;
  brand: string;
  model: string;
  year_of_car: number;
  color: string;
  status: VehicleStatus;
  purchase_price: number; // RAW (initial), sin costs
  price_for_sale: number;
  purchase_date?: string;
  sale_date?: string | null;
  costs: CarCost[];
}

// ── Filtros y Payload ──────────────────────────────────────────────────────

export interface CarFilters {
  search: string;
  page: number;
  limit: number;
  year?: number | null;
  month?: number | null;
}

export interface UpdateCarPayload {
  color: string;
  sale_date?: string;
  status: VehicleStatus;
  brand: string;
  model: string;
  price_for_sale: number;
  purchase_price: number;
  year_of_car: number;
  costs: CarCost[];
}
