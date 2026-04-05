import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { BackBar } from "./Components/BackBar";
import { YearMonthFilter } from "./Components/YearMonthFilter";
import { TransactionTypeFilter } from "./Components/TransactionTypeFilter";
import { TransactionRow } from "./Components/TransactionRow";
import { useInvestmentHistory } from "./Hooks/useInvestmentHistory";
import { useUrlFilters } from "./Hooks/useUrlFilters";
import { buildYearRange } from "./Utils/format";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(value);

export const InvestmentHistory = () => {
  const { investmentId = "" } = useParams();
  const { year, month, type, setYear, setMonth, setType } = useUrlFilters();

  const currentYear = new Date().getFullYear();
  const effectiveYear = year ?? currentYear;

  const { data, isLoading } = useInvestmentHistory(investmentId, {
    year: effectiveYear,
    month,
    type,
  });

  const years = useMemo(() => buildYearRange(2026), []);
  const transactions = data?.data.data ?? [];
  const summary = data?.data.summary ?? null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10 font-sans w-full">
      <main className="max-w-md mx-auto p-4 space-y-4" aria-label="Historial de inversión">
        <BackBar title="Historial de inversión" />

        <section aria-label="Filtros de búsqueda">
          <YearMonthFilter
            years={years}
            selectedYear={effectiveYear}
            selectedMonth={month}
            onYearChange={setYear}
            onMonthChange={setMonth}
          />

          <div className="mt-3">
            <TransactionTypeFilter value={type} onChange={setType} />
          </div>
        </section>

        {/* Card resumen */}
        {summary && (
          <div className="bg-blue-600 rounded-2xl p-5 text-white shadow-md">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-1">
              Saldo Total
            </p>
            <p className="text-3xl font-black leading-none mb-4">
              {formatCurrency(summary.total_neto)}
            </p>
            <div className="flex gap-3">
              <div className="flex-1 bg-blue-500/50 rounded-xl p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-200 mb-1">
                  Ingresos
                </p>
                <p className="text-base font-bold">{formatCurrency(summary.total_entradas)}</p>
              </div>
              <div className="flex-1 bg-blue-500/50 rounded-xl p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-200 mb-1">
                  Egresos
                </p>
                <p className="text-base font-bold">{formatCurrency(summary.total_salidas)}</p>
              </div>
            </div>
          </div>
        )}

        <section aria-label="Transacciones">
          <h2 className="font-bold text-slate-800 text-base mb-3 px-1">Transacciones Recientes</h2>

          <div aria-live="polite" aria-busy={isLoading}>
            {isLoading ? (
              <div
                className="flex justify-center pt-6"
                role="status"
                aria-label="Cargando transacciones"
              >
                <Loader2
                  size={20}
                  className="animate-spin text-blue-600"
                  strokeWidth={3}
                  aria-hidden="true"
                />
              </div>
            ) : transactions.length === 0 ? (
              <p className="text-center text-sm text-gray-400 pt-8" role="status">
                Sin transacciones en este periodo.
              </p>
            ) : (
              <div className="space-y-3" role="list" aria-label="Lista de transacciones">
                {transactions.map((tx) => (
                  <TransactionRow key={tx.transaction_id} tx={tx} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};
