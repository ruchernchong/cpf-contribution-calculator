import { formatCurrency, formatPercentage } from "../lib/format";
import type { DistributionResult } from "../types";
import { DistributionPieChart } from "./DistributionPieChart";

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
      <table className="auto text-center">
        <caption className="caption-bottom">
          Table: CPF Accounts Distribution
        </caption>
        <thead>
          <tr>
            {distributionResults.map(({ name, value }) => {
              const distributionPercent = formatPercentage(
                value / totalCpfContribution
              );

              return (
                <th key={name}>
                  <div>
                    {CPF_ACCOUNTS[name]} ({name})
                  </div>
                  <div>({distributionPercent})</div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {distributionResults.map(({ name, value }) => {
              return <td key={name}>{formatCurrency(value)}</td>;
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
