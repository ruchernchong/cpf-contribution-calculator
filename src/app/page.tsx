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
import DistributionRatesTable from "@/components/distribution-rates-table";
import DistributionView from "@/components/distribution-view";

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

      <CPFIncomeCeilingTimeline />
      <div className="mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <UserInput />
          <CalculatedResult />
        </div>
        {hasCpfContribution && (
          <div className="mt-12">
            <h2 className="mb-6 text-center font-semibold text-2xl">
              CPF Account Type Distribution
            </h2>
            <DistributionView distributionResults={distributionResults} />
          </div>
        )}
        <div className="mt-12">
          <h2 className="mb-6 text-center font-semibold text-2xl">
            Distribution Rates by Age Group
          </h2>
          <DistributionRatesTable />
        </div>
        <div className="mt-12">
          <h2 className="mb-6 text-center font-semibold text-2xl">
            CPF Interest Rates
          </h2>
          <CPFInterestRatesSection />
        </div>
      </div>
    </>
  );
};

export default HomePage;
