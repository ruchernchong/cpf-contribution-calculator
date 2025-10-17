"use client";

import { useAtomValue } from "jotai";
import {
  distributionResultsAtom,
  hasCpfContributionAtom,
} from "@/atoms/result-atom";
import { CalculatedResult } from "@/components/calculator/calculated-result";
import DistributionView from "@/components/calculator/distribution-view";
import UserInput from "@/components/calculator/user-input";

const CalculatorContent = () => {
  const hasCpfContribution = useAtomValue(hasCpfContributionAtom);
  const distributionResults = useAtomValue(distributionResultsAtom);

  return (
    <div className="space-y-12">
      <div className="grid gap-8 md:grid-cols-2">
        <UserInput />
        <CalculatedResult />
      </div>
      {hasCpfContribution && (
        <div>
          <h2 className="mb-6 text-center font-semibold text-2xl">
            CPF Account Type Distribution
          </h2>
          <DistributionView distributionResults={distributionResults} />
        </div>
      )}
    </div>
  );
};

export default CalculatorContent;
