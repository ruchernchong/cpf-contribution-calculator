import { useEffect, useState } from "react";
import { CPFDistribution } from "./components/CPFDistribution";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { SelectBox } from "./components/SelectBox";
import { CPF_ADDITIONAL_WAGE_CEILING, faqs } from "./config";
import { ageGroups, cpfIncomeCeilings } from "./data";
import { useDarkMode } from "./hooks/useDarkMode";
import { calculateCpfContribution } from "./lib/calculateCpfContribution";
import { findAgeGroup } from "./lib/findAgeGroup";
import { formatCurrency, formatPercentage } from "./lib/format";
import type { AgeGroup, ContributionRate, CPFIncomeCeiling } from "./types";
import { convertBirthDateToAge } from "./lib/convertBirthDateToAge";

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

  const dataFromLocalStorage = JSON.parse(
    localStorage.getItem("data") as string
  );
  const [grossIncome, setGrossIncome] = useState<number>(
    dataFromLocalStorage?.grossIncome || 0
  );
  const [incomeCeilingOnSelectedYear, setIncomeCeilingOnSelectedYear] =
    useState<CPFIncomeCeiling>();
  const [storeInputInLocalStorage, setStoreInputInLocalStorage] =
    useState<boolean>(dataFromLocalStorage?.storeInput || false);
  const [birthDate, setBirthDate] = useState<string>(
    dataFromLocalStorage?.birthDate
  );
  const [selectedAge, setSelectedAge] = useState<number>();

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

  useEffect(() => {
    const age = convertBirthDateToAge(birthDate);
    setSelectedAge(age);
  }, [birthDate]);

  let result;
  if (currentIncomeCeiling && grossIncome) {
    result = calculateCpfContribution(grossIncome, currentIncomeCeiling, {
      ageGroup,
    });
  }

  let distributionRate;
  if (result) {
    distributionRate = Object.entries(result.distribution).map(
      ([name, value]) => ({ name, value })
    );
  }

  const annualWage = grossIncome * 12;

  useEffect(() => {
    if (storeInputInLocalStorage) {
      localStorage.setItem(
        "data",
        JSON.stringify({
          storeInput: storeInputInLocalStorage,
          grossIncome,
          birthDate,
        })
      );
    } else {
      localStorage.setItem(
        "data",
        JSON.stringify({ storeInput: storeInputInLocalStorage, grossIncome: 0 })
      );
    }
  }, [birthDate, grossIncome, storeInputInLocalStorage]);

  const handleBirthDateChange = (e: { target: { value: string } }) => {
    const birthdate = e.target.value;
    const age = convertBirthDateToAge(birthdate);

    setBirthDate(birthdate);
    setSelectedAge(age);
  };

  useEffect(() => {
    if (selectedAge) {
      const ageGroup = findAgeGroup(selectedAge) as AgeGroup;
      setAgeGroup(ageGroup);
    }
  }, [selectedAge]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="prose prose-invert mx-auto flex w-full max-w-6xl grow flex-col px-4 py-16 md:px-8">
        <div className="text-center">
          <h1>CPF Contribution Calculator</h1>
          <h2>
            A calculator to compute CPF contributions after the 2023 income
            ceiling changes following Ministry of Finance announcement at the
            Singapore Budget 2023
          </h2>
          <h3>Current CPF Income Ceiling</h3>
          {incomeCeilingOnSelectedYear && (
            <p className="text-2xl text-red-300">
              {formatCurrency(incomeCeilingOnSelectedYear.ceiling)}
            </p>
          )}
        </div>
        <div className="gap-x-4 md:flex">
          <div className="flex flex-col gap-y-2 md:w-1/3">
            <input
              type="text"
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="MM/YYYY"
              className="rounded-lg p-2 text-neutral-900"
              maxLength={7}
              defaultValue={birthDate}
              onChange={handleBirthDateChange}
            />
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
              className="rounded-lg p-2 text-neutral-900"
              defaultValue={grossIncome || undefined}
              onChange={(e) => setGrossIncome(Number(e.target.value))}
            />
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                id="store-data"
                defaultChecked={storeInputInLocalStorage}
                onChange={(e) => setStoreInputInLocalStorage(e.target.checked)}
              />
              <label htmlFor="store-data">Store input on this browser?</label>
            </div>
            <div className="mb-4 text-xs italic text-red-300">
              By ticking the above checkbox, the input will be stored on your
              own browser. No data are being stored on any servers.
            </div>
          </div>
          <div className="flex flex-auto flex-col gap-y-2">
            {Boolean(grossIncome) && (
              <div className="flex justify-between text-xl">
                <div>Gross income</div>
                <div>{formatCurrency(grossIncome as number)}</div>
              </div>
            )}
            {result && (
              <>
                <div className="flex justify-between text-xl text-green-600">
                  <div>
                    Your contribution (
                    {formatPercentage(contributionRate.employee)})
                  </div>
                  <div>{formatCurrency(result.contribution.employee)}</div>
                </div>
                <div className="flex justify-between text-xl">
                  <div>
                    Take home income
                    <div className="text-sm italic text-neutral-400">
                      Excluding other contributions like donations, expense
                      claims, and etc...
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
                    <div>
                      Remaining Additional Wage (AW) for CPF contribution
                    </div>
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
        </div>
        <CPFDistribution data={distributionRate} />
        <FAQ items={faqs} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
