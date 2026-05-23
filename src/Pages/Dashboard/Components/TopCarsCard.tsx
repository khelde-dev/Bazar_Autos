import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TopCar } from "../data/mock";

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
        <CardTitle className="text-base">Top 3 autos vendidos</CardTitle>
        <p className="text-xs text-muted-foreground">Mejores modelos por unidades vendidas</p>
      </div>
      <div className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
        <Trophy size={16} />
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      {cars.map((car) => (
        <div
          key={`${car.brand}-${car.model}-${car.year}`}
          className="flex items-center gap-3 rounded-xl border border-border/60 p-3"
        >
          <div
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg font-bold",
              RANK_CLASSES[car.rank - 1],
            )}
          >
            #{car.rank}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              {car.brand} {car.model}
            </p>
            <p className="text-xs text-muted-foreground">Año {car.year}</p>
          </div>
          <div className="flex flex-col items-end">
            <Badge variant="secondary" className="font-mono">
              {car.unitsSold} u
            </Badge>
            <span className="mt-1 text-[11px] text-muted-foreground">
              {mxnFormatter.format(car.profit)}
            </span>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);
