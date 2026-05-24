import { useMemo } from "react";
import {
  Activity,
  Banknote,
  Car,
  CircleDollarSign,
  Loader2,
  ReceiptText,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { DashboardFilters } from "./Components/DashboardFilters";
import { KpiCard } from "./Components/KpiCard";
import { TopCarsCard } from "./Components/TopCarsCard";
import { CarsByYearChart } from "./Components/CarsByYearChart";
import { ProfitByYearChart } from "./Components/ProfitByYearChart";
import { InvestmentByYearChart } from "./Components/InvestmentByYearChart";
import { ProfitByBrandChart } from "./Components/ProfitByBrandChart";
import { AvgDaysToSellChart } from "./Components/AvgDaysToSellChart";
import { ExpensesByCategoryChart } from "./Components/ExpensesByCategoryChart";
import { CarsByBrandChart } from "./Components/CarsByBrandChart";
import { ExportReportDialog } from "./Components/ExportReportDialog";
import { useDashboard } from "./Hooks/useDashboard";
import { useDashboardUrlFilters } from "./Hooks/useDashboardUrlFilters";
import type { KpiValue } from "./Types/Dashboard.types";

const mxnFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});
const numberFormatter = new Intl.NumberFormat("es-MX");

const CURRENT_YEAR = new Date().getFullYear();
const AVAILABLE_YEARS = Array.from({ length: 6 }, (_, i) => CURRENT_YEAR - i);

// Derive trend prop from backend's change_pct
const toTrend = (k: KpiValue | undefined) => {
  if (!k || k.changePct === undefined || k.changePct === 0) return undefined;
  const sign = k.changePct >= 0 ? "up" : "down";
  return { direction: sign as "up" | "down", value: `${Math.abs(k.changePct).toFixed(1)}%` };
};

export const Dashboard = () => {
  const { year, month, setYear, setMonth } = useDashboardUrlFilters();

  const params = useMemo(
    () => ({
      year: Number(year),
      month: month === "all" ? undefined : Number(month),
      years_range: 6,
      top_limit: 3,
    }),
    [year, month]
  );

  const { data, isLoading, isError } = useDashboard(params);

  const kpis = data?.kpis;
  const charts = data?.charts;

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Vista general del negocio — KPIs, tendencias y top performers
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <DashboardFilters
            year={year}
            month={month}
            years={AVAILABLE_YEARS}
            onYearChange={setYear}
            onMonthChange={setMonth}
          />
          <ExportReportDialog />
        </div>
      </div>

      {/* Loading (only first load) */}
      {isLoading && !data && (
        <div className="flex justify-center py-16">
          <Loader2 className="size-8 animate-spin text-primary" strokeWidth={2.5} />
        </div>
      )}

      {/* Error */}
      {isError && (
        <Card className="p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No se pudo cargar el dashboard. Intenta de nuevo.
          </p>
        </Card>
      )}

      {/* Content */}
      {data && !isError && kpis && charts && (
        <>
          {/* KPI Grid */}
          <section
            aria-label="Indicadores principales"
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <KpiCard
              label={kpis.totalSales.label}
              value={mxnFormatter.format(kpis.totalSales.value)}
              icon={CircleDollarSign}
              accent="blue"
              trend={toTrend(kpis.totalSales)}
              hint="vs. período anterior"
            />
            <KpiCard
              label={kpis.totalProfit.label}
              value={mxnFormatter.format(kpis.totalProfit.value)}
              icon={TrendingUp}
              accent="green"
              trend={toTrend(kpis.totalProfit)}
              hint="vs. período anterior"
            />
            <KpiCard
              label={kpis.totalMovements.label}
              value={numberFormatter.format(kpis.totalMovements.value)}
              icon={Activity}
              accent="violet"
              hint={kpis.totalMovements.hint}
            />
            <KpiCard
              label={kpis.totalBrands.label}
              value={numberFormatter.format(kpis.totalBrands.value)}
              icon={Car}
              accent="amber"
              hint={kpis.totalBrands.hint}
            />
            <KpiCard
              label={kpis.activeExpenses.label}
              value={mxnFormatter.format(kpis.activeExpenses.value)}
              icon={ReceiptText}
              accent="green"
              trend={toTrend(kpis.activeExpenses)}
              hint={kpis.activeExpenses.hint}
            />
            <KpiCard
              label={kpis.passiveExpenses.label}
              value={mxnFormatter.format(kpis.passiveExpenses.value)}
              icon={TrendingDown}
              accent="rose"
              trend={toTrend(kpis.passiveExpenses)}
              hint={kpis.passiveExpenses.hint}
            />
            <KpiCard
              label={kpis.investorsCount.label}
              value={numberFormatter.format(kpis.investorsCount.value)}
              icon={Users}
              accent="blue"
              hint={kpis.investorsCount.hint}
            />
            <KpiCard
              label={kpis.totalInvested.label}
              value={mxnFormatter.format(kpis.totalInvested.value)}
              icon={Banknote}
              accent="violet"
              trend={toTrend(kpis.totalInvested)}
              hint={kpis.totalInvested.hint}
            />
          </section>

          {/* Time series row */}
          <section
            aria-label="Tendencias anuales"
            className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3"
          >
            <CarsByYearChart data={charts.carsSoldPerYear} />
            <ProfitByYearChart data={charts.profitPerYear} />
            <InvestmentByYearChart data={charts.investmentPerYear} />
          </section>

          {/* Breakdown row */}
          <section
            aria-label="Desglose por marca y categoría"
            className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3"
          >
            <ProfitByBrandChart data={charts.profitByBrand} />
            <AvgDaysToSellChart data={charts.avgDaysToSellByBrand} />
            <ExpensesByCategoryChart data={charts.expensesByCategory} />
          </section>

          {/* Top performers */}
          <section aria-label="Top performers" className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div>
              <TopCarsCard cars={charts.topSoldCars} />
            </div>
            <div className="lg:col-span-2">
              <CarsByBrandChart data={charts.carsByBrand} />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
