"use client";

import React, { useEffect, useState } from "react";
import { faqs } from "../config";
import { ageGroups, cpfIncomeCeilings } from "../data";
import { useDarkMode } from "../hooks/useDarkMode";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { calculateCpfContribution } from "../lib/calculateCpfContribution";
import { convertBirthDateToAge } from "../lib/convertBirthDateToAge";
import { findAgeGroup } from "../lib/findAgeGroup";
import { findLatestIncomeCeilingDate } from "../lib/findLatestIncomeCeilingDate";
import { formatCurrency, formatDate } from "../lib/format";
import { CalculatedResult } from "../components/CalculatedResult";
import { DistributionView } from "../components/DistributionView";
import { FAQ } from "../components/FAQ";
import { UserInput } from "../components/UserInput";
import type {
  AgeGroup,
  ContributionRate,
  ComputedResult,
  CPFIncomeCeiling,
  DistributionResult,
} from "../types";

const HomePage = () => {
  useDarkMode();

  const latestIncomeCeiling = findLatestIncomeCeilingDate(cpfIncomeCeilings);
  const [currentYearIncomeCeiling, setCurrentYearIncomeCeiling] =
    useState<string>(latestIncomeCeiling);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(ageGroups[0]);
  const [contributionRate, setContributionRate] = useState<ContributionRate>(
    ageGroup.contributionRate,
  );

  const localStorageInitialValue = {
    storeInput: false,
    monthlyGrossIncome: null,
    birthDate: null,
  };
  const [dataFromLocalStorage, setDataFromLocalStorage] = useLocalStorage(
    "data",
    localStorageInitialValue,
  );
  const [storeInputInLocalStorage, setStoreInputInLocalStorage] =
    useState<boolean>();
  const [monthlyGrossIncome, setMonthlyGrossIncome] = useState<number>();
  const [birthDate, setBirthDate] = useState<string>();

  const [incomeCeilingOnSelectedYear, setIncomeCeilingOnSelectedYear] =
    useState<CPFIncomeCeiling>();
  const [selectedAge, setSelectedAge] = useState<number>(0);

  useEffect(() => {
    setStoreInputInLocalStorage(dataFromLocalStorage.storeInput);
    setMonthlyGrossIncome(dataFromLocalStorage.monthlyGrossIncome);
    setBirthDate(dataFromLocalStorage.birthDate);
  }, []);

  useEffect(() => {
    setDataFromLocalStorage({
      ...dataFromLocalStorage,
      storeInput: storeInputInLocalStorage,
      monthlyGrossIncome,
      birthDate,
    });
  }, [birthDate, monthlyGrossIncome, storeInputInLocalStorage]);

  useEffect(() => {
    if (!storeInputInLocalStorage) {
      setDataFromLocalStorage(localStorageInitialValue);
    }
  }, [storeInputInLocalStorage]);

  useEffect(() => {
    if (selectedAge) {
      const ageGroup = findAgeGroup(selectedAge);
      setAgeGroup(ageGroup);
      setContributionRate(ageGroup?.contributionRate || 0);
    }

    const incomeCeilingOnSelectedYear = cpfIncomeCeilings.find(
      ({ effectiveDate }) => effectiveDate === currentYearIncomeCeiling,
    )!;
    setIncomeCeilingOnSelectedYear(incomeCeilingOnSelectedYear);
  }, [birthDate, currentYearIncomeCeiling, cpfIncomeCeilings]);

  let contributionResult;
  if (monthlyGrossIncome) {
    contributionResult = calculateCpfContribution(
      monthlyGrossIncome,
      currentYearIncomeCeiling,
      {
        ageGroup,
      },
    );
  }

  const distributionResults: DistributionResult[] = contributionResult
    ? Object.entries(contributionResult.distribution).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  const handleBirthDateChange = (event: { target: { value: string } }) => {
    const birthdate = event.target.value;
    const age = convertBirthDateToAge(birthdate);

    setBirthDate(birthdate);
    setSelectedAge(age);
  };

  return (
    <>
      <div className="prose mx-auto flex w-full max-w-6xl grow flex-col px-4 py-16 dark:prose-invert md:px-8">
        <div className="text-center">
          <h1>CPF Contribution Calculator</h1>
          <h2>
            A calculator to compute CPF contributions after the 2023 income
            ceiling changes following Ministry of Finance announcement at the
            Singapore Budget 2023
          </h2>
          <h3>Current CPF Income Ceiling</h3>
          {incomeCeilingOnSelectedYear && (
            <p className="text-4xl font-extrabold text-red-600 dark:text-red-300">
              {formatCurrency(incomeCeilingOnSelectedYear.ceiling)}
            </p>
          )}
          <p className="text-2xl">
            Estimating contributions from {formatDate(currentYearIncomeCeiling)}
          </p>
        </div>
        <div className="gap-x-4 md:flex">
          <UserInput
            birthDate={birthDate as string}
            monthlyGrossIncome={monthlyGrossIncome as number}
            currentYear={latestIncomeCeiling}
            storeInputInLocalStorage={storeInputInLocalStorage as boolean}
            onBirthDateChange={handleBirthDateChange}
            onStoreInputInLocalStorageChange={(e) =>
              setStoreInputInLocalStorage(e.target.checked)
            }
            onCurrentIncomeCeilingChange={(e) =>
              setCurrentYearIncomeCeiling(e.target.value)
            }
            onGrossIncomeChange={(e) => {
              setMonthlyGrossIncome(parseFloat(e.target.value) || 0);
            }}
          />
          <CalculatedResult
            result={contributionResult as ComputedResult}
            contributionRate={contributionRate}
            monthlyGrossIncome={monthlyGrossIncome as number}
          />
        </div>
        {contributionResult && (
          <DistributionView distributionResults={distributionResults} />
        )}
        <FAQ items={faqs} />
      </div>
    </>
  );
};

export default HomePage;
