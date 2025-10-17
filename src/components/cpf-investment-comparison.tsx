"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CPF_INTEREST_FLOOR_RATES } from "@/constants/cpf-interest-rates";
import { formatCurrency, formatPercentage } from "@/lib/format";

interface InvestmentScenario {
  name: string;
  rate: number;
  description: string;
  riskLevel: "Low" | "Medium" | "High";
  color: string;
}

const INVESTMENT_SCENARIOS: InvestmentScenario[] = [
  {
    name: "CPF OA",
    rate: CPF_INTEREST_FLOOR_RATES.OA,
    description: "Ordinary Account - Fixed floor rate",
    riskLevel: "Low",
    color: "#3b82f6",
  },
  {
    name: "CPF SA/MA/RA",
    rate: CPF_INTEREST_FLOOR_RATES.SMRA,
    description: "Special, MediSave & Retirement Accounts",
    riskLevel: "Low",
    color: "#10b981",
  },
  {
    name: "Singapore Bonds",
    rate: 3.5,
    description: "Government bonds and corporate bonds",
    riskLevel: "Low",
    color: "#f59e0b",
  },
  {
    name: "STI ETF",
    rate: 6.0,
    description: "Straits Times Index ETF (historical avg)",
    riskLevel: "Medium",
    color: "#8b5cf6",
  },
  {
    name: "Global Equity ETF",
    rate: 7.5,
    description: "MSCI World Index (historical avg)",
    riskLevel: "Medium",
    color: "#ec4899",
  },
  {
    name: "Tech Stocks",
    rate: 10.0,
    description: "Technology sector equities (high volatility)",
    riskLevel: "High",
    color: "#ef4444",
  },
];

interface ChartDataPoint {
  year: number;
  [key: string]: number;
}

const calculateGrowth = (
  principal: number,
  rate: number,
  years: number,
): number => {
  return principal * Math.pow(1 + rate / 100, years);
};

export const CPFInvestmentComparison = () => {
  const [principal, setPrincipal] = useState<number>(50000);
  const [years, setYears] = useState<number>(20);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([
    "CPF OA",
    "CPF SA/MA/RA",
    "STI ETF",
  ]);

  const toggleScenario = (name: string) => {
    setSelectedScenarios((prev) =>
      prev.includes(name)
        ? prev.filter((s) => s !== name)
        : [...prev, name].slice(0, 4), // Limit to 4 scenarios for chart readability
    );
  };

  // Generate chart data
  const chartData: ChartDataPoint[] = Array.from(
    { length: years + 1 },
    (_, year) => {
      const dataPoint: ChartDataPoint = { year };
      INVESTMENT_SCENARIOS.filter((s) =>
        selectedScenarios.includes(s.name),
      ).forEach((scenario) => {
        dataPoint[scenario.name] = calculateGrowth(
          principal,
          scenario.rate,
          year,
        );
      });
      return dataPoint;
    },
  );

  // Calculate final values for comparison table
  const finalValues = INVESTMENT_SCENARIOS.map((scenario) => ({
    ...scenario,
    finalValue: calculateGrowth(principal, scenario.rate, years),
    totalGain: calculateGrowth(principal, scenario.rate, years) - principal,
  }));

  return (
    <div className="space-y-6">
      {/* Disclaimer Banner */}
      <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30">
        <CardContent className="pt-6">
          <p className="text-sm text-amber-900 dark:text-amber-200">
            <strong>Disclaimer:</strong> The investment returns shown are
            historical averages and do not guarantee future performance.
            Investments carry risks including potential loss of principal. CPF
            savings are guaranteed by the Singapore Government. Always consult a
            financial adviser before making investment decisions.
          </p>
        </CardContent>
      </Card>

      {/* Calculator Section */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Investment Returns Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Controls */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="principal">Initial Amount (S$)</Label>
              <Input
                id="principal"
                type="number"
                min="1000"
                step="1000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="years">Investment Period: {years} years</Label>
              <Slider
                id="years"
                min={1}
                max={40}
                step={1}
                value={[years]}
                onValueChange={([value]) => setYears(value)}
                className="mt-2"
              />
            </div>
          </div>

          {/* Scenario Selection */}
          <div className="space-y-3">
            <Label>Select Investment Scenarios (max 4 for chart):</Label>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {INVESTMENT_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.name}
                  type="button"
                  onClick={() => toggleScenario(scenario.name)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    selectedScenarios.includes(scenario.name)
                      ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{scenario.name}</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                        {formatPercentage(scenario.rate / 100, { decimalPlaces: 1 })} p.a.
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        scenario.riskLevel === "Low"
                          ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300"
                          : scenario.riskLevel === "Medium"
                            ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                            : "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300"
                      }`}
                    >
                      {scenario.riskLevel}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Growth Chart */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-4">Growth Over Time</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  label={{ value: "Years", position: "insideBottom", offset: -5 }}
                />
                <YAxis
                  label={{ value: "Value (S$)", angle: -90, position: "insideLeft" }}
                  tickFormatter={(value) => formatCurrency(value, { compact: true })}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend />
                {INVESTMENT_SCENARIOS.filter((s) =>
                  selectedScenarios.includes(s.name),
                ).map((scenario) => (
                  <Line
                    key={scenario.name}
                    type="monotone"
                    dataKey={scenario.name}
                    stroke={scenario.color}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Final Value Comparison ({years} years)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Investment Type</TableHead>
                <TableHead>Rate p.a.</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead className="text-right">Final Value</TableHead>
                <TableHead className="text-right">Total Gain</TableHead>
                <TableHead className="text-right">Gain vs CPF OA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {finalValues.map((item) => {
                const cpfOaGain = finalValues.find(
                  (v) => v.name === "CPF OA",
                )?.totalGain || 0;
                const gainVsCpfOa = item.totalGain - cpfOaGain;

                return (
                  <TableRow key={item.name}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      {formatPercentage(item.rate / 100, { decimalPlaces: 1 })}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          item.riskLevel === "Low"
                            ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300"
                            : item.riskLevel === "Medium"
                              ? "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
                              : "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300"
                        }`}
                      >
                        {item.riskLevel}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(item.finalValue)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.totalGain)}
                    </TableCell>
                    <TableCell
                      className={`text-right font-medium ${
                        gainVsCpfOa > 0
                          ? "text-green-600 dark:text-green-400"
                          : gainVsCpfOa < 0
                            ? "text-red-600 dark:text-red-400"
                            : ""
                      }`}
                    >
                      {gainVsCpfOa > 0 ? "+" : ""}
                      {formatCurrency(gainVsCpfOa)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Key Considerations */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Key Considerations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                CPF Advantages
              </h4>
              <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                <li>• Guaranteed returns by Singapore Government</li>
                <li>• No market volatility risk</li>
                <li>• Tax-free interest earnings</li>
                <li>• Automatic monthly contributions from salary</li>
              </ul>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
              <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                Investment Advantages
              </h4>
              <ul className="space-y-1 text-amber-800 dark:text-amber-200">
                <li>• Potential for higher returns (with higher risk)</li>
                <li>• More liquidity and flexibility</li>
                <li>• Diversification opportunities</li>
                <li>• Can invest beyond CPF limits</li>
              </ul>
            </div>

            <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                Investment Risks
              </h4>
              <ul className="space-y-1 text-red-800 dark:text-red-200">
                <li>• Market volatility can lead to losses</li>
                <li>• No guaranteed returns</li>
                <li>• Requires knowledge and active management</li>
                <li>• Historical returns do not guarantee future performance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CPFInvestmentComparison;
