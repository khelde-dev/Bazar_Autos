import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { YearProfit } from "../Types/Dashboard.types";

const config = {
  profit: {
    label: "Utilidad",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const compactFormatter = new Intl.NumberFormat("es-MX", {
  notation: "compact",
  maximumFractionDigits: 1,
});

interface Props {
  data: YearProfit[];
}

export const ProfitByYearChart = ({ data }: Props) => (
  <Card className="overflow-hidden">
    <CardHeader>
      <CardTitle className="text-base">Utilidad por año</CardTitle>
      <CardDescription>Tendencia de utilidad neta</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={config} className="h-[260px] w-full">
        <LineChart data={data} margin={{ left: 0, right: 8, top: 8 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={42}
            tickFormatter={(v: number) => compactFormatter.format(v)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            dataKey="profit"
            type="monotone"
            stroke="var(--color-profit)"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "var(--color-profit)" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
  </Card>
);
