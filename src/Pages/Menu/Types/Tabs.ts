import type { FC } from "react";
import { CarListPage } from "../../Cars/CarListPage";
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
  Catálogo: {
    title: "Catálogo de Autos",
    component: CarListPage,
  },
  Gasto: {
    title: "Detalles del Gasto",
    component: ExpenseVehicle,
  },
  Inversionista: {
    title: "Agregar Inversion",
    component: AddInvestment,
  },
};

export type TabType = keyof typeof TABS_CONFIG;
export const TAB_NAMES = Object.keys(TABS_CONFIG) as TabType[];
