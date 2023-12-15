import { Fragment } from "react";
import dynamic from "next/dynamic";
import { formatCurrency, formatPercentage } from "../lib/format";
import type { DistributionResult } from "../types";

const DistributionPieChart = dynamic(() => import("./DistributionPieChart"));

type DistributionComponentProps = {
  distributionResults: DistributionResult[];
};

type CPFAccount = Record<string, string>;

const CPF_ACCOUNTS: CPFAccount = {
  OA: "Ordinary Account",
  SA: "Special Account",
  MA: "MediSave Account",
};

export const DistributionView = ({
  distributionResults,
}: DistributionComponentProps) => {
  const totalCpfContribution = distributionResults.reduce((accum, curr) => {
    return accum + curr.value;
  }, 0);

  return (
    <Fragment>
      <table className="auto border text-center">
        <thead className="bg-gray-200 dark:bg-gray-800">
          <tr>
            {distributionResults.map(({ name, value }) => {
              return (
                <th key={name} className="border p-4 dark:border-gray-600">
                  <div>
                    {CPF_ACCOUNTS[name]} ({name})
                  </div>
                  <div>({formatPercentage(value / totalCpfContribution)})</div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {distributionResults.map(({ name, value }) => {
              return (
                <td key={name} className="border p-4 dark:border-gray-600">
                  {formatCurrency(value)}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
      <DistributionPieChart
        data={distributionResults}
        className="hidden md:block"
      />
    </Fragment>
  );
};

export default DistributionView;
