"use client";

import { useAtomValue } from "jotai";
import { Suspense } from "react";
import {
  distributionResultsAtom,
  hasCpfContributionAtom,
} from "@/atoms/result-atom";
import { CalculatedResult } from "@/components/calculator/calculated-result";
import CeilingComparisonCard from "@/components/calculator/ceiling-comparison-card";
import DistributionView from "@/components/calculator/distribution-view";
import UserInput from "@/components/calculator/user-input";

const ComparisonFallback = () => (
  <div className="h-64 w-full animate-pulse rounded-lg bg-zinc-200" />
);

const DistributionFallback = () => (
  <div>
    <div className="mb-6 h-8 w-48 animate-pulse rounded bg-zinc-200" />
    <div className="h-80 w-full animate-pulse rounded-lg bg-zinc-200" />
  </div>
);

const CalculatorContent = () => {
  const hasCpfContribution = useAtomValue(hasCpfContributionAtom);
  const distributionResults = useAtomValue(distributionResultsAtom);

  return (
    <div>
      <div className="mb-8 grid gap-8 md:grid-cols-2">
        <Suspense
          fallback={
            <div className="h-96 animate-pulse rounded-lg bg-zinc-200" />
          }
        >
          <UserInput />
        </Suspense>
        <Suspense
          fallback={
            <div className="h-96 animate-pulse rounded-lg bg-zinc-200" />
          }
        >
          <CalculatedResult />
        </Suspense>
      </div>
      <div className="mb-8">
        <Suspense fallback={<ComparisonFallback />}>
          <CeilingComparisonCard />
        </Suspense>
      </div>
      {hasCpfContribution && (
        <Suspense fallback={<DistributionFallback />}>
          <div>
            <h2 className="mb-6 text-center font-semibold text-2xl">
              CPF Account Type Distribution
            </h2>
            <DistributionView distributionResults={distributionResults} />
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default CalculatorContent;
