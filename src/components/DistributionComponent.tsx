import { DistributionPieChart } from "./DistributionPieChart";
import { formatCurrency, formatPercentage } from "../lib/format";
import type { DistributionResult } from "../types";

type DistributionComponentProps = {
  distributionResults: DistributionResult[];
};

type CPFAccount = Record<string, string>;

const CPF_ACCOUNTS: CPFAccount = {
  OA: "Ordinary Account",
  SA: "Special Account",
  MA: "MediSave Account",
};

export const DistributionComponent = ({
  distributionResults,
}: DistributionComponentProps) => {
  const totalCpfContribution = distributionResults.reduce((accum, curr) => {
    return accum + curr.value;
  }, 0);

  return (
    <>
      <table className="auto border border-neutral-400 text-center">
        <thead className="bg-neutral-800">
          <tr>
            {distributionResults.map(({ name, value }) => {
              return (
                <th key={name} className="border border-neutral-400 p-4">
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
                <td key={name} className="border border-neutral-400 p-4">
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
    </>
  );
};
