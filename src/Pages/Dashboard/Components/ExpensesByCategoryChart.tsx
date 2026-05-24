import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { CategoryExpense } from "../Types/Dashboard.types";

const config = {
  total: { label: "Total" },
} satisfies ChartConfig;

const TYPE_COLORS = {
  Compra: "var(--chart-3)",
  Gasto: "var(--chart-1)",
} as const;

const compactFormatter = new Intl.NumberFormat("es-MX", {
  notation: "compact",
  maximumFractionDigits: 1,
});

interface Props {
  data: CategoryExpense[];
}

export const ExpensesByCategoryChart = ({ data }: Props) => (
  <Card className="overflow-hidden">
    <CardHeader>
      <CardTitle className="text-base">Movimientos por categoría</CardTitle>

      <CardDescription>Compras y gastos agrupados por categoría</CardDescription>
    </CardHeader>

    <CardContent>
      <ChartContainer config={config} className="h-80 w-full">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />

          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(v: number) => compactFormatter.format(v)}
          />

          <YAxis
            type="category"
            dataKey="category"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={140}
          />

          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, _, item) => {
                  const payload = item.payload;

                  return [
                    `$${Number(value).toLocaleString("es-MX")}`,
                    `${payload.category} • ${payload.movement_type} • ${payload.category_type}`,
                  ];
                }}
              />
            }
          />

          <Bar dataKey="total" radius={[0, 6, 6, 0]}>
            {data.map((d) => (
              <Cell key={`${d.category}-${d.movement_type}`} fill={TYPE_COLORS[d.movement_type]} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>

      <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span
            className="size-2.5 rounded-sm"
            style={{
              backgroundColor: TYPE_COLORS.Compra,
            }}
          />
          <span className="text-muted-foreground">Compra</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className="size-2.5 rounded-sm"
            style={{
              backgroundColor: TYPE_COLORS.Gasto,
            }}
          />
          <span className="text-muted-foreground">Gasto</span>
        </div>
      </div>
    </CardContent>
  </Card>
);
