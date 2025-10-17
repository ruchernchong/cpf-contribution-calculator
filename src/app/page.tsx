"use client";

import { useAtomValue } from "jotai";
import Script from "next/script";
import {
  distributionResultsAtom,
  hasCpfContributionAtom,
} from "@/atoms/result-atom";
import { CalculatedResult } from "@/components/calculated-result";
import CPFIncomeCeilingTimeline from "@/components/cpf-income-ceiling-timeline";
import CPFInterestRatesSection from "@/components/cpf-interest-rates-section";
import CPFInvestmentComparison from "@/components/cpf-investment-comparison";
import DistributionRatesTable from "@/components/distribution-rates-table";
import DistributionView from "@/components/distribution-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserInput from "@/components/user-input";

const HomePage = () => {
  const hasCpfContribution = useAtomValue(hasCpfContributionAtom);
  const distributionResults = useAtomValue(distributionResultsAtom);

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

      <div className="mx-auto px-4 py-12">
        <Tabs defaultValue="income-ceiling" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-4">
            <TabsTrigger value="income-ceiling">Income Ceiling</TabsTrigger>
            <TabsTrigger value="overview">Calculator</TabsTrigger>
            <TabsTrigger value="interest-rates">Interest Rates</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-12">
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
          </TabsContent>

          <TabsContent value="income-ceiling">
            <CPFIncomeCeilingTimeline />
          </TabsContent>

          <TabsContent value="interest-rates" className="space-y-12">
            <div>
              <h2 className="mb-6 text-center font-semibold text-2xl">
                CPF Interest Rates
              </h2>
              <CPFInterestRatesSection />
            </div>
            <div>
              <h2 className="mb-6 text-center font-semibold text-2xl">
                Distribution Rates by Age Group
              </h2>
              <DistributionRatesTable />
            </div>
          </TabsContent>

          <TabsContent value="investments">
            <div>
              <h2 className="mb-6 text-center font-semibold text-2xl">
                Investment Comparison
              </h2>
              <CPFInvestmentComparison />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default HomePage;
