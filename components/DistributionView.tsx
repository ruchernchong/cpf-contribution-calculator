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
    <>
      <div className="items-center gap-x-8 md:flex">
        <div className="flex md:basis-1/3">
          <table className="auto">
            <caption className="caption-top font-semibold">
              CPF Account Types Distribution
            </caption>
            {/*<thead className="bg-teal-600">*/}
            {/*  <tr>*/}
            {/*    {distributionResults.map(({ name, value }) => {*/}
            {/*      return (*/}
            {/*        <th*/}
            {/*          key={name}*/}
            {/*          className="border border-gray-600 p-4 text-gray-50"*/}
            {/*        >*/}
            {/*          <div>*/}
            {/*            {CPF_ACCOUNTS[name]} ({name})*/}
            {/*          </div>*/}
            {/*          <div>*/}
            {/*            ({formatPercentage(value / totalCpfContribution)})*/}
            {/*          </div>*/}
            {/*        </th>*/}
            {/*      );*/}
            {/*    })}*/}
            {/*  </tr>*/}
            {/*</thead>*/}
            {/*<tbody>*/}
            {/*  <tr>*/}
            {/*    {distributionResults.map(({ name, value }) => {*/}
            {/*      return (*/}
            {/*        <td key={name} className="border border-gray-600 p-4">*/}
            {/*          {formatCurrency(value)}*/}
            {/*        </td>*/}
            {/*      );*/}
            {/*    })}*/}
            {/*  </tr>*/}
            {/*</tbody>*/}
            <tbody>
              {distributionResults.map(({ name, value }) => {
                return (
                  <tr key={name}>
                    <td className="border bg-teal-600 p-4 text-gray-50">
                      <div>
                        {CPF_ACCOUNTS[name]} ({name})
                      </div>
                      <div>
                        ({formatPercentage(value / totalCpfContribution)})
                      </div>
                    </td>
                    <td key={name} className="border p-4 align-middle">
                      {formatCurrency(value)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <DistributionPieChart
          data={distributionResults}
          className="hidden md:block"
        />
      </div>
    </>
  );
};

export default DistributionView;
