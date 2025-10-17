import type { Metadata } from "next";
import type { SoftwareApplication, WithContext } from "schema-dts";
import CPFIncomeCeilingTimeline from "@/components/cpf-income-ceiling-timeline";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "CPF Income Ceiling Timeline | Track CPF Ceiling Changes",
  description:
    "Track the progression of CPF income ceiling changes from 2023 to 2026. Understand how the gradual increase from $6,000 to $8,000 affects your CPF contributions.",
  keywords:
    "CPF income ceiling, CPF ceiling 2023, CPF ceiling 2026, income ceiling increase, CPF contribution limit, Singapore CPF ceiling",
  openGraph: {
    title: "CPF Income Ceiling Timeline | Track CPF Ceiling Changes",
    description:
      "Track the progression of CPF income ceiling changes from 2023 to 2026. Understand how the gradual increase affects your CPF contributions.",
    url: "https://cpf-contribution-estimator.vercel.app",
  },
};

const HomePage = () => {
  const schema: WithContext<SoftwareApplication> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CPF Contribution Estimator",
    description: "Calculate CPF contributions based on income and ceiling",
    keywords: "CPF, contribution, calculator, Singapore, income ceiling",
    url: "https://cpf-contribution-estimator.vercel.app",
    applicationCategory: "FinanceApplication",
    featureList: [
      "Calculate CPF contributions",
      "View distribution across OA, SA, MA accounts",
      "Adjust income ceiling based on year",
    ],
    inLanguage: "en-SG",
  };

  return (
    <>
      <StructuredData data={schema} />
      <CPFIncomeCeilingTimeline />
    </>
  );
};

export default HomePage;
