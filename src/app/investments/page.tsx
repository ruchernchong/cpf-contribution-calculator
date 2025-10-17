import type { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";
import CPFInvestmentComparison from "@/components/investments/cpf-investment-comparison";
import { StructuredData } from "@/components/seo/structured-data";

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
    url: `https://${process.env.VERCEL_URL}/investments`,
  },
  twitter: {
    card: "summary_large_image",
    title: "CPF Investment Comparison | Compare Investment Returns",
    description:
      "Compare investment strategies and returns using your CPF accounts. Understand different investment options and their potential growth.",
  },
};

const InvestmentsPage = () => {
  const schema: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "CPF Investment Comparison",
    description:
      "Compare investment strategies and returns using your CPF accounts. Understand different investment options and their potential growth over time.",
    url: `https://${process.env.VERCEL_URL}/investments`,
    inLanguage: "en-SG",
    keywords:
      "CPF investment, CPF investment scheme, CPFIS, investment comparison, CPF returns, Singapore investment",
  };

  return (
    <>
      <StructuredData data={schema} />
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
