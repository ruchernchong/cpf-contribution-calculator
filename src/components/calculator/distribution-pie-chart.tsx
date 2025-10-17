import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CPF_ACCOUNT_MAP } from "@/constants";
import { formatCurrency } from "@/lib/format";

interface PieChartData {
  name: string;
  value: number;
}

interface Props {
  data: PieChartData[];
  className?: string;
}

const FALLBACK_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export const DistributionPieChart = ({ data }: Props) => {
  const totalValue = useMemo(
    () => data.reduce((sum, entry) => sum + entry.value, 0),
    [data],
  );

  const chartConfig = useMemo(
    () =>
      data.reduce(
        (config, entry, index) => {
          config[entry.name] = {
            label: CPF_ACCOUNT_MAP[entry.name] ?? entry.name,
            color: FALLBACK_COLORS[index % FALLBACK_COLORS.length],
          };
          return config;
        },
        {
          value: { label: "Contribution" },
        } satisfies ChartConfig,
      ),
    [data],
  );

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={data.map((entry, index) => ({
            ...entry,
            fill: `var(--color-${entry.name}, ${
              FALLBACK_COLORS[index % FALLBACK_COLORS.length]
            })`,
          }))}
          dataKey="value"
          nameKey="name"
          innerRadius={80}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                return null;
              }
              const { cx, cy } = viewBox;
              return (
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan
                    x={cx}
                    y={cy}
                    className="fill-foreground font-bold text-3xl"
                  >
                    {formatCurrency(totalValue)}
                  </tspan>
                  <tspan
                    x={cx}
                    y={(cy ?? 0) + 22}
                    className="fill-muted-foreground"
                  >
                    Total CPF
                  </tspan>
                </text>
              );
            }}
          />
        </Pie>
        <ChartLegend content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  );
};

export default DistributionPieChart;
