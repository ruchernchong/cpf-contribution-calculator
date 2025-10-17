import type { Metadata } from "next";
import CalculatorContent from "@/components/calculator-content";
import { PageNavigation } from "@/components/page-navigation";

export const metadata: Metadata = {
  title: "CPF Calculator | Calculate Your CPF Contributions",
  description:
    "Calculate your CPF employee and employer contributions with instant results. View account distributions across Ordinary, Special, and MediSave accounts based on your age group.",
  keywords:
    "CPF calculator, CPF contribution calculator, employee contribution, employer contribution, OA, SA, MA, Singapore CPF",
  openGraph: {
    title: "CPF Calculator | Calculate Your CPF Contributions",
    description:
      "Calculate your CPF employee and employer contributions with instant results. View account distributions across Ordinary, Special, and MediSave accounts.",
    url: "https://cpf-contribution-estimator.vercel.app/calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "CPF Calculator | Calculate Your CPF Contributions",
    description:
      "Calculate your CPF employee and employer contributions with instant results. View account distributions across Ordinary, Special, and MediSave accounts.",
  },
};

const CalculatorPage = () => {
  return (
    <>
      <PageNavigation />
      <CalculatorContent />
    </>
  );
};

export default CalculatorPage;
