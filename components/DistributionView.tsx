import dynamic from "next/dynamic";
import { formatCurrency, formatPercentage } from "../lib/format";
import type { DistributionResult } from "../types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

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
    <>
      <Table>
        <TableCaption> CPF Account Type Distribution</TableCaption>
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
                <TableCell key={name} className="text-center">
                  {formatCurrency(value)}
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
      {/*<DistributionPieChart*/}
      {/*  data={distributionResults}*/}
      {/*  className="hidden md:block"*/}
      {/*/>*/}
    </>
  );
};

export default DistributionView;
