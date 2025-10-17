import type { Metadata } from "next";
import CPFInterestRatesSection from "@/components/cpf-interest-rates-section";
import DistributionRatesTable from "@/components/distribution-rates-table";
import { PageNavigation } from "@/components/page-navigation";

export const metadata: Metadata = {
  title: "CPF Interest Rates | OA, SA, MA Interest Rates & Distribution",
  description:
    "View current CPF interest rates for Ordinary Account (OA), Special Account (SA), and MediSave Account (MA). Learn about CPF contribution distribution rates by age group.",
  keywords:
    "CPF interest rates, OA interest, SA interest, MA interest, CPF distribution rates, age group CPF, Singapore CPF rates",
  openGraph: {
    title: "CPF Interest Rates | OA, SA, MA Interest Rates & Distribution",
    description:
      "View current CPF interest rates for Ordinary Account (OA), Special Account (SA), and MediSave Account (MA). Learn about contribution distribution rates by age group.",
    url: "https://cpf-contribution-estimator.vercel.app/interest-rates",
  },
  twitter: {
    card: "summary_large_image",
    title: "CPF Interest Rates | OA, SA, MA Interest Rates & Distribution",
    description:
      "View current CPF interest rates for Ordinary Account (OA), Special Account (SA), and MediSave Account (MA). Learn about contribution distribution rates by age group.",
  },
};

const InterestRatesPage = () => {
  return (
    <>
      <PageNavigation />
      <div className="space-y-12">
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
      </div>
    </>
  );
};

export default InterestRatesPage;
