export type VehicleStatus = "Inventario" | "En Espera" | "Reparación";
export interface VehicleDetails {
  brand: string;
  model: string;
  currentYear: number;
  carYear: number;
  color: string;
  purchaseDate: string;
  saleDate: string | null;
  status: VehicleStatus;
}

export const INITIAL_VEHICLE_DETAILS: VehicleDetails = {
  brand: "",
  model: "",
  currentYear: new Date().getFullYear(),
  carYear: 2024,
  color: "#3b82f6",
  purchaseDate: "",
  saleDate: null,
  status: "Inventario",
};

export type VehicleYear = number; 

export const getYearOptions = (): number[] => {
  return Array.from({ length: 2100 - 1950 + 1 }, (_, i) => 2100 - i);
};
export const YEAR_OPTIONS = getYearOptions();

export const COLOR_PRESETS = [
  { name: 'Blanco', value: '#ffffff' },
  { name: 'Negro', value: '#000000' },
  { name: 'Gris', value: '#6b7280' },
  { name: 'Plata', value: '#d1d5db' },
  { name: 'Rojo', value: '#ef4444' },
  { name: 'Azul', value: '#3b82f6' },
  { name: 'Verde', value: '#22c55e' },
  { name: 'Amarillo', value: '#eab308' },
];

export const STATUS_OPTIONS: VehicleStatus[] = ["Inventario", "En Espera", "Reparación"];