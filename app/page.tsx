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
    <div className="prose mx-auto flex max-w-6xl grow flex-col px-4 py-16">
      <div className="text-center">
        <h1>CPF Contribution Calculator</h1>
        <h2>
          A calculator to compute CPF contributions after the 2023 income
          ceiling changes following Ministry of Finance announcement at the
          Singapore Budget 2023
        </h2>
        <h3>Current CPF Income Ceiling</h3>
        <p className="text-4xl font-extrabold text-red-600">
          {formatCurrency(currentCeiling)}
        </p>
        <p className="text-2xl">
          Estimating contributions from {formatDate(latestIncomeCeilingDate)}
        </p>
      </div>

      <CPFYearSlider />

      <div className="mb-8 gap-x-8 md:flex">
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
