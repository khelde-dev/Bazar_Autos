import { Layers, Loader2, Rows3, Search } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { YearMonthFilter } from "../Investments/Components/YearMonthFilter";
import { buildYearRange } from "../Investments/Utils/format";
import { BackBar } from "../Investments/Components/BackBar";
import { ExpenseIndividualCard } from "./Components/ExpenseIndividualCard";
import { ExpenseListPagination } from "./Components/ExpenseListPagination";
import { ExpenseSharedCard } from "./Components/ExpenseSharedCard";
import { ExpenseSharedGroup } from "./Components/ExpenseSharedGroup";
import { ExpenseSubTypeFilter } from "./Components/ExpenseSubTypeFilter";
import { useExpenseList } from "./Hooks/useExpenseList";
import { useExpenseUrlFilters } from "./Hooks/useExpenseUrlFilters";
import type { IndividualExpenseRow, SharedExpenseRow } from "./Types/ExpenseList.types";

const ViewToggle = ({
  isShared,
  onChange,
}: {
  isShared: boolean;
  onChange: (v: boolean) => void;
}) => (
  <div className="flex gap-1 bg-gray-100 dark:bg-gray-700/60 p-1 rounded-xl">
    <button
      type="button"
      onClick={() => onChange(true)}
      className={`flex items-center gap-1.5 flex-1 justify-center py-2 px-3 rounded-lg text-xs font-bold transition-all ${
        isShared
          ? "bg-white dark:bg-gray-800 text-blue-600 shadow-sm"
          : "text-gray-500 dark:text-gray-400"
      }`}
      aria-pressed={isShared}
    >
      <Layers size={13} />
      Agrupado
    </button>
    <button
      type="button"
      onClick={() => onChange(false)}
      className={`flex items-center gap-1.5 flex-1 justify-center py-2 px-3 rounded-lg text-xs font-bold transition-all ${
        !isShared
          ? "bg-white dark:bg-gray-800 text-blue-600 shadow-sm"
          : "text-gray-500 dark:text-gray-400"
      }`}
      aria-pressed={!isShared}
    >
      <Rows3 size={13} />
      Detallado
    </button>
  </div>
);

export const ExpenseListPage = () => {
  const navigate = useNavigate();
  const {
    year, month, type, name, isShared, page,
    setYear, setMonth, setType, setName, setIsShared, setPage,
  } = useExpenseUrlFilters();

  const currentYear = new Date().getFullYear();
  const effectiveYear = year ?? currentYear;
  const years = useMemo(() => buildYearRange(2026), []);

  const filters = useMemo(
    () => ({ isShared, year: effectiveYear, month, type, name, page }),
    [isShared, effectiveYear, month, type, name, page]
  );

  const { data, isLoading, isDebouncing } = useExpenseList(filters);

  const rows = data?.data?.rows ?? [];
  const pagination = data?.data?.pagination ?? null;

  // Vista detallada: agrupar filas por movement.id para mostrar compartidos juntos
  const groupedIndividual = useMemo(() => {
    if (isShared) return [];
    const map = new Map<string, IndividualExpenseRow[]>();
    for (const row of rows as IndividualExpenseRow[]) {
      const group = map.get(row.movement.id) ?? [];
      group.push(row);
      map.set(row.movement.id, group);
    }
    return Array.from(map.values());
  }, [rows, isShared]);

  const handleEditShared = (row: SharedExpenseRow) => {
    navigate(`/expenses/${row.category.id}/edit`, { state: { sharedRow: row } });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 pb-10 font-sans w-full">
      <main className="max-w-md mx-auto p-4 space-y-4">
        <BackBar title="Editar Gastos" to="/dashboard" />

        <ViewToggle isShared={isShared} onChange={setIsShared} />

        <section aria-label="Filtros de fecha">
          <YearMonthFilter
            years={years}
            selectedYear={effectiveYear}
            selectedMonth={month}
            onYearChange={(y) => setYear(y)}
            onMonthChange={setMonth}
          />
        </section>

        <div className="space-y-2.5">
          <ExpenseSubTypeFilter value={type} onChange={setType} />
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Buscar por categoría..."
              className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm text-slate-700 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-blue-400 dark:focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {isDebouncing && (
          <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400">
            <Loader2 size={13} className="animate-spin" strokeWidth={3} />
            <span className="text-xs font-medium">Aplicando filtros...</span>
          </div>
        )}

        <section aria-label="Lista de gastos" aria-live="polite" aria-busy={isLoading}>
          {isLoading ? (
            <div className="flex justify-center pt-8" role="status">
              <Loader2 size={22} className="animate-spin text-blue-600" strokeWidth={3} />
            </div>
          ) : rows.length === 0 ? (
            <p className="text-center text-sm text-gray-400 dark:text-gray-500 pt-10" role="status">
              Sin resultados para los filtros seleccionados.
            </p>
          ) : isShared ? (
            <div className="space-y-3">
              {(rows as SharedExpenseRow[]).map((row, i) => (
                <ExpenseSharedCard
                  key={`${row.category.id}-${i}`}
                  row={row}
                  onEdit={() => handleEditShared(row)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {groupedIndividual.map((group) =>
                group.length === 1 ? (
                  <ExpenseIndividualCard
                    key={group[0].movement.id}
                    row={group[0]}
                  />
                ) : (
                  <ExpenseSharedGroup
                    key={group[0].movement.id}
                    rows={group}
                  />
                )
              )}
            </div>
          )}
        </section>

        {pagination && (
          <ExpenseListPagination pagination={pagination} onPageChange={setPage} />
        )}
      </main>
    </div>
  );
};
