import {
  BarChart3,
  Car,
  Receipt,
  ShoppingCart,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  /** If true, only the investor user sees this item */
  investorOnly?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/shopping", label: "Compra", icon: ShoppingCart },
  { to: "/cars", label: "Catálogo", icon: Car },
  { to: "/expenses", label: "Gastos", icon: Receipt },
  { to: "/investments", label: "Inversionista", icon: Wallet, investorOnly: true },
];
