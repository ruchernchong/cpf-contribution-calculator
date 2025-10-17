import type { Metadata } from "next";
import type { SoftwareApplication, WithContext } from "schema-dts";
import { StructuredData } from "@/components/seo/structured-data";
import CPFIncomeCeilingTimeline from "@/components/timeline/cpf-income-ceiling-timeline";

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
    url: `https://${process.env.VERCEL_URL}`,
  },
};

const HomePage = () => {
  const schema: WithContext<SoftwareApplication> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CPF Contribution Estimator",
    description: "Calculate CPF contributions based on income and ceiling",
    keywords: "CPF, contribution, calculator, Singapore, income ceiling",
    url: `https://${process.env.VERCEL_URL}`,
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
