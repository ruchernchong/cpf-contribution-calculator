"use client";

import { latestIncomeCeilingDateAtom } from "@/atoms/incomeCeilingAtom";
import {
  distributionResultsAtom,
  hasCpfContributionAtom,
} from "@/atoms/resultAtom";
import CPFYearSlider from "@/components/CPFYearSlider";
import { CalculatedResult } from "@/components/CalculatedResult";
import DistributionView from "@/components/DistributionView";
import UserInput from "@/components/UserInput";
import { Card, CardContent } from "@/components/ui/card";
import { CPF_INCOME_CEILING } from "@/constants";
import useAnimatedNumber from "@/hooks/useAnimatedNumber";
import { formatCurrency, formatDate } from "@/lib/format";
import { useAtomValue } from "jotai";
import dynamic from "next/dynamic";

const HomePage = () => {
  const hasCpfContribution = useAtomValue(hasCpfContributionAtom);
  const distributionResults = useAtomValue(distributionResultsAtom);
  const latestIncomeCeilingDate = useAtomValue(latestIncomeCeilingDateAtom);
  const currentCeiling = CPF_INCOME_CEILING[latestIncomeCeilingDate];

  return (
    <>
      {/* Hero Section */}
      <div className="border-b bg-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-4 text-center text-4xl font-bold">
            CPF Income Ceiling
          </h1>

          {/* Current CPF Income Ceiling Card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="mb-2 text-lg text-gray-600">
                  Current CPF Income Ceiling
                </p>
                <h2 className="text-4xl font-bold text-red-500">
                  {formatCurrency(useAnimatedNumber(currentCeiling))}
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Effect on contributions from{" "}
                  {formatDate(latestIncomeCeilingDate)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Year Slider Section */}
          <CPFYearSlider />
        </div>
      </div>

      {/* Calculator Section */}
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <UserInput />
          <CalculatedResult />
        </div>

        {hasCpfContribution && (
          <div className="mt-8">
            <DistributionView distributionResults={distributionResults} />
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
