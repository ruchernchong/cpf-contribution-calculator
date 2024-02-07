import { Fragment } from "react";
import { formatCurrency, formatPercentage } from "../lib/format";
import { useAppSelector } from "../lib/hooks";
import { CPF_ADDITIONAL_WAGE_CEILING } from "../config";

export const CalculatedResult = () => {
  const { contributionRate } = useAppSelector(
    ({ incomeCeiling }) => incomeCeiling
  );
  const { monthlyGrossIncome } = useAppSelector(({ setting }) => setting);
  const { ageGroup } = useAppSelector(({ userInfo }) => userInfo);
  const { contributionResult } = useAppSelector(({ result }) => result);

  const annualWage = monthlyGrossIncome * 12;

  return (
    <div className="flex flex-auto flex-col gap-y-2">
      <div className="flex justify-between text-xl">
        <div>Age Group</div>
        <div>{ageGroup.description}</div>
      </div>
      <div className="flex justify-between text-xl">
        <div>Gross income</div>
        <div>{formatCurrency(monthlyGrossIncome)}</div>
      </div>
      {contributionResult && (
        <Fragment>
          <div className="flex justify-between text-xl text-teal-600">
            <div>
              Your contribution ({formatPercentage(contributionRate.employee)})
            </div>
            <div>
              {formatCurrency(contributionResult.contribution.employee)}
            </div>
          </div>
          <div className="flex justify-between text-xl">
            <div>
              Take home income
              <div className="text-sm italic text-gray-600">
                Excluding other contributions like donations, expense claims,
                and etc...
              </div>
            </div>
            <div>{formatCurrency(contributionResult.afterCpfContribution)}</div>
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
          <div className="flex justify-between gap-x-4 text-xl text-teal-600">
            <div>
              Company&apos;s contribution (
              {formatPercentage(contributionRate.employer)})
            </div>
            <div>
              {formatCurrency(contributionResult.contribution.employer)}
            </div>
          </div>
          <div className="flex justify-between text-xl text-teal-600">
            <div>Total CPF contribution</div>
            <div>
              {formatCurrency(
                contributionResult.contribution.totalContribution
              )}
            </div>
          </div>
          {annualWage < CPF_ADDITIONAL_WAGE_CEILING && (
            <div className="flex justify-between gap-x-4 text-xl text-teal-600">
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
        </Fragment>
      )}
    </div>
  );
};
