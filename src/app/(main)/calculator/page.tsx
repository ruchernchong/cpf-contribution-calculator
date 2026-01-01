import type { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";
import CalculatorContent from "@/components/calculator/calculator-content";
import { StructuredData } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "CPF Calculator | Calculate Your CPF Contributions",
  description:
    "Calculate your CPF employee and employer contributions with instant results. View account distributions across Ordinary, Special, and MediSave accounts based on your age group.",
  keywords:
    "CPF calculator, CPF contribution calculator, employee contribution, employer contribution, OA, SA, MA, Singapore CPF",
  twitter: {
    card: "summary_large_image",
    title: "CPF Calculator | Calculate Your CPF Contributions",
    description:
      "Calculate your CPF employee and employer contributions with instant results. View account distributions across Ordinary, Special, and MediSave accounts.",
  },
};

const CalculatorPage = () => {
  const schema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "CPF Contribution Calculator",
    description:
      "Calculate your CPF employee and employer contributions with instant results. View account distributions across Ordinary, Special, and MediSave accounts based on your age group.",
    url: `https://${process.env.VERCEL_URL}/calculator`,
    inLanguage: "en-SG",
    keywords:
      "CPF calculator, CPF contribution calculator, employee contribution, employer contribution, OA, SA, MA, Singapore CPF",
  };

  return (
    <>
      <StructuredData data={schema} />
      <CalculatorContent />
    </>
  );
};

export default CalculatorPage;
