"use client";
import React, { useEffect } from "react";
import { formatCurrency, formatDate } from "../lib/format";
import { UserInput } from "../components/UserInput";
import faqs from "@/data/faq.json";
import { CalculatedResult } from "../components/CalculatedResult";
import DistributionView from "../components/DistributionView";
import { FAQ } from "../components/FAQ";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { cpfIncomeCeilings } from "../data";
import { updateIncomeCeiling } from "../lib/features/incomeCeiling/incomeCeilingSlice";
import { updateResult } from "../lib/features/result/resultSlice";
import { calculateCpfContribution } from "../lib/calculateCpfContribution";
import { findAgeGroup } from "../lib/findAgeGroup";
import { convertBirthDateToAge } from "../lib/convertBirthDateToAge";
import { updateUserInfo } from "../lib/features/userInfo/userInfoSlice";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { latestIncomeCeilingDate } = useAppSelector(
    ({ incomeCeiling }) => incomeCeiling
  );
  const { birthDate, monthlyGrossIncome } = useAppSelector(
    ({ setting }) => setting
  );
  const { ageGroup } = useAppSelector(({ userInfo }) => userInfo);
  const { contributionResult, distributionResults } = useAppSelector(
    ({ result }) => result
  );

  const latestIncomeCeiling = cpfIncomeCeilings.find(
    (ceiling) => ceiling.effectiveDate === latestIncomeCeilingDate
  );

  useEffect(() => {
    const age = convertBirthDateToAge(birthDate);
    dispatch(updateUserInfo({ ageGroup: findAgeGroup(age) }));
  }, [birthDate, dispatch]);

  useEffect(() => {
    dispatch(
      updateIncomeCeiling({ contributionRate: ageGroup.contributionRate })
    );
  }, [ageGroup.contributionRate, dispatch]);

  useEffect(() => {
    dispatch(
      updateResult({
        contributionResult: calculateCpfContribution(
          monthlyGrossIncome,
          latestIncomeCeilingDate,
          {
            ageGroup,
          }
        ),
      })
    );
  }, [ageGroup, monthlyGrossIncome, latestIncomeCeilingDate, dispatch]);

  useEffect(() => {
    if (contributionResult) {
      dispatch(
        updateResult({
          distributionResults: Object.entries(
            contributionResult.distribution
          ).map(([name, value]) => ({
            name,
            value,
          })),
        })
      );
    }
  }, [contributionResult, dispatch]);

  return (
    <div className="prose mx-auto flex max-w-6xl grow flex-col px-4 py-16">
      <div className="text-center">
        <h1>CPF Contribution Calculator</h1>
        <h2>
          A calculator to compute CPF contributions after the 2023 income
          ceiling changes following Ministry of Finance announcement at the
          Singapore Budget 2023
        </h2>
        <h3>Current CPF Income Ceiling</h3>
        {latestIncomeCeiling && (
          <p className="text-4xl font-extrabold text-red-600">
            {formatCurrency(latestIncomeCeiling.ceilingThreshold)}
          </p>
        )}
        <p className="text-2xl">
          Estimating contributions from {formatDate(latestIncomeCeilingDate)}
        </p>
      </div>
      <div className="mb-8 gap-x-8 md:flex">
        <UserInput />
        <CalculatedResult />
      </div>
      {distributionResults && (
        <DistributionView distributionResults={distributionResults} />
      )}
      <FAQ items={faqs} />
    </div>
  );
};

export default HomePage;
