import dynamic from "next/dynamic";
import { formatCurrency, formatPercentage } from "@/lib/format";
import type { DistributionResult } from "@/types";
import { Card, CardContent } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const DistributionPieChart = dynamic(() => import("./DistributionPieChart"));

interface Props {
  distributionResults: DistributionResult[];
}

export const DistributionView = ({ distributionResults }: Props) => {
  const totalCpfContribution = distributionResults.reduce(
    (accum, curr) => accum + curr.value,
    0,
  );

  return (
    <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                {distributionResults.map(({ name, value }) => {
                  return (
                    <TableHead key={name} className="text-center">
                      {name} ({formatPercentage(value / totalCpfContribution)})
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                {distributionResults.map(({ name, value }) => {
                  return (
                    <TableCell
                      key={name}
                      className="text-center font-medium text-primary"
                    >
                      {formatCurrency(value)}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="shadow-md h-[450px] flex flex-col justify-center">
        <CardContent className="pt-6 h-full">
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
