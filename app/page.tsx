"use client";
import React from "react";
import { useAtomValue } from "jotai";
import { latestIncomeCeilingDateAtom } from "@/atoms/incomeCeilingAtom";
import {
  distributionResultsAtom,
  hasCpfContributionAtom,
} from "@/atoms/resultAtom";
import { formatCurrency, formatDate } from "@/lib/format";
import { UserInput } from "@/components/UserInput";
import faqs from "@/data/faq.json";
import { CalculatedResult } from "@/components/CalculatedResult";
import DistributionView from "../components/DistributionView";
import { FAQ } from "@/components/FAQ";
import CPFYearSlider from "../components/CPFYearSlider";
import { selectedYearAtom, yearCeilingsAtom } from "@/atoms/yearSliderAtom";

const HomePage = () => {
  const hasCpfContribution = useAtomValue(hasCpfContributionAtom);
  const distributionResults = useAtomValue(distributionResultsAtom);
  const latestIncomeCeilingDate = useAtomValue(latestIncomeCeilingDateAtom);
  const selectedYear = useAtomValue(selectedYearAtom);
  const yearCeilings = useAtomValue(yearCeilingsAtom);
  const currentCeiling = yearCeilings[selectedYear];

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-16">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">CPF Contribution Calculator</h1>
        <p className="mx-auto max-w-3xl text-xl text-gray-600">
          A calculator to compute CPF contributions after the 2023 income
          ceiling changes following Ministry of Finance announcement at the
          Singapore Budget 2023
        </p>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Current CPF Income Ceiling</h2>
          <p className="text-4xl font-extrabold text-red-600">
            {formatCurrency(currentCeiling)}
          </p>
          <p className="text-xl text-gray-600">
            Estimating contributions from {formatDate(latestIncomeCeilingDate)}
          </p>
        </div>
      </div>

      <CPFYearSlider />

      <div className="grid gap-8 md:grid-cols-2">
        <UserInput />
        <CalculatedResult />
      </div>

      {hasCpfContribution && (
        <DistributionView distributionResults={distributionResults} />
      )}

      <FAQ items={faqs} />
    </div>
  );
};

export default HomePage;
