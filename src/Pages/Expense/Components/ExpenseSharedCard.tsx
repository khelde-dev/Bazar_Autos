import { Pencil } from "lucide-react";
import { resolveCarColor } from "../../../Utils/Functions/colorUtils";
import type { SharedExpenseRow } from "../Types/ExpenseList.types";

const formatMoney = (v: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(v);

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

const CarChip = ({
  brand,
  model,
  year,
  color,
}: {
  brand: string;
  model: string;
  year: number;
  color: string;
}) => (
    <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-700 px-2.5 py-1.5 rounded-lg border border-gray-100 dark:border-gray-600">
      <span
        className="inline-block w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
        style={{ backgroundColor: resolveCarColor(color) }}
        title={color}
      />
      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
        {brand} {model} {year}
      </span>
    </div>
  );

interface Props {
  row: SharedExpenseRow;
  onEdit: () => void;
}

export const ExpenseSharedCard = ({ row, onEdit }: Props) => (
  <article className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm space-y-3">
    {/* Header: nombre, badge, total, editar */}
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">
          {row.category.name}
        </span>
        <SubTypeBadge type={row.category.type} />
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-base font-black text-blue-600 dark:text-blue-400">
          {formatMoney(row.total)}
        </span>
        <button
          type="button"
          onClick={onEdit}
          className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 active:scale-95 transition-all"
          aria-label="Editar gasto compartido"
          title="Editar"
        >
          <Pencil size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>

    {/* Chips de autos */}
    <div className="flex flex-wrap gap-2">
      {row.cars.map((car) => (
        <CarChip
          key={car.id}
          brand={car.brand}
          model={car.model}
          year={car.year}
          color={car.color}
        />
      ))}
    </div>

    {/* Footer: conteo + por auto */}
    <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-700">
      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
        {row.cars.length} {row.cars.length === 1 ? "vehículo" : "vehículos"} · Monto compartido
      </span>
      {row.cars.length > 1 && (
        <span className="text-[10px] text-gray-400 dark:text-gray-500">
          {formatMoney(row.total / row.cars.length)}/auto
        </span>
      )}
    </div>
  </article>
);
