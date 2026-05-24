import { lazy, Suspense, useMemo } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardFilters } from "./Components/DashboardFilters";
import { KpiCard } from "./Components/KpiCard";
import { TopCarsCard } from "./Components/TopCarsCard";
import { ExportReportDialog } from "./Components/ExportReportDialog";
import { useDashboard } from "./Hooks/useDashboard";
import { useDashboardUrlFilters } from "./Hooks/useDashboardUrlFilters";
import type { KpiValue } from "./Types/Dashboard.types";

// Lazy — chart-vendor (431 KB / 115 KB gzip) se descarga solo cuando se llega al dashboard
const CarsByYearChart     = lazy(() => import("./Components/CarsByYearChart").then(m => ({ default: m.CarsByYearChart })));
const ProfitByYearChart   = lazy(() => import("./Components/ProfitByYearChart").then(m => ({ default: m.ProfitByYearChart })));
const InvestmentByYearChart = lazy(() => import("./Components/InvestmentByYearChart").then(m => ({ default: m.InvestmentByYearChart })));
const ProfitByBrandChart  = lazy(() => import("./Components/ProfitByBrandChart").then(m => ({ default: m.ProfitByBrandChart })));
const AvgDaysToSellChart  = lazy(() => import("./Components/AvgDaysToSellChart").then(m => ({ default: m.AvgDaysToSellChart })));
const ExpensesByCategoryChart = lazy(() => import("./Components/ExpensesByCategoryChart").then(m => ({ default: m.ExpensesByCategoryChart })));
const CarsByBrandChart    = lazy(() => import("./Components/CarsByBrandChart").then(m => ({ default: m.CarsByBrandChart })));

// Skeleton para cada card de chart mientras carga chart-vendor
const ChartSkeleton = () => (
  <Card className="space-y-3 p-4">
    <Skeleton className="h-4 w-2/5" />
    <Skeleton className="h-[260px] w-full rounded-lg" />
  </Card>
);

const ChartRowSkeleton = ({ count }: { count: 2 | 3 }) => (
  <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
    <ChartSkeleton />
    <ChartSkeleton />
    {count === 3 && <ChartSkeleton />}
  </div>
);

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
            Vista general del negocio: KPIs, tendencias y top performers
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
          <Suspense fallback={<ChartRowSkeleton count={3} />}>
            <section
              aria-label="Tendencias anuales"
              className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3"
            >
              <CarsByYearChart data={charts.carsSoldPerYear} />
              <ProfitByYearChart data={charts.profitPerYear} />
              <InvestmentByYearChart data={charts.investmentPerYear} />
            </section>
          </Suspense>

          {/* Breakdown row */}
          <Suspense fallback={<ChartRowSkeleton count={3} />}>
            <section
              aria-label="Desglose por marca y categoría"
              className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3"
            >
              <ProfitByBrandChart data={charts.profitByBrand} />
              <AvgDaysToSellChart data={charts.avgDaysToSellByBrand} />
              <ExpensesByCategoryChart data={charts.expensesByCategory} />
            </section>
          </Suspense>

          {/* Top performers */}
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <ChartSkeleton />
                <div className="lg:col-span-2"><ChartSkeleton /></div>
              </div>
            }
          >
            <section aria-label="Top performers" className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div>
                <TopCarsCard cars={charts.topSoldCars} />
              </div>
              <div className="lg:col-span-2">
                <CarsByBrandChart data={charts.carsByBrand} />
              </div>
            </section>
          </Suspense>
        </>
      )}
    </div>
  );
};
