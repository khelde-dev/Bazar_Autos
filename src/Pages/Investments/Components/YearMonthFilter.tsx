const MONTHS_SHORT = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

interface YearMonthFilterProps {
  years: number[];
  selectedYear: number | null;
  selectedMonth: number | null; // 1-12, null = todos
  onYearChange: (year: number | null) => void;
  onMonthChange: (month: number | null) => void;
}

const PillButton = ({
  active,
  onClick,
  children,
  ariaLabel,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    aria-label={ariaLabel}
    className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
      active
        ? "bg-blue-600 text-white shadow-sm"
        : "bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-300 border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500"
    }`}
  >
    {children}
  </button>
);

export const YearMonthFilter = ({
  years,
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
}: YearMonthFilterProps) => (
  <div className="space-y-3">
    {/* Años */}
    <div
      role="group"
      aria-label="Filtrar por año"
      className="flex gap-2 overflow-x-auto overflow-y-hidden pb-1 scrollbar-hide"
    >
      {years.map((y) => (
        <PillButton
          key={y}
          active={y === selectedYear}
          onClick={() => onYearChange(y)}
          ariaLabel={`Año ${y}`}
        >
          {y}
        </PillButton>
      ))}
    </div>

    {/* Meses (1-12) */}
    <div
      role="group"
      aria-label="Filtrar por mes"
      className="flex gap-2 overflow-x-auto overflow-y-hidden pb-1 scrollbar-hide"
    >
      <PillButton
        active={selectedMonth === null}
        onClick={() => onMonthChange(null)}
        ariaLabel="Todos los meses"
      >
        Todos
      </PillButton>
      {MONTHS_SHORT.map((m, idx) => {
        const monthNum = idx + 1; // 1-12
        return (
          <PillButton
            key={m}
            active={selectedMonth === monthNum}
            onClick={() => onMonthChange(monthNum)}
            ariaLabel={`Mes ${m}`}
          >
            {m}
          </PillButton>
        );
      })}
    </div>
  </div>
);
