import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackBar } from "./Components/BackBar";
import { InvestmentItem } from "./Components/InvestmentItem";
import { TotalBalanceCard } from "./Components/TotalBalanceCard";
import { YearMonthFilter } from "./Components/YearMonthFilter";
import { useInvestmentsList } from "./Hooks/useInvestmentsList";
import { useUrlFilters } from "./Hooks/useUrlFilters";
import { buildYearRange } from "./Utils/format";

export const ManageInvestments = () => {
  const { userId = "" } = useParams();
  const navigate = useNavigate();
  const { year, month, setYear, setMonth } = useUrlFilters();

  const currentYear = new Date().getFullYear();
  const effectiveYear = year ?? currentYear;

  const { data, isLoading, isDebouncing } = useInvestmentsList(userId, {
    year: effectiveYear,
    month,
  });

  const years = useMemo(() => buildYearRange(2026), []);
  const investments = data?.data.data ?? [];
  const totalBalance = data?.data.current_total_balance ?? 0;

  const goToOperation = (investorId: string, investmentAmount: string) =>
    navigate(`/investments/${userId}/${investorId}/operation`, {
      state: { investmentAmount },
    });

  const goToHistory = (investorId: string) =>
    navigate(`/investments/${userId}/${investorId}/history`);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10 font-sans w-full">
      <main className="max-w-md mx-auto p-4 space-y-4" aria-label="Gestionar inversiones">
        <BackBar title="Gestionar inversiones" to="/dashboard" />

        <TotalBalanceCard amount={totalBalance} />

        <section aria-label="Filtros de búsqueda">
          <YearMonthFilter
            years={years}
            selectedYear={effectiveYear}
            selectedMonth={month}
            onYearChange={setYear}
            onMonthChange={setMonth}
          />
          {isDebouncing && (
            <div className="flex items-center justify-center gap-2 pt-3 text-blue-600">
              <Loader2 size={14} className="animate-spin" strokeWidth={3} />
              <span className="text-xs font-medium">Aplicando filtros...</span>
            </div>
          )}
        </section>

        <section aria-label="Inversiones">
          <div aria-live="polite" aria-busy={isLoading}>
            {isLoading ? (
              <div
                className="flex justify-center pt-6"
                role="status"
                aria-label="Cargando inversiones"
              >
                <Loader2
                  size={20}
                  className="animate-spin text-blue-600"
                  strokeWidth={3}
                  aria-hidden="true"
                />
              </div>
            ) : investments.length === 0 ? (
              <p className="text-center text-sm text-gray-400 pt-8" role="status">
                No hay inversiones en este periodo.
              </p>
            ) : (
              <div className="space-y-3">
                {investments.map((inv) => (
                  <InvestmentItem
                    key={inv.investor_id}
                    investment={inv}
                    onOpenHistory={goToHistory}
                    onAddTransaction={goToOperation}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};
