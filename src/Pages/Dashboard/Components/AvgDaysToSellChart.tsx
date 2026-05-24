import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { BrandDays } from "../Types/Dashboard.types";

const config = {
  avgDays: { label: "Días promedio", color: "var(--chart-4)" },
} satisfies ChartConfig;

interface Props {
  data: BrandDays[];
}

export const AvgDaysToSellChart = ({ data }: Props) => (
  <Card className="overflow-hidden">
    <CardHeader>
      <CardTitle className="text-base">Velocidad de venta por marca</CardTitle>
      <CardDescription>Promedio de días que tarda en venderse cada marca</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={config} className="h-[260px] w-full">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis
            type="category"
            dataKey="brand"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={70}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="avgDays" fill="var(--color-avgDays)" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
);
