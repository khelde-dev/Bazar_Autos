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

export interface VehicleExpenses {
  tires: number;         
  bodywork: number;       
  upholstery: number;     
  ceiling: number;        
  steeringWheel: number;  
  cover: number;          
  mechanic: number;       
  caps: number;           
  fine: number;          
  kit: number;           
  hatShelf: number;      
  oilService: number;     
  spareCap: number;       
  alignment: number;      
  handle: number;         
  headlights: number;     
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
  { key: "oilService", label: "Rin/Llaveta/Aceite" },
  { key: "spareCap", label: "Tapón Facción" },
  { key: "alignment", label: "Alineación" },
  { key: "handle", label: "Manija" },
  { key: "headlights", label: "Faros/Calaveras" },
];

export const INITIAL_EXPENSES: VehicleExpenses = {
  tires: 0, bodywork: 0, upholstery: 0, ceiling: 0, steeringWheel: 0,
  cover: 0, mechanic: 0, caps: 0, fine: 0, kit: 0, hatShelf: 0,
  oilService: 0, spareCap: 0, alignment: 0, handle: 0, headlights: 0,
};