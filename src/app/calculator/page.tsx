"use client";

import { useAtomValue } from "jotai";
import {
  distributionResultsAtom,
  hasCpfContributionAtom,
} from "@/atoms/result-atom";
import { CalculatedResult } from "@/components/calculated-result";
import DistributionView from "@/components/distribution-view";
import { PageNavigation } from "@/components/page-navigation";
import UserInput from "@/components/user-input";

const CalculatorPage = () => {
  const hasCpfContribution = useAtomValue(hasCpfContributionAtom);
  const distributionResults = useAtomValue(distributionResultsAtom);

  return (
    <div className="mx-auto px-4 py-12">
      <PageNavigation />
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
    </div>
  );
};

export default CalculatorPage;
