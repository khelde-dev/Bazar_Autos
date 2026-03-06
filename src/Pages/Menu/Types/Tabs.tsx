import { ExpenseVehicle } from "../../Expense/ExpenseVehicle";
import { SaleVehicle } from "../../Sale/SaleVehicle";
import ShoppVehicle from "../../Shopping/ShoppVehicle";

export const TABS_CONFIG = {
  Compra: {
    title: "Agregar Vehículo",
    component: <ShoppVehicle />
  },
  Inversionista: {
    title: "Registro de Inversión de Capital",
    component: <SaleVehicle />
  },
  Gasto: {
    title: "Detalles del Gasto",
    component: <ExpenseVehicle />
  },
} as const;
export type TabType = keyof typeof TABS_CONFIG;
export const TAB_NAMES = Object.keys(TABS_CONFIG) as TabType[];