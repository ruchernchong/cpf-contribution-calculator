"use client";

import React, { useEffect, useState } from "react";
import { CalculatedResult } from "./CalculatedResult";
import { DistributionView } from "./DistributionView";
import { FAQ } from "./FAQ";
import { UserInput } from "./UserInput";
import { faqs } from "../config";
import { ageGroups, cpfIncomeCeilings } from "../data";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { calculateCpfContribution } from "../lib/calculateCpfContribution";
import { convertBirthDateToAge } from "../lib/convertBirthDateToAge";
import { findAgeGroup } from "../lib/findAgeGroup";
import { findLatestIncomeCeilingDate } from "../lib/findLatestIncomeCeilingDate";
import { formatCurrency, formatDate } from "../lib/format";
import type {
  AgeGroup,
  ContributionRate,
  ComputedResult,
  CPFIncomeCeiling,
  DistributionResult,
} from "../types";

export const CPFContributionCalculator = () => {
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
    useState<boolean>(false);
  const [monthlyGrossIncome, setMonthlyGrossIncome] = useState<number>(0);
  const [birthDate, setBirthDate] = useState<string>("");

  const [incomeCeilingOnSelectedYear, setIncomeCeilingOnSelectedYear] =
    useState<CPFIncomeCeiling | undefined>();
  const [selectedAge, setSelectedAge] = useState<number | undefined>(undefined);

  useEffect(() => {
    setStoreInputInLocalStorage(dataFromLocalStorage.storeInput);
    setMonthlyGrossIncome(dataFromLocalStorage.monthlyGrossIncome);
    setBirthDate(dataFromLocalStorage.birthDate);
  }, []);

  useEffect(() => {
    if (!storeInputInLocalStorage) {
      setDataFromLocalStorage(localStorageInitialValue);
    } else {
      setDataFromLocalStorage({
        ...dataFromLocalStorage,
        storeInput: storeInputInLocalStorage,
        monthlyGrossIncome,
        birthDate,
      });
    }
  }, [birthDate, monthlyGrossIncome, storeInputInLocalStorage]);

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

  const contributionResult: ComputedResult = calculateCpfContribution(
    monthlyGrossIncome,
    currentYearIncomeCeiling,
    {
      ageGroup,
    },
  );

  const distributionResults: DistributionResult[] = Object.entries(
    contributionResult.distribution,
  ).map(([name, value]) => ({
    name,
    value,
  }));

  const handleBirthDateChange = (event: { target: { value: string } }) => {
    let inputValue = event.target.value;

    if (inputValue.length === 2 && birthDate.length === 3) {
      inputValue = inputValue.slice(0, 1) + "/";
    } else {
      inputValue = inputValue.replace(/[^0-9]/g, "");

      if (inputValue.length > 2) {
        inputValue = inputValue.substring(0, 2) + "/" + inputValue.substring(2);
      }
    }

    const age = convertBirthDateToAge(inputValue);

    setBirthDate(inputValue);
    setSelectedAge(age);
  };

  return (
    <>
      <div className="prose mx-auto flex max-w-6xl grow flex-col px-4 py-16">
        <div className="text-center">
          <h1>CPF Contribution Calculator</h1>
          <h2>
            A calculator to compute CPF contributions after the 2023 income
            ceiling changes following Ministry of Finance announcement at the
            Singapore Budget 2023
          </h2>
          <h3>Current CPF Income Ceiling</h3>
          {incomeCeilingOnSelectedYear && (
            <p className="text-4xl font-extrabold text-red-600">
              {formatCurrency(incomeCeilingOnSelectedYear.ceiling)}
            </p>
          )}
          <p className="text-2xl">
            Estimating contributions from {formatDate(currentYearIncomeCeiling)}
          </p>
        </div>
        <div className="mb-8 gap-x-8 md:flex">
          <UserInput
            birthDate={birthDate}
            monthlyGrossIncome={monthlyGrossIncome}
            currentYear={latestIncomeCeiling}
            storeInputInLocalStorage={storeInputInLocalStorage}
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
            result={contributionResult}
            contributionRate={contributionRate}
            monthlyGrossIncome={monthlyGrossIncome}
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
