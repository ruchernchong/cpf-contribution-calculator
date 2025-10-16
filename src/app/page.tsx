"use client";

import { QuestionMarkCircleIcon } from "@heroicons/react/16/solid";
import { useAtomValue } from "jotai";
import Script from "next/script";
import { latestIncomeCeilingDateAtom } from "@/atoms/incomeCeilingAtom";
import {
  distributionResultsAtom,
  hasCpfContributionAtom,
} from "@/atoms/resultAtom";
import { CalculatedResult } from "@/components/CalculatedResult";
import CPFYearSlider from "@/components/CPFYearSlider";
import DistributionRatesTable from "@/components/DistributionRatesTable";
import DistributionView from "@/components/DistributionView";
import UserInput from "@/components/UserInput";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CPF_INCOME_CEILING } from "@/constants";
import useAnimatedNumber from "@/hooks/useAnimatedNumber";
import { formatCurrency, formatDate } from "@/lib/format";

const HomePage = () => {
  const hasCpfContribution = useAtomValue(hasCpfContributionAtom);
  const distributionResults = useAtomValue(distributionResultsAtom);
  const latestIncomeCeilingDate = useAtomValue(latestIncomeCeilingDateAtom);
  const currentCeiling = CPF_INCOME_CEILING[latestIncomeCeilingDate];

  return (
    <>
      <Script
        id="calculator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialCalculator",
            name: "CPF Contribution Estimator",
            description:
              "Calculate CPF contributions based on income and ceiling",
            keywords:
              "CPF, contribution, calculator, Singapore, income ceiling",
            url: "https://cpf-contribution-estimator.vercel.app",
            mainEntity: {
              "@type": "SoftwareApplication",
              name: "CPF Contribution Estimator",
              applicationCategory: "FinanceApplication",
              featureList: [
                "Calculate CPF contributions",
                "View distribution across OA, SA, MA accounts",
                "Adjust income ceiling based on year",
              ],
            },
            inLanguage: "en-SG",
          }),
        }}
      />
      <div className="border-b py-12 bg-zinc-50 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="mb-4 text-center text-4xl font-bold">
            CPF Income Ceiling
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Calculate your CPF contributions based on your income and the
            current ceiling
          </p>
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
          <CPFYearSlider />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12">
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
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Distribution Rates by Age Group
          </h2>
          <DistributionRatesTable />
        </div>
      </div>
    </>
  );
};

export default HomePage;
