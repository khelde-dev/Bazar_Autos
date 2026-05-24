import { api } from "./axiosConfig";
import type { DashboardData, DashboardParams } from "../Pages/Dashboard/Types/Dashboard.types";

// ── Raw backend shape (snake_case) ────────────────────────────────────────────

interface RawKpiValue {
  value: number;
  previous?: number;
  change_pct?: number;
  label: string;
  hint?: string;
}

interface RawKpis {
  total_sales: RawKpiValue;
  total_profit: RawKpiValue;
  total_movements: RawKpiValue;
  total_brands: RawKpiValue;
  active_expenses: RawKpiValue;
  passive_expenses: RawKpiValue;
  investors_count: RawKpiValue;
  total_invested: RawKpiValue;
}

interface RawChartContainer<T> {
  type: string;
  title: string;
  subtitle: string;
  data: T[];
}

interface RawYearTotal {
  year: number;
  total: number;
  cumulative?: number;
}

interface RawTopCar {
  brand: string;
  model: string;
  year: number;
  units: number;
  revenue: number;
  avg_price: number;
  total_profit: number;
}

interface RawBrandDays {
  brand: string;
  total_sold: number;
  avg_days: number;
}
interface RawBrandProfit {
  brand: string;
  total_profit: number;
}
interface RawCategoryExpense {
  category: string;
  category_type: "Activo" | "Pasivo";
  movement_type: "Gasto" | "Compra";
  total: number;
}
interface RawBrandCount {
  brand: string;
  total: number;
}

interface RawCharts {
  cars_sold_per_year: RawChartContainer<RawYearTotal>;
  profit_per_year: RawChartContainer<RawYearTotal>;
  investment_per_year: RawChartContainer<RawYearTotal>;
  top_sold_cars: RawChartContainer<RawTopCar>;
  avg_days_to_sell_by_brand: RawChartContainer<RawBrandDays>;
  profit_by_brand: RawChartContainer<RawBrandProfit>;
  expenses_by_category: RawChartContainer<RawCategoryExpense>;
  cars_by_brand: RawChartContainer<RawBrandCount>;
}

interface RawFilters {
  year: number;
  month: number | null;
  years_range: number;
  top_limit: number;
  previous_period: { year: number; month: number | null };
}

interface RawDashboardData {
  filters: RawFilters;
  kpis: RawKpis;
  charts: RawCharts;
}

interface RawDashboardResponse {
  success: boolean;
  data: RawDashboardData;
}

// ── Normalization ─────────────────────────────────────────────────────────────

const kpi = (r: RawKpiValue) => ({
  value: r.value,
  previous: r.previous,
  changePct: r.change_pct,
  label: r.label,
  hint: r.hint,
});

function normalize(raw: RawDashboardData): DashboardData {
  return {
    filters: {
      year: raw.filters.year,
      month: raw.filters.month,
      yearsRange: raw.filters.years_range,
      topLimit: raw.filters.top_limit,
      previousPeriod: {
        year: raw.filters.previous_period.year,
        month: raw.filters.previous_period.month,
      },
    },
    kpis: {
      totalSales: kpi(raw.kpis.total_sales),
      totalProfit: kpi(raw.kpis.total_profit),
      totalMovements: kpi(raw.kpis.total_movements),
      totalBrands: kpi(raw.kpis.total_brands),
      activeExpenses: kpi(raw.kpis.active_expenses),
      passiveExpenses: kpi(raw.kpis.passive_expenses),
      investorsCount: kpi(raw.kpis.investors_count),
      totalInvested: kpi(raw.kpis.total_invested),
    },
    charts: {
      // Map uniform `total` → semantic key per chart so chart components stay simple
      carsSoldPerYear: raw.charts.cars_sold_per_year.data.map((d) => ({
        year: d.year,
        cars: d.total,
      })),
      profitPerYear: raw.charts.profit_per_year.data.map((d) => ({
        year: d.year,
        profit: d.total,
      })),
      investmentPerYear: raw.charts.investment_per_year.data.map((d) => ({
        year: d.year,
        investment: d.total,
        cumulative: d.cumulative,
      })),
      topSoldCars: raw.charts.top_sold_cars.data.map((c, i) => ({
        rank: i + 1,
        brand: c.brand,
        model: c.model,
        year: c.year,
        units: c.units,
        revenue: c.revenue,
        avgPrice: c.avg_price,
        totalProfit: c.total_profit,
      })),
      avgDaysToSellByBrand: raw.charts.avg_days_to_sell_by_brand.data.map((b) => ({
        brand: b.brand,
        totalSold: b.total_sold,
        avgDays: b.avg_days,
      })),
      profitByBrand: raw.charts.profit_by_brand.data.map((b) => ({
        brand: b.brand,
        totalProfit: b.total_profit,
      })),
      expensesByCategory: raw.charts.expenses_by_category.data.map((e) => ({
        category: e.category,
        category_type: e.category_type,
        movement_type: e.movement_type,
        total: e.total,
      })),
      carsByBrand: raw.charts.cars_by_brand.data.map((b) => ({
        brand: b.brand,
        total: b.total,
      })),
    },
  };
}

// ── Service ───────────────────────────────────────────────────────────────────

export const getDashboard = async (params: DashboardParams): Promise<DashboardData> => {
  const clean: Record<string, string | number> = {
    year: params.year,
    years_range: params.years_range ?? 6,
    top_limit: params.top_limit ?? 3,
  };

  // "todos" = omit month entirely — backend aggregates full year
  if (params.month !== undefined) {
    clean.month = params.month;
  }

  const { data } = await api.get<RawDashboardResponse>("/dashboard", { params: clean });
  return normalize(data.data);
};
