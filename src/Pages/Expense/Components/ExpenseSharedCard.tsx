import { Pencil, Trash2 } from "lucide-react";
import { resolveCarColor } from "../../../Utils/Functions/colorUtils";
import type { SharedExpenseRow } from "../Types/ExpenseList.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const mxnFormatter = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

const formatMoney = (v: number) => mxnFormatter.format(v);

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
  onDelete: () => void;
}

export const ExpenseSharedCard = ({ row, onEdit, onDelete }: Props) => (
  <Card>
    {/* Header: nombre, badge, total, acciones */}
    <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
      <div className="flex min-w-0 items-center gap-2">
        <span className="truncate text-sm font-bold">{row.category.name}</span>
        <SubTypeBadge type={row.category.type} />
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-base font-black text-primary">{formatMoney(row.total)}</span>
        <Button variant="ghost" size="icon-sm" onClick={onEdit} aria-label="Editar" title="Editar">
          <Pencil />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onDelete}
          aria-label="Eliminar"
          title="Eliminar"
          className="text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
        >
          <Trash2 />
        </Button>
      </div>
    </CardHeader>

    {/* Chips de autos */}
    <CardContent className="pb-3">
      <div className="flex flex-wrap gap-2">
        {row.cars.map((car) => (
          <CarChip
            key={car.car_id}
            brand={car.brand}
            model={car.model}
            year={car.year}
            color={car.color}
          />
        ))}
      </div>
    </CardContent>

    {/* Footer: conteo + por auto */}
    <CardFooter className="justify-between border-t pt-3">
      <span className="text-[10px] font-medium text-muted-foreground">
        {row.cars.length} {row.cars.length === 1 ? "vehículo" : "vehículos"} · Monto compartido
      </span>
      {row.cars.length > 1 && (
        <span className="text-[10px] text-muted-foreground">
          {formatMoney(row.total / row.cars.length)}/auto
        </span>
      )}
    </CardFooter>
  </Card>
);
