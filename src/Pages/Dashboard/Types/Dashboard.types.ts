// ── KPI items ─────────────────────────────────────────────────────────────────
// Each KPI returns the value plus optional comparison vs previous period.

export interface KpiValue {
  value: number;
  previous?: number;
  changePct?: number;
  label: string;
  hint?: string;
}

export interface KpiSummary {
  totalSales: KpiValue;
  totalProfit: KpiValue;
  totalMovements: KpiValue;
  totalBrands: KpiValue;
  activeExpenses: KpiValue;
  passiveExpenses: KpiValue;
  investorsCount: KpiValue;
  totalInvested: KpiValue;
}

// ── Time series (charts) ──────────────────────────────────────────────────────

export interface YearCars {
  year: number;
  cars: number;
}
export interface YearProfit {
  year: number;
  profit: number;
}
export interface YearInvestment {
  year: number;
  investment: number;
  cumulative?: number;
}

// ── Top performers ────────────────────────────────────────────────────────────

export interface TopCar {
  rank: number;
  brand: string;
  model: string;
  year: number;
  units: number;
  revenue: number;
  avgPrice: number;
  totalProfit: number;
}

// ── Brand / category breakdowns ───────────────────────────────────────────────

export interface BrandDays {
  brand: string;
  totalSold: number;
  avgDays: number;
}

export interface BrandProfit {
  brand: string;
  totalProfit: number;
}

export interface CategoryExpense {
  category: string;
  category_type: "Activo" | "Pasivo";
  movement_type: "Gasto" | "Compra";
  total: number;
}

export interface BrandCount {
  brand: string;
  total: number;
}

// ── Aggregate shape consumed by Dashboard ─────────────────────────────────────

export interface DashboardCharts {
  carsSoldPerYear: YearCars[];
  profitPerYear: YearProfit[];
  investmentPerYear: YearInvestment[];
  topSoldCars: TopCar[];
  avgDaysToSellByBrand: BrandDays[];
  profitByBrand: BrandProfit[];
  expensesByCategory: CategoryExpense[];
  carsByBrand: BrandCount[];
}

export interface DashboardFilters {
  year: number;
  month: number | null;
  yearsRange: number;
  topLimit: number;
  previousPeriod: { year: number; month: number | null };
}

export interface DashboardData {
  filters: DashboardFilters;
  kpis: KpiSummary;
  charts: DashboardCharts;
}

// ── Query params ──────────────────────────────────────────────────────────────

export interface DashboardParams {
  year: number;
  /** Omit → backend returns aggregate for full year ("todos") */
  month?: number;
  /** History years for charts. Default 6. */
  years_range?: number;
  /** Top cars limit. Default 3. */
  top_limit?: number;
}
