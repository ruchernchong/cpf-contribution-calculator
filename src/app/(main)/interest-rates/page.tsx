import type { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";
import CPFInterestRatesSection from "@/components/interest-rates/cpf-interest-rates-section";
import DistributionRatesTable from "@/components/interest-rates/distribution-rates-table";
import { StructuredData } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "CPF Interest Rates | OA, SA, MA Interest Rates & Distribution",
  description:
    "View current CPF interest rates for Ordinary Account (OA), Special Account (SA), and MediSave Account (MA). Learn about CPF contribution distribution rates by age group.",
  keywords:
    "CPF interest rates, OA interest, SA interest, MA interest, CPF distribution rates, age group CPF, Singapore CPF rates",
  twitter: {
    card: "summary_large_image",
    title: "CPF Interest Rates | OA, SA, MA Interest Rates & Distribution",
    description:
      "View current CPF interest rates for Ordinary Account (OA), Special Account (SA), and MediSave Account (MA). Learn about contribution distribution rates by age group.",
  },
};

const InterestRatesPage = () => {
  const schema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "CPF Interest Rates",
    description:
      "View current CPF interest rates for Ordinary Account (OA), Special Account (SA), and MediSave Account (MA). Learn about CPF contribution distribution rates by age group.",
    url: `https://${process.env.VERCEL_URL}/interest-rates`,
    inLanguage: "en-SG",
    keywords:
      "CPF interest rates, OA interest, SA interest, MA interest, CPF distribution rates, age group CPF, Singapore CPF rates",
  };

  return (
    <>
      <StructuredData data={schema} />
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
