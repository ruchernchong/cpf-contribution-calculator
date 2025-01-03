"use client";

import { latestIncomeCeilingDateAtom } from "@/atoms/incomeCeilingAtom";
import {
  distributionResultsAtom,
  hasCpfContributionAtom,
} from "@/atoms/resultAtom";
import CPFYearSlider from "@/components/CPFYearSlider";
import { CalculatedResult } from "@/components/CalculatedResult";
import DistributionView from "@/components/DistributionView";
import { UserInput } from "@/components/UserInput";
import { Card, CardContent } from "@/components/ui/card";
import { cpfIncomeCeilings } from "@/data";
import { formatCurrency, formatDate } from "@/lib/format";
import { useAtomValue } from "jotai";

const HomePage = () => {
  const hasCpfContribution = useAtomValue(hasCpfContributionAtom);
  const distributionResults = useAtomValue(distributionResultsAtom);
  const latestIncomeCeilingDate = useAtomValue(latestIncomeCeilingDateAtom);
  const currentCeiling = cpfIncomeCeilings[latestIncomeCeilingDate];

  return (
    <>
      {/* Hero Section */}
      <div className="border-b bg-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-4 text-center text-4xl font-bold">
            CPF Income Ceiling Changes
          </h1>

          {/* Current CPF Income Ceiling Card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="mb-2 text-lg text-gray-600">
                  Current CPF Income Ceiling
                </p>
                <h2 className="text-4xl font-bold text-red-500">
                  {formatCurrency(currentCeiling)}
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
