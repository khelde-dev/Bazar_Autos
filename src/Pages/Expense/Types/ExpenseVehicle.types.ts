export interface Category {
  category_id: string;
  type: string;
  name: string;
}

export type SubType = "Activo" | "Pasivo";
export const MAIN_MOVEMENT_TYPES = ["Compra", "Gasto"] as const;
export type MainType = (typeof MAIN_MOVEMENT_TYPES)[number];
export interface VehicleExpense {
  type: MainType;
  subType: SubType;
  movements_category_id: string;
  mainVehicleId: string;
  amount: number;
  isShared: boolean;
  involvedVehicles: string[];
  description: string;
  closing_date: string;
}

export const INITIAL_EXPENSE: VehicleExpense = {
  type: "Gasto",
  subType: "Pasivo",
  movements_category_id: "",
  mainVehicleId: "",
  amount: 0,
  isShared: false,
  involvedVehicles: [],
  description: "",
  closing_date: "",
};
