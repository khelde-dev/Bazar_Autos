import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TopCar } from "../Types/Dashboard.types";

const mxnFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

interface TopCarsCardProps {
  cars: TopCar[];
}

const RANK_CLASSES = [
  "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
  "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300",
];

export const TopCarsCard = ({ cars }: TopCarsCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
      <div className="space-y-1">
        <CardTitle className="text-base">Top autos vendidos</CardTitle>
        <p className="text-xs text-muted-foreground">Mejores modelos por unidades vendidas</p>
      </div>
      <div className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
        <Trophy size={16} />
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      {cars.length === 0 && (
        <p className="py-6 text-center text-xs text-muted-foreground">Sin datos en este período</p>
      )}
      {cars.map((car) => (
        <div
          key={`${car.brand}-${car.model}-${car.year}`}
          className="rounded-xl border border-border/60 p-3"
        >
          {/* Header row */}
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                RANK_CLASSES[car.rank - 1] ?? RANK_CLASSES[2]
              )}
            >
              #{car.rank}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {car.brand} {car.model}
              </p>
              <p className="text-[11px] text-muted-foreground">Año {car.year}</p>
            </div>
            <Badge variant="secondary" className="font-mono">
              {car.units} {car.units === 1 ? "unidad" : "unidades"}
            </Badge>
          </div>

          {/* Metrics grid */}
          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border/60 pt-3">
            <div className="space-y-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Ingresos
              </p>
              <p className="text-xs font-bold tracking-tight">{mxnFormatter.format(car.revenue)}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Precio prom.
              </p>
              <p className="text-xs font-bold tracking-tight">
                {mxnFormatter.format(car.avgPrice)}
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Utilidad
              </p>
              <p className="text-xs font-bold tracking-tight text-emerald-700 dark:text-emerald-400">
                {mxnFormatter.format(car.totalProfit)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);
