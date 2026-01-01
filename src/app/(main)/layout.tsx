import type { Metadata } from "next";
import type { ReactNode } from "react";
import Banner from "@/components/layout/banner";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NavigationTabs } from "@/components/layout/navigation-tabs";

export const metadata: Metadata = {
  title: "CPF Contribution Estimator | Calculate Singapore CPF Contributions",
  description:
    "Calculate your CPF contributions with the latest income ceiling changes. Accurate estimations based on 2023 Ministry of Finance updates.",
  keywords:
    "CPF, contributions, Singapore, calculator, estimator, income ceiling, 2023",
  authors: [{ name: "Ru Chern Chong" }],
  openGraph: {
    title: "CPF Contribution Estimator",
    description:
      "Calculate your CPF contributions with the latest income ceiling changes",
    url: `https://${process.env.VERCEL_URL}`,
    siteName: "CPF Contribution Estimator",
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CPF Contribution Estimator",
    description:
      "Calculate your CPF contributions with the latest income ceiling changes",
  },
};

export default function MainLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactNode {
  return (
    <>
      <Header />
      <Banner />
      <main className="container mx-auto flex flex-1 flex-col gap-8 px-4 py-8">
        <NavigationTabs />
        {children}
      </main>
      <Footer />
    </>
  );
}
