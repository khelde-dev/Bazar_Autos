import type { FC } from "react";
import { ExpenseVehicle } from "../../Expense/ExpenseVehicle";
import { AddInvestment } from "../../Investments/AddInvestment";
import { ShoppVehicle } from "../../Shopping/ShoppVehicle";

interface TabConfigItem {
  title: string;
  component: FC;
}

export const TABS_CONFIG: Record<string, TabConfigItem> = {
  Compra: {
    title: "Agregar Vehículo",
    component: ShoppVehicle,
  },
  Inversionista: {
    title: "Agregar Inversion",
    component: AddInvestment,
  },
  Gasto: {
    title: "Detalles del Gasto",
    component: ExpenseVehicle,
  },
};

export type TabType = keyof typeof TABS_CONFIG;
export const TAB_NAMES = Object.keys(TABS_CONFIG) as TabType[];
