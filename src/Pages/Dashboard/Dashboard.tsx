import { useMemo, useState } from "react";
import {
  Activity,
  Banknote,
  Car,
  CircleDollarSign,
  Coins,
  ReceiptText,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { DashboardFilters } from "./Components/DashboardFilters";
import { KpiCard } from "./Components/KpiCard";
import { TopCarsCard } from "./Components/TopCarsCard";
import { CarsByYearChart } from "./Components/CarsByYearChart";
import { ProfitByYearChart } from "./Components/ProfitByYearChart";
import { InvestmentByYearChart } from "./Components/InvestmentByYearChart";
import { ExportReportDialog } from "./Components/ExportReportDialog";
import { MOCK_KPIS, MOCK_TOP_CARS, MOCK_YEARLY } from "./data/mock";

const mxnFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});
const numberFormatter = new Intl.NumberFormat("es-MX");

const CURRENT_YEAR = new Date().getFullYear();
const AVAILABLE_YEARS = Array.from({ length: 6 }, (_, i) => CURRENT_YEAR - i);

export const Dashboard = () => {
  const [year, setYear] = useState<string>(String(CURRENT_YEAR));
  const [month, setMonth] = useState<string>("all");

  // Filter mock yearly data by selected year
  const filteredYearly = useMemo(() => {
    const target = Number(year);
    return MOCK_YEARLY.filter((d) => d.year <= target);
  }, [year]);

  // Apply a basic month factor to KPIs so the user sees filters affect numbers
  const k = useMemo(() => {
    if (month === "all") return MOCK_KPIS;
    const factor = 1 / 12;
    return {
      ...MOCK_KPIS,
      totalSales: Math.round(MOCK_KPIS.totalSales * factor),
      profitThisYear: Math.round(MOCK_KPIS.profitThisYear * factor),
      totalMovements: Math.round(MOCK_KPIS.totalMovements * factor),
      activeExpenses: Math.round(MOCK_KPIS.activeExpenses * factor),
      passiveExpenses: Math.round(MOCK_KPIS.passiveExpenses * factor),
    };
  }, [month]);

  return (
    <div className="space-y-6 p-4 lg:p-6">
      {/* Page header */}
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

      {/* KPI Grid */}
      <section
        aria-label="Indicadores principales"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        <KpiCard
          label="Ventas totales"
          value={mxnFormatter.format(k.totalSales)}
          icon={CircleDollarSign}
          accent="blue"
          trend={{ direction: "up", value: "+12.4%" }}
          hint="vs. año anterior"
        />
        <KpiCard
          label="Utilidad año actual"
          value={mxnFormatter.format(k.profitThisYear)}
          icon={TrendingUp}
          accent="green"
          trend={{ direction: "up", value: "+5.6%" }}
          hint="vs. periodo anterior"
        />
        <KpiCard
          label="Total movimientos"
          value={numberFormatter.format(k.totalMovements)}
          icon={Activity}
          accent="violet"
          hint="entradas + salidas"
        />
        <KpiCard
          label="Marcas en catálogo"
          value={numberFormatter.format(k.brandsCount)}
          icon={Car}
          accent="amber"
          hint="únicas registradas"
        />
        <KpiCard
          label="Gastos activos"
          value={mxnFormatter.format(k.activeExpenses)}
          icon={ReceiptText}
          accent="green"
          hint="recuperables"
        />
        <KpiCard
          label="Gastos pasivos"
          value={mxnFormatter.format(k.passiveExpenses)}
          icon={TrendingDown}
          accent="rose"
          hint="no recuperables"
        />
        <KpiCard
          label="Inversionistas"
          value={numberFormatter.format(k.totalInvestors)}
          icon={Users}
          accent="blue"
          hint="cuentas activas"
        />
        <KpiCard
          label="Capital invertido"
          value={mxnFormatter.format(k.totalInvestorMoney)}
          icon={Banknote}
          accent="violet"
          hint="total acumulado"
        />
      </section>

      {/* Charts row */}
      <section
        aria-label="Tendencias anuales"
        className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3"
      >
        <CarsByYearChart data={filteredYearly} />
        <ProfitByYearChart data={filteredYearly} />
        <InvestmentByYearChart data={filteredYearly} />
      </section>

      {/* Top performers */}
      <section
        aria-label="Top performers"
        className="grid gap-4 lg:grid-cols-3"
      >
        <div className="lg:col-span-1">
          <TopCarsCard cars={MOCK_TOP_CARS} />
        </div>
        <div className="lg:col-span-2">
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Coins size={16} />
              Espacio reservado para próximos widgets (ranking de inversionistas, etc.)
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
