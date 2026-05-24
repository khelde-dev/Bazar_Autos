import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { YearCars } from "../Types/Dashboard.types";

const config = {
  cars: {
    label: "Autos",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface Props {
  data: YearCars[];
}

export const CarsByYearChart = ({ data }: Props) => (
  <Card className="overflow-hidden">
    <CardHeader>
      <CardTitle className="text-base">Autos vendidos por año</CardTitle>
      <CardDescription>Unidades movidas por período anual</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={config} className="h-[260px] w-full">
        <BarChart data={data} margin={{ left: 0, right: 8, top: 8 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} width={28} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="cars" fill="var(--color-cars)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
);
