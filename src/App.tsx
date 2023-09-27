import { useEffect, useState } from "react";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { SelectBox } from "./components/SelectBox";
import { calculateCpfContribution } from "./lib/calculateCpfContribution";
import { ageGroups, cpfIncomeCeilings } from "./data";
import { useDarkMode } from "./hooks/useDarkMode";

import { CPF_ADDITIONAL_WAGE_CEILING, faqs } from "./config";
import type { AgeGroup, ContributionRate, CPFIncomeCeiling } from "./types";
import { formatCurrency, formatPercentage } from "./lib/format";

const App = () => {
  useDarkMode();

  const currentYear = cpfIncomeCeilings.find(({ current }) =>
    Boolean(current)
  )?.year;

  const [currentIncomeCeiling, setCurrentIncomeCeiling] = useState<
    string | undefined
  >(currentYear);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(ageGroups[0]);
  const [contributionRate, setContributionRate] = useState<ContributionRate>(
    ageGroup.contributionRate
  );
  const [grossIncome, setGrossIncome] = useState<number>(0);
  const [incomeCeilingOnSelectedYear, setIncomeCeilingOnSelectedYear] =
    useState<CPFIncomeCeiling>();

  useEffect(() => {
    const incomeCeilingOnSelectedYear = cpfIncomeCeilings.find(
      ({ year }) => year === currentIncomeCeiling
    );
    setIncomeCeilingOnSelectedYear(incomeCeilingOnSelectedYear);
  }, [currentIncomeCeiling]);

  useEffect(() => {
    if (ageGroup) {
      setContributionRate(ageGroup.contributionRate);
    }
  }, [ageGroup]);

  let result;
  if (currentIncomeCeiling && grossIncome) {
    result = calculateCpfContribution(grossIncome, currentIncomeCeiling, {
      ageGroup,
    });
  }

  const annualWage = grossIncome * 12;

  return (
    <div className="flex min-h-screen flex-col text-neutral-50">
      <div className="prose prose-invert mx-auto flex w-full max-w-6xl grow flex-col justify-center px-4 py-16 md:px-8">
        <h1 className="text-center">CPF Contribution Calculator</h1>
        <h2 className="text-center">Current CPF Income Ceiling</h2>
        {incomeCeilingOnSelectedYear && (
          <p className="text-center text-2xl text-red-300">
            {formatCurrency(incomeCeilingOnSelectedYear.ceiling)}
          </p>
        )}
        <div className="flex flex-col items-center">
          <SelectBox
            name="age-group"
            id="age-group"
            onChange={(e) => setAgeGroup(ageGroups[Number(e.target.value)])}
          >
            {ageGroups.map(({ description }, index) => {
              return (
                <option key={index} value={index}>
                  {description}
                </option>
              );
            })}
          </SelectBox>
          <SelectBox
            name="cpf-income-ceiling"
            id="cpf-income-ceiling"
            defaultValue={currentYear}
            onChange={(e) => setCurrentIncomeCeiling(e.target.value)}
          >
            {cpfIncomeCeilings.map(({ year }) => {
              if (year === "SEPT2023") {
                return (
                  <option key={year} value={year}>
                    September 2023
                  </option>
                );
              }

              return (
                <option key={year} value={year}>
                  January {year}
                </option>
              );
            })}
          </SelectBox>
          <input
            type="number"
            inputMode="decimal"
            pattern="\d*"
            placeholder="Gross Income e.g. 10000"
            className="mb-2 w-full rounded-lg p-2 text-neutral-900 md:w-1/3"
            onChange={(e) => setGrossIncome(Number(e.target.value))}
          />
          <div className="mb-4 italic text-red-300">
            This is for illustration purposes only. No data are being stored.
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          {Boolean(grossIncome) && (
            <div className="flex justify-between text-xl md:text-2xl">
              <div>Gross income</div>
              <div>{formatCurrency(grossIncome as number)}</div>
            </div>
          )}
          {result && (
            <>
              <div className="flex justify-between text-xl text-green-600 md:text-2xl">
                <div>
                  Your contribution (
                  {formatPercentage(contributionRate.employee)})
                </div>
                <div>{formatCurrency(result.contribution.employee)}</div>
              </div>
              <div className="flex justify-between text-xl md:text-2xl">
                <div>Take home income</div>
                <div>{formatCurrency(result.afterCpfContribution)}</div>
              </div>
              {/*{!!incomeDifference && (*/}
              {/*  <div className="flex justify-between text-xl md:text-2xl">*/}
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
              <hr />
              <div className="flex justify-between gap-x-4 text-xl text-green-600 md:text-2xl">
                <div>
                  Company's contribution (
                  {formatPercentage(contributionRate.employer)})
                </div>
                <div>{formatCurrency(result.contribution.employer)}</div>
              </div>
              <hr />
              <div className="flex justify-between text-xl text-blue-500 md:text-2xl">
                <div>Total CPF contribution</div>
                <div>{formatCurrency(result.contribution.total)}</div>
              </div>
              {annualWage < CPF_ADDITIONAL_WAGE_CEILING && (
                <div className="flex justify-between gap-x-4 text-xl text-blue-500 md:text-2xl">
                  <div>Remaining Additional Wage (AW) for CPF contribution</div>
                  <div>
                    {formatCurrency(CPF_ADDITIONAL_WAGE_CEILING - annualWage)}
                  </div>
                </div>
              )}
              {/*<div>*/}
              {/*{!!ageGroup.contributionRateDifference && (*/}
              {/*  <div className="flex justify-between text-xl md:text-2xl">*/}
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
        <FAQ items={faqs} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
