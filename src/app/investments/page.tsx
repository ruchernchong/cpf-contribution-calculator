import type { Metadata } from "next";
import CPFInvestmentComparison from "@/components/cpf-investment-comparison";
import { PageNavigation } from "@/components/page-navigation";

export const metadata: Metadata = {
  title: "CPF Investment Comparison | Compare Investment Returns",
  description:
    "Compare investment strategies and returns using your CPF accounts. Understand different investment options and their potential growth over time.",
  keywords:
    "CPF investment, CPF investment scheme, CPFIS, investment comparison, CPF returns, Singapore investment",
  openGraph: {
    title: "CPF Investment Comparison | Compare Investment Returns",
    description:
      "Compare investment strategies and returns using your CPF accounts. Understand different investment options and their potential growth.",
    url: "https://cpf-contribution-estimator.vercel.app/investments",
  },
  twitter: {
    card: "summary_large_image",
    title: "CPF Investment Comparison | Compare Investment Returns",
    description:
      "Compare investment strategies and returns using your CPF accounts. Understand different investment options and their potential growth.",
  },
};

const InvestmentsPage = () => {
  return (
    <>
      <PageNavigation />
      <div>
        <h2 className="mb-6 text-center font-semibold text-2xl">
          Investment Comparison
        </h2>
        <CPFInvestmentComparison />
      </div>
    </>
  );
};

export default InvestmentsPage;
