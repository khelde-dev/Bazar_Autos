import { NavLink } from "react-router-dom";
import { CarFront } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./nav-items";
import { useUserRole } from "@/hooks/use-user-role";

// Evaluated once at module load — stable across server/client, no hydration mismatch
const CURRENT_YEAR = new Date().getFullYear();

// Preload map — dispara el dynamic import en hover para adelantar la descarga
// del chunk antes de que el usuario haga click (clave en 3G / 4G lento)
const PRELOAD_MAP: Record<string, () => Promise<unknown>> = {
  "/dashboard":          () => import("@/Pages/Dashboard/Dashboard"),
  "/shopping":           () => import("@/Pages/Shopping/ShoppVehicle"),
  "/cars":               () => import("@/Pages/Cars/CarListPage"),
  "/expenses":           () => import("@/Pages/Expense/ExpenseVehicle"),
  "/investments":        () => import("@/Pages/Investments/AddInvestment"),
  "/users":              () => import("@/Pages/Users/UsersPage"),
  "/movements-category": () => import("@/Pages/MovementCategories/CategoriesPage"),
};

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export const Sidebar = ({ className, onNavigate }: SidebarProps) => {
  const { isAdmin } = useUserRole();
  const items = NAV_ITEMS.filter((item) => !item.investorOnly || isAdmin);

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
        className
      )}
      aria-label="Navegación principal"
    >
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
        <div className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-blue-700 shadow-sm">
          <CarFront size={20} className="text-white" strokeWidth={2.25} />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold tracking-tight">Bazar Autos</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            onMouseEnter={() => PRELOAD_MAP[to]?.()}
            onFocus={() => PRELOAD_MAP[to]?.()}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
              )
            }
          >
            <Icon size={18} strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
          © {CURRENT_YEAR} Bazar Autos
        </p>
      </div>
    </aside>
  );
};
