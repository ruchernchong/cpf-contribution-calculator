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
import {
  AgeGroup,
  ContributionRate,
  ComputedResult,
  CPFIncomeCeiling,
  DistributionResult,
} from "../types";

type StoredData = {
  shouldStoreInput: boolean;
  monthlyGrossIncome: number;
  birthDate: string;
};

export const CPFContributionCalculator = () => {
  const latestIncomeCeilingDate =
    findLatestIncomeCeilingDate(cpfIncomeCeilings);
  const [effectiveDate, setEffectiveDate] = useState<string>(
    latestIncomeCeilingDate,
  );
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(ageGroups[0]);
  const [contributionRate, setContributionRate] = useState<ContributionRate>(
    ageGroup.contributionRate,
  );

  const localStorageInitialValue: StoredData = {
    shouldStoreInput: false,
    monthlyGrossIncome: 0,
    birthDate: "",
  };
  const [dataFromLocalStorage, setDataFromLocalStorage] =
    useLocalStorage<StoredData>("data", localStorageInitialValue);
  const [shouldStoreInput, setShouldStoreInput] = useState<boolean>(false);
  const [monthlyGrossIncome, setMonthlyGrossIncome] = useState<number>(
    dataFromLocalStorage.monthlyGrossIncome || 0,
  );
  const [birthDate, setBirthDate] = useState<string>(
    dataFromLocalStorage.birthDate,
  );
  const latestIncomeCeiling = cpfIncomeCeilings.find(
    ({ effectiveDate }) => effectiveDate === latestIncomeCeilingDate,
  ) as CPFIncomeCeiling;
  const [incomeCeilingOnSelectedYear, setIncomeCeilingOnSelectedYear] =
    useState<CPFIncomeCeiling>(latestIncomeCeiling);
  const [selectedAge, setSelectedAge] = useState<number>();

  useEffect(() => {
    setShouldStoreInput(dataFromLocalStorage.shouldStoreInput);
    setMonthlyGrossIncome(dataFromLocalStorage.monthlyGrossIncome);
    setBirthDate(dataFromLocalStorage.birthDate);
  }, []);

  useEffect(() => {
    if (!shouldStoreInput) {
      setDataFromLocalStorage(localStorageInitialValue);
    } else {
      setDataFromLocalStorage({
        ...dataFromLocalStorage,
        shouldStoreInput,
        monthlyGrossIncome,
        birthDate,
      });
    }
  }, [birthDate, monthlyGrossIncome, shouldStoreInput]);

  useEffect(() => {
    if (selectedAge) {
      const ageGroup = findAgeGroup(selectedAge);
      setAgeGroup(ageGroup);
      setContributionRate(ageGroup?.contributionRate || 0);
    }

    const incomeCeilingOnSelectedYear = cpfIncomeCeilings.find(
      ({ effectiveDate }) => effectiveDate === effectiveDate,
    )!;
    setIncomeCeilingOnSelectedYear(incomeCeilingOnSelectedYear);
  }, [birthDate, effectiveDate, cpfIncomeCeilings]);

  const contributionResult: ComputedResult = calculateCpfContribution(
    monthlyGrossIncome,
    effectiveDate,
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
            Estimating contributions from {formatDate(effectiveDate)}
          </p>
        </div>
        <div className="mb-8 gap-x-8 md:flex">
          <UserInput
            birthDate={birthDate}
            monthlyGrossIncome={monthlyGrossIncome}
            currentYear={latestIncomeCeilingDate}
            shouldStoreInput={shouldStoreInput}
            onBirthDateChange={handleBirthDateChange}
            onShouldStoreInputChange={(e) =>
              setShouldStoreInput(e.target.checked)
            }
            onEffectiveDateChange={(e) => setEffectiveDate(e.target.value)}
            onGrossIncomeChange={(e) => {
              setMonthlyGrossIncome(parseFloat(e.target.value));
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
