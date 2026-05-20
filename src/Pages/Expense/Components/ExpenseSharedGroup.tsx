import { Calendar, Pencil, Tag, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { resolveCarColor } from "../../../Utils/Functions/colorUtils";
import type { IndividualExpenseRow, SharedExpenseRow } from "../Types/ExpenseList.types";

const mxnFormatter = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

const formatMoney = (v: number) => mxnFormatter.format(v);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" });

const MovementBadge = ({ type }: { type: string }) => (
  <span
    className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
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
    className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
      type === "Activo"
        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
        : "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
    }`}
  >
    {type}
  </span>
);

interface Props {
  rows: IndividualExpenseRow[];
}

export const ExpenseSharedGroup = ({ rows }: Props) => {
  const navigate = useNavigate();
  const first = rows[0];
  const totalAmount = rows.reduce((s, r) => s + r.movement.amount, 0);
  const cleanDescription = first.movement.description.replace(/^\[Compartido\]\s*/, "");

  const handleEdit = () => {
    const sharedRow: SharedExpenseRow = {
      category: first.category,
      cars: rows.map((r) => r.car),
      total: totalAmount,
    };
    navigate(`/expenses/${first.movement.id}/edit`, { state: { sharedRow } });
  };

  return (
    <article className="rounded-2xl border-2 border-violet-100 dark:border-violet-800/40 overflow-hidden shadow-sm">
      {/* Header del grupo */}
      <div className="bg-violet-50 dark:bg-violet-900/15 px-4 pt-3.5 pb-3 border-b border-violet-100 dark:border-violet-800/30">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 min-w-0">
            <MovementBadge type={first.movement.type} />
            <SubTypeBadge type={first.category.type} />
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Tag size={11} />
              <span className="text-[11px] font-semibold">{first.category.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm font-black text-slate-800 dark:text-slate-100">
              {formatMoney(totalAmount)}
            </span>
            <button
              type="button"
              onClick={handleEdit}
              className="p-1.5 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-500 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-800/40 active:scale-95 transition-all"
              aria-label="Editar gasto compartido"
              title="Editar"
            >
              <Pencil size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-2 flex-wrap">
          <div className="flex items-center gap-1 text-[10px] text-violet-500 dark:text-violet-400 font-bold">
            <Users size={11} />
            <span>{rows.length} autos · {formatMoney(first.movement.amount)}/auto</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500">
            <Calendar size={11} />
            <span>{formatDate(first.movement.closing_date)}</span>
          </div>
        </div>

        {cleanDescription && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-1">
            {cleanDescription}
          </p>
        )}
      </div>

      {/* Lista de autos con línea de tiempo */}
      <div className="bg-white dark:bg-gray-800 px-4 py-3">
        <div className="relative pl-5">
          {/* Línea vertical conectora */}
          <div className="absolute left-[5px] top-3 bottom-3 w-px bg-violet-200 dark:bg-violet-700/50" />

          <div className="space-y-2">
            {rows.map((row) => (
              <div key={row.car.id} className="relative flex items-center gap-2">
                {/* Punto de la línea */}
                <div className="absolute -left-[13px] w-[11px] h-[11px] rounded-full bg-white dark:bg-gray-800 border-2 border-violet-300 dark:border-violet-600 shrink-0" />

                {/* Chip del auto */}
                <div className="flex-1 flex items-center gap-2 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-600 min-w-0">
                  <span
                    className="inline-block w-3 h-3 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: resolveCarColor(row.car.color) }}
                    title={row.car.color}
                  />
                  <span className="text-[12px] font-bold text-slate-700 dark:text-slate-200 truncate">
                    {row.car.brand} {row.car.model}
                  </span>
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 shrink-0">
                    {row.car.year}
                  </span>
                  <span className="ml-auto text-[10px] text-gray-400 dark:text-gray-500 font-mono shrink-0">
                    {row.car.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
