import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { YearInvestment } from "../Types/Dashboard.types";

const config = {
  investment: {
    label: "Inversión",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const compactFormatter = new Intl.NumberFormat("es-MX", {
  notation: "compact",
  maximumFractionDigits: 1,
});

interface Props {
  data: YearInvestment[];
}

export const InvestmentByYearChart = ({ data }: Props) => (
  <Card className="overflow-hidden">
    <CardHeader>
      <CardTitle className="text-base">Inversión total por año</CardTitle>
      <CardDescription>Capital acumulado de inversionistas</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={config} className="h-[260px] w-full">
        <AreaChart data={data} margin={{ left: 0, right: 8, top: 8 }}>
          <defs>
            <linearGradient id="investmentFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-investment)" stopOpacity={0.45} />
              <stop offset="95%" stopColor="var(--color-investment)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
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
          <Area
            dataKey="investment"
            type="monotone"
            stroke="var(--color-investment)"
            strokeWidth={2.5}
            fill="url(#investmentFill)"
          />
        </AreaChart>
      </ChartContainer>
    </CardContent>
  </Card>
);
