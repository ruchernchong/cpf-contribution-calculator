import type { Metadata } from "next";
import type { SoftwareApplication, WithContext } from "schema-dts";
import HeroSection from "@/components/home/hero-section";
import InsightBanner from "@/components/home/insight-banner";
import QuickActions from "@/components/home/quick-actions";
import { StructuredData } from "@/components/seo/structured-data";
import CPFIncomeCeilingTimeline from "@/components/timeline/cpf-income-ceiling-timeline";
import { BASE_URL } from "@/config";

export const metadata: Metadata = {
  title: "CPF Income Ceiling Timeline | Track CPF Ceiling Changes",
  description:
    "Track the progression of CPF income ceiling changes from 2023 to 2026. Understand how the gradual increase from $6,000 to $8,000 affects your CPF contributions.",
  alternates: {
    canonical: "/",
  },
};

const HomePage = () => {
  const schema: WithContext<SoftwareApplication> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SimplyCPF",
    description: "Calculate CPF contributions based on income and ceiling",
    url: BASE_URL,
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
      <div className="flex flex-col gap-6">
        <HeroSection />
        <div className="grid gap-6 md:grid-cols-2">
          <CPFIncomeCeilingTimeline />
          <div className="flex flex-col gap-6">
            <InsightBanner />
            <QuickActions />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
