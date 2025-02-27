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
import FAQ from "@/components/FAQ";
import { Card, CardContent } from "@/components/ui/card";
import { CPF_INCOME_CEILING } from "@/constants";
import useAnimatedNumber from "@/hooks/useAnimatedNumber";
import { formatCurrency, formatDate } from "@/lib/format";
import { useAtomValue } from "jotai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { QuestionMarkCircleIcon } from "@heroicons/react/16/solid";

const HomePage = () => {
  const hasCpfContribution = useAtomValue(hasCpfContributionAtom);
  const distributionResults = useAtomValue(distributionResultsAtom);
  const latestIncomeCeilingDate = useAtomValue(latestIncomeCeilingDateAtom);
  const currentCeiling = CPF_INCOME_CEILING[latestIncomeCeilingDate];

  return (
    <>
      {/* Hero Section */}
      <div className="border-b py-12 bg-slate-50 dark:bg-slate-900">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-4 text-center text-4xl font-bold">
            CPF Income Ceiling
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Calculate your CPF contributions based on your income and the
            current ceiling
          </p>

          {/* Current CPF Income Ceiling Card */}
          <Card className="mb-8 shadow-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <p className="text-lg text-muted-foreground">
                    Current CPF Income Ceiling
                  </p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <QuestionMarkCircleIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          The maximum amount of monthly income that is subject
                          to CPF contributions
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <h2 className="text-4xl font-bold text-red-500">
                  {formatCurrency(useAnimatedNumber(currentCeiling))}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
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
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              CPF Account Type Distribution
            </h2>
            <DistributionView distributionResults={distributionResults} />
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQ />
        </div>
      </div>
    </>
  );
};

export default HomePage;
