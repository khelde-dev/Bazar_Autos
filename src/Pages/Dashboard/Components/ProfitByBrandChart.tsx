import { Cell, Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { BrandProfit } from "../Types/Dashboard.types";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const config = {
  totalProfit: { label: "Utilidad" },
} satisfies ChartConfig;

interface Props {
  data: BrandProfit[];
}

export const ProfitByBrandChart = ({ data }: Props) => (
  <Card className="overflow-hidden">
    <CardHeader>
      <CardTitle className="text-base">Utilidad por marca</CardTitle>
      <CardDescription>Distribución de utilidad por marca en el período</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer config={config} className="mx-auto h-[260px] w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="brand" />} />
          <Pie
            data={data}
            dataKey="totalProfit"
            nameKey="brand"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={2}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1">
        {data.map((d, i) => (
          <div key={d.brand} className="flex items-center gap-1.5 text-xs">
            <span
              className="size-2.5 rounded-sm"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <span className="text-muted-foreground">{d.brand}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
