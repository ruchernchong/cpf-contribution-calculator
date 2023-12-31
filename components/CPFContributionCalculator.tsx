"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { CalculatedResult } from "./CalculatedResult";
import { DistributionView } from "./DistributionView";
import { FAQ } from "./FAQ";
import { UserInput } from "./UserInput";
import { faqs } from "../config";
import { ageGroups, cpfIncomeCeilings } from "../data";
import { calculateCpfContribution } from "../lib/calculateCpfContribution";
import { convertBirthDateToAge } from "../lib/convertBirthDateToAge";
import { resetData, updateData } from "../lib/features/data/dataSlice";
import { findAgeGroup } from "../lib/findAgeGroup";
import { findLatestIncomeCeilingDate } from "../lib/findLatestIncomeCeilingDate";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { formatCurrency, formatDate } from "../lib/format";
import { formatDateInput } from "../utils/formatDateInput";
import {
  AgeGroup,
  ContributionRate,
  ComputedResult,
  CPFIncomeCeiling,
  DistributionResult,
} from "../types";

export const CPFContributionCalculator = () => {
  const dispatch = useAppDispatch();
  const shouldStoreInput = useAppSelector(({ data }) => data.shouldStoreInput);
  const monthlyGrossIncome = useAppSelector(
    ({ data }) => data.monthlyGrossIncome,
  );
  const birthDate = useAppSelector(({ data }) => data.birthDate);

  const latestIncomeCeilingDate =
    findLatestIncomeCeilingDate(cpfIncomeCeilings);
  const [effectiveDate, setEffectiveDate] = useState<string>(
    latestIncomeCeilingDate,
  );
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(ageGroups[0]);
  const [contributionRate, setContributionRate] = useState<ContributionRate>(
    ageGroup.contributionRate,
  );

  const latestIncomeCeiling = cpfIncomeCeilings.find(
    ({ effectiveDate }) => effectiveDate === latestIncomeCeilingDate,
  ) as CPFIncomeCeiling;
  const [incomeCeilingOnSelectedYear, setIncomeCeilingOnSelectedYear] =
    useState<CPFIncomeCeiling>(latestIncomeCeiling);
  const [selectedAge, setSelectedAge] = useState<number>();

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

  useEffect(() => {
    if (!shouldStoreInput) {
      dispatch(resetData());
    }
  }, []);

  const distributionResults: DistributionResult[] = Object.entries(
    contributionResult.distribution,
  ).map(([name, value]) => ({ name, value }));

  const handleBirthDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawInput = event.target.value;
    const formattedBirthDate = formatDateInput(rawInput, birthDate);
    const age = convertBirthDateToAge(formattedBirthDate);

    setSelectedAge(age);
    dispatch(updateData({ birthDate: formattedBirthDate }));
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
              {formatCurrency(incomeCeilingOnSelectedYear.ceilingThreshold)}
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
              dispatch(updateData({ shouldStoreInput: e.target.checked }))
            }
            onEffectiveDateChange={(e) => setEffectiveDate(e.target.value)}
            onGrossIncomeChange={(e) =>
              dispatch(
                updateData({ monthlyGrossIncome: parseFloat(e.target.value) }),
              )
            }
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
