import { NormalizeText } from "../../../Utils/Functions/Normalize";
import {
  COLOR_PRESETS,
  COST_TYPE_OVERRIDES,
  EXPENSE_ITEMS,
  INITIAL_EXPENSES,
  type VehicleDetails,
  type VehicleExpenses,
  type VehicleStatus,
} from "../../Shopping/Types/ShooppVehicle.types";
import type {
  ApiCarCost,
  CarCost,
  CarDetail,
  CarListItem,
  CostType,
  UpdateCarPayload,
} from "../Types/Cars.types";

// cost_type (API) → clave de VehicleExpenses
const COST_TYPE_TO_KEY = Object.fromEntries(
  EXPENSE_ITEMS.map((item) => {
    const costType = COST_TYPE_OVERRIDES[item.label] ?? NormalizeText(item.label);
    return [costType, item.key] as [string, keyof VehicleExpenses];
  })
) as Record<string, keyof VehicleExpenses>;

const HEX_REGEX = /^#[0-9a-fA-F]{3,8}$/;
const FALLBACK_COLOR = "#9ca3af";

const normalizeColor = (raw: string): string => {
  if (!raw) return FALLBACK_COLOR;
  const preset = COLOR_PRESETS.find((c) => c.name.toLowerCase() === raw.toLowerCase());
  if (preset) return preset.value;
  if (HEX_REGEX.test(raw)) return raw;
  return FALLBACK_COLOR;
};

// Parsea precios formateados como "$157,690.00" → 157690
export const parseFormattedPrice = (s: string | number | null | undefined): number => {
  if (s === null || s === undefined) return 0;
  const cleaned = typeof s === "string" ? s.replace(/[^0-9.-]/g, "") : String(s);
  const n = parseFloat(cleaned);
  return Number.isNaN(n) ? 0 : n;
};

// ISO "2026-01-14T06:00:00.000Z" → "2026-01-14" (formato input type=date)
const parseApiDate = (s: string | null | undefined): string => {
  if (!s) return "";
  return s.split("T")[0] ?? "";
};

const parseApiCosts = (costs: ApiCarCost[]): CarCost[] =>
  costs.map((c) => ({
    cost_type: c.cost_type as CostType,
    amount: parseFormattedPrice(c.amount),
    note: c.note ?? "",
  }));

// API list item → CarDetail (parseado, listo para form)
export const mapListItemToDetail = (item: CarListItem): CarDetail => ({
  car_id: item.car_id,
  brand: item.brand,
  model: item.model,
  year_of_car: item.year_of_car,
  color: item.color,
  status: item.status as VehicleStatus,
  purchase_price: parseFormattedPrice(item.initial_purchase_price), // RAW
  price_for_sale: parseFormattedPrice(item.price_for_sale),
  purchase_date: parseApiDate(item.purchase_date),
  sale_date: parseApiDate(item.sale_date),
  costs: parseApiCosts(item.costs ?? []),
});

// CarDetail → VehicleDetails (estado del form)
export const mapCarToDetails = (car: CarDetail): VehicleDetails => ({
  brand: car.brand,
  model: car.model,
  year_of_car: car.year_of_car,
  color: normalizeColor(car.color),
  purchase_date: car.purchase_date ?? "",
  sale_date: car.sale_date ?? "",
  status: car.status,
  purchase_price: car.purchase_price,
  price_for_sale: car.price_for_sale,
});

export const mapCostsToExpenses = (costs: CarCost[]): VehicleExpenses => {
  const expenses = { ...INITIAL_EXPENSES };
  for (const cost of costs) {
    const key = COST_TYPE_TO_KEY[cost.cost_type];
    if (key) expenses[key] = { amount: cost.amount, note: cost.note };
  }
  return expenses;
};

export const buildUpdatePayload = (
  vehicleData: VehicleDetails,
  expenses: VehicleExpenses
): UpdateCarPayload => {
  const costs: CarCost[] = EXPENSE_ITEMS.map((item) => ({
    cost_type: (COST_TYPE_OVERRIDES[item.label] ?? NormalizeText(item.label)) as CostType,
    amount: Number(expenses[item.key].amount) || 0,
    note: expenses[item.key].note || "",
  }));
  const sumCosts = costs.reduce((acc, c) => acc + c.amount, 0);
  return {
    brand: vehicleData.brand,
    model: vehicleData.model,
    year_of_car: Number(vehicleData.year_of_car),
    color: COLOR_PRESETS.find((c) => c.value === vehicleData.color)?.name ?? vehicleData.color,
    sale_date: vehicleData.sale_date || undefined,
    status: vehicleData.status,
    purchase_price: Math.round(((Number(vehicleData.purchase_price) || 0) + sumCosts) * 100) / 100,
    price_for_sale: Number(vehicleData.price_for_sale) || 0,
    costs,
  };
};
