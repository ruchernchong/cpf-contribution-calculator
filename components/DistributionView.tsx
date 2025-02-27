import { formatCurrency, formatPercentage } from "@/lib/format";
import type { DistributionResult } from "@/types";
import dynamic from "next/dynamic";
import { Card, CardContent } from "./ui/card";

const DistributionPieChart = dynamic(() => import("./DistributionPieChart"));

interface DistributionViewProps {
  distributionResults: DistributionResult[];
}

export const DistributionView = ({
  distributionResults,
}: DistributionViewProps) => {
  const totalCpfContribution = distributionResults.reduce(
    (accum, curr) => accum + curr.value,
    0,
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="space-y-0">
            {distributionResults.map(({ name, value }) => (
              <div
                key={name}
                className="py-4 flex justify-between items-center border-b last:border-0"
              >
                <p className="text-zinc-500 font-medium">
                  {name} ({formatPercentage(value / totalCpfContribution)})
                </p>
                <p className="font-semibold text-xl">{formatCurrency(value)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-md">
        <CardContent className="h-[300px] flex items-center justify-center pt-6">
          <DistributionPieChart
            data={distributionResults}
            className="block w-full h-full"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DistributionView;
