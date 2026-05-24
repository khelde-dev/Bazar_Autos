import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { BrandCount } from "../Types/Dashboard.types";

const config = {
  total: { label: "Autos", color: "var(--chart-2)" },
} satisfies ChartConfig;

interface Props {
  data: BrandCount[];
}

export const CarsByBrandChart = ({ data }: Props) => (
  <Card className="h-full overflow-hidden">
    <CardHeader>
      <CardTitle className="text-base">Autos en catálogo por marca</CardTitle>
      <CardDescription>Conteo de autos registrados por marca en el período</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={config} className="h-85 w-full">
        <BarChart data={data} margin={{ left: 0, right: 8, top: 16, bottom: 8 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="brand" tickLine={false} axisLine={false} tickMargin={8} interval={0} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={28}
            allowDecimals={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="total" fill="var(--color-total)" radius={[6, 6, 0, 0]}>
            <LabelList dataKey="total" position="top" className="fill-foreground" fontSize={11} />
          </Bar>
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
);
