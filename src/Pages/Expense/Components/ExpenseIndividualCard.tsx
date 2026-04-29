import { Calendar, Pencil, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { resolveCarColor } from "../../../Utils/Functions/colorUtils";
import type { IndividualExpenseRow } from "../Types/ExpenseList.types";

const formatMoney = (v: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(v);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" });

const MovementBadge = ({ type }: { type: string }) => (
  <span
    className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
      type === "Compra"
        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
        : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
    }`}
  >
    {type}
  </span>
);

const SubTypeBadge = ({ type }: { type: string }) => (
  <span
    className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
      type === "Activo"
        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
        : "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
    }`}
  >
    {type}
  </span>
);

interface Props {
  row: IndividualExpenseRow;
}

export const ExpenseIndividualCard = ({ row }: Props) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/expenses/${row.movement.id}/edit`, { state: { row } });
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm space-y-2.5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-wrap">
          <MovementBadge type={row.movement.type} />
          <SubTypeBadge type={row.category.type} />
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
            <Tag size={11} />
            <span className="text-[11px] font-semibold">{row.category.name}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-base font-black text-slate-800 dark:text-slate-100">
            {formatMoney(row.movement.amount)}
          </span>
          <button
            type="button"
            onClick={handleEdit}
            className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 active:scale-95 transition-all"
            aria-label="Editar gasto"
            title="Editar"
          >
            <Pencil size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-600">
        <span
          className="inline-block w-3 h-3 rounded-full border border-black/10 shrink-0"
          style={{ backgroundColor: resolveCarColor(row.car.color) }}
          title={row.car.color}
        />
        <span className="text-[12px] font-bold text-slate-700 dark:text-slate-200">
          {row.car.brand} {row.car.model}
        </span>
        <span className="text-[11px] text-gray-400 dark:text-gray-500">{row.car.year}</span>
        <span className="ml-auto text-[10px] text-gray-400 dark:text-gray-500 font-mono">
          {row.car.status}
        </span>
      </div>

      {row.movement.description && (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 px-1 leading-relaxed line-clamp-2">
          {row.movement.description}
        </p>
      )}

      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 dark:text-gray-500 pt-0.5">
        <Calendar size={11} />
        <span>{formatDate(row.movement.closing_date)}</span>
      </div>
    </article>
  );
};
