import type { Metadata } from "next";
import type { ReactNode } from "react";

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
};

const InterestRatesLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default InterestRatesLayout;
