import type { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";
import CalculatorContent from "@/components/calculator/calculator-content";
import { StructuredData } from "@/components/seo/structured-data";
import { BASE_URL } from "@/config";

export const metadata: Metadata = {
  title: "Calculator",
  description:
    "Calculate your CPF employee and employer contributions with instant results. View account distributions across Ordinary, Special, and MediSave accounts based on your age group.",
  alternates: {
    canonical: "/calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculator",
    description:
      "Calculate your CPF employee and employer contributions with instant results. View account distributions across Ordinary, Special, and MediSave accounts.",
  },
};

const CalculatorPage = () => {
  const schema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "SimplyCPF Calculator",
    description:
      "Calculate your CPF employee and employer contributions with instant results. View account distributions across Ordinary, Special, and MediSave accounts based on your age group.",
    url: `${BASE_URL}/calculator`,
    inLanguage: "en-SG",
  };

  return (
    <>
      <StructuredData data={schema} />
      <CalculatorContent />
    </>
  );
};

export default CalculatorPage;
