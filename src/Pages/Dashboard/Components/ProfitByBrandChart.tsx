import { TrendingDown } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { getChartColor } from "@/Utils/Functions/colorUtils";
import type { BrandProfit } from "../Types/Dashboard.types";

const config = {
  totalProfit: { label: "Utilidad" },
} satisfies ChartConfig;

const mxnCompact = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  notation: "compact",
  maximumFractionDigits: 1,
});

interface Props {
  data: BrandProfit[];
}

export const ProfitByBrandChart = ({ data }: Props) => {
  // Recharts Pie distorsiona con valores negativos — separar positivos del donut
  // y mostrar negativos como chips de pérdida abajo.
  const positives = data.filter((d) => d.totalProfit > 0);
  const negatives = data.filter((d) => d.totalProfit < 0);
  const total = positives.length;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-base">Utilidad por marca</CardTitle>
        <CardDescription>Distribución de utilidad por marca en el período</CardDescription>
      </CardHeader>
      <CardContent>
        {positives.length === 0 ? (
          <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">
            Sin ganancias en el período
          </div>
        ) : (
          <ChartContainer config={config} className="mx-auto h-[260px] w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="brand" />} />
              <Pie
                data={positives}
                dataKey="totalProfit"
                nameKey="brand"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
              >
                {positives.map((d, i) => (
                  <Cell key={d.brand} fill={getChartColor(i, total)} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        )}

        {/* Legend de ganancias */}
        {positives.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1">
            {positives.map((d, i) => (
              <div key={d.brand} className="flex items-center gap-1.5 text-xs">
                <span
                  className="size-2.5 rounded-sm"
                  style={{ backgroundColor: getChartColor(i, total) }}
                />
                <span className="text-muted-foreground">{d.brand}</span>
              </div>
            ))}
          </div>
        )}

        {/* Sección de pérdidas */}
        {negatives.length > 0 && (
          <div className="mt-4 border-t border-border pt-3">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
              <TrendingDown className="size-3.5" />
              Marcas con pérdida
            </div>
            <div className="flex flex-wrap gap-1.5">
              {negatives.map((d) => (
                <span
                  key={d.brand}
                  className="inline-flex items-center gap-1 rounded-md bg-rose-100 px-2 py-0.5 text-[11px] font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                  title={`${d.brand}: ${mxnCompact.format(d.totalProfit)}`}
                >
                  {d.brand}
                  <span className="font-bold">{mxnCompact.format(d.totalProfit)}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
