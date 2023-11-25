import { formatCurrency, formatPercentage } from "../lib/format";
import { CPF_ADDITIONAL_WAGE_CEILING } from "../config";
import type { ContributionRate, ComputedResult } from "../types";

type ContributionResultProps = {
  result: ComputedResult;
  contributionRate: ContributionRate;
  monthlyGrossIncome: number;
};

export const CalculatedResult = ({
  result,
  contributionRate,
  monthlyGrossIncome,
}: ContributionResultProps) => {
  const annualWage = monthlyGrossIncome * 12;

  return (
    <div className="flex flex-auto flex-col gap-y-2">
      {Boolean(monthlyGrossIncome) && (
        <div className="flex justify-between text-xl">
          <div>Gross income</div>
          <div>{formatCurrency(monthlyGrossIncome)}</div>
        </div>
      )}
      {result && (
        <>
          <div className="flex justify-between text-xl text-green-600">
            <div>
              Your contribution ({formatPercentage(contributionRate.employee)})
            </div>
            <div>{formatCurrency(result.contribution.employee)}</div>
          </div>
          <div className="flex justify-between text-xl">
            <div>
              Take home income
              <div className="text-sm italic text-neutral-400">
                Excluding other contributions like donations, expense claims,
                and etc...
              </div>
            </div>
            <div>{formatCurrency(result.afterCpfContribution)}</div>
          </div>
          {/*{!!incomeDifference && (*/}
          {/*  <div className="flex justify-between text-xl">*/}
          {/*    <div>Before September 2023</div>*/}
          {/*    <div className="flex flex-col items-end">*/}
          {/*      {formatCurrency(incomeAfterCpfBeforeSep2023)}*/}
          {/*      {*/}
          {/*        <span className="text-sm italic text-red-600">*/}
          {/*          ({formatCurrency(incomeDifference)} /{" "}*/}
          {/*          {new Intl.NumberFormat("en-SG", {*/}
          {/*            style: "percent",*/}
          {/*          }).format(*/}
          {/*            incomeDifference / incomeAfterCpfBeforeSep2023*/}
          {/*          )}*/}
          {/*          )*/}
          {/*        </span>*/}
          {/*      }*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*)}*/}
          <hr className="my-4" />
          <div className="flex justify-between gap-x-4 text-xl text-green-600">
            <div>
              Company's contribution (
              {formatPercentage(contributionRate.employer)})
            </div>
            <div>{formatCurrency(result.contribution.employer)}</div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-xl text-blue-500">
            <div>Total CPF contribution</div>
            <div>{formatCurrency(result.contribution.total)}</div>
          </div>
          {annualWage < CPF_ADDITIONAL_WAGE_CEILING && (
            <div className="flex justify-between gap-x-4 text-xl text-blue-500">
              <div>Remaining Additional Wage (AW) for CPF contribution</div>
              <div>
                {formatCurrency(CPF_ADDITIONAL_WAGE_CEILING - annualWage)}
              </div>
            </div>
          )}
          {/*<div>*/}
          {/*{!!ageGroup.contributionRateDifference && (*/}
          {/*  <div className="flex justify-between text-xl">*/}
          {/*<div>Before September 2023</div>*/}
          {/*<div className="flex flex-col items-end">*/}
          {/*{formatCurrency(totalCpfContributionBeforeSep2023)}*/}
          {/*<span className="text-sm italic text-green-600">*/}
          {/*  ({formatCurrency(ageGroup.contributionRateDifference)} /{" "}*/}
          {/*  {new Intl.NumberFormat("en-SG", {*/}
          {/*    style: "percent",*/}
          {/*  }).format(*/}
          {/*    ageGroup.contributionRateDifference /*/}
          {/*      totalCpfContributionBeforeSep2023*/}
          {/*  )}*/}
          {/*  )*/}
          {/*</span>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*)}*/}
          {/*</div>*/}
        </>
      )}
    </div>
  );
};
