"use client";

import { format, parse } from "date-fns";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CPF_INTEREST_FLOOR_RATES,
  SGS_YIELDS_MONTHLY,
} from "@/constants/cpf-interest-rates";
import { calculateInterestTrend } from "@/lib/calculate-interest-trend";
import { formatPercentage } from "@/lib/format";

// Chart colors
const COLORS = {
  sgsYield: "#3b82f6", // blue
  peggedRate: "#f59e0b", // amber
  actualRate: "#10b981", // green
  floorLine: "#ef4444", // red
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded border border-zinc-200 bg-white p-3 shadow-md dark:border-zinc-700 dark:bg-zinc-800">
        <p className="mb-2 font-medium">{label}</p>
        {payload.map((entry: any) => (
          <p
            key={entry.name}
            className="text-sm"
            style={{ color: entry.color }}
          >
            {entry.name}:{" "}
            {formatPercentage(entry.value / 100, { decimalPlaces: 2 })}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const InterestRateTrendChart = () => {
  // Calculate trend data from monthly SGS yields
  const trendData = calculateInterestTrend(SGS_YIELDS_MONTHLY);

  // Transform data for Recharts (convert to chart-friendly format)
  const chartData = trendData.map((data) => ({
    month: format(parse(data.month, "yyyy-MM", new Date()), "MMM yy"),
    "10Y SGS Yield": data.sgsYield,
    "Pegged Rate (SGS+1%)": data.peggedRate,
    "Actual SMRA Rate": data.actualRate,
  }));

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-center">
          CPF Interest Rate Trends (12-Month View)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-zinc-200 dark:stroke-zinc-700"
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              className="text-zinc-600 dark:text-zinc-400"
            />
            <YAxis
              tickFormatter={(value) =>
                formatPercentage(value / 100, { decimalPlaces: 1 })
              }
              tick={{ fontSize: 12 }}
              className="text-zinc-600 dark:text-zinc-400"
              domain={[2, 5]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "14px" }} />

            {/* Floor rate reference line */}
            <ReferenceLine
              y={CPF_INTEREST_FLOOR_RATES.SMRA}
              stroke={COLORS.floorLine}
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{
                value: "SMRA Floor (4%)",
                position: "right",
                fill: COLORS.floorLine,
                fontSize: 12,
              }}
            />

            {/* Data lines */}
            <Line
              type="monotone"
              dataKey="10Y SGS Yield"
              stroke={COLORS.sgsYield}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Pegged Rate (SGS+1%)"
              stroke={COLORS.peggedRate}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Actual SMRA Rate"
              stroke={COLORS.actualRate}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-6 space-y-3">
          <div className="rounded-md bg-amber-50 p-4 dark:bg-amber-950">
            <p className="text-amber-900 text-sm dark:text-amber-100">
              <span className="font-semibold">How it works:</span> The SMRA
              (Special, MediSave & Retirement Accounts) interest rate is pegged
              to the 12-month average of 10-year Singapore Government Securities
              (SGS) yield plus 1%. When this pegged rate falls below 4%, members
              receive the floor rate of 4% instead.
            </p>
          </div>

          <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-950">
            <p className="text-blue-900 text-sm dark:text-blue-100">
              <span className="font-semibold">Why floor rates matter:</span>{" "}
              Floor rates protect your CPF savings during periods of low
              interest rates. Even when market rates fall below the floor, your
              CPF accounts continue to earn the guaranteed minimum rate,
              ensuring consistent growth of your retirement savings.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterestRateTrendChart;
