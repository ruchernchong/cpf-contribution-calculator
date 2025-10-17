import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import type { WebApplication, WithContext } from "schema-dts";
import Banner from "@/components/banner";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { NavigationTabs } from "@/components/navigation-tabs";
import { StructuredData } from "@/components/structured-data";

const geist = Geist({ subsets: ["latin"] });

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
    url: "https://cpf-contribution-estimator.vercel.app",
    siteName: "CPF Contribution Estimator",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CPF Contribution Estimator",
    description:
      "Calculate your CPF contributions with the latest income ceiling changes",
    images: ["/twitter-image.png"],
  },
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const schema: WithContext<WebApplication> = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CPF Contribution Estimator",
    url: "https://cpf-contribution-estimator.vercel.app",
    description:
      "Calculate your CPF contributions with the latest income ceiling changes. Accurate estimations based on 2023 Ministry of Finance updates.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "SGD",
    },
    author: {
      "@type": "Person",
      name: "Ru Chern Chong",
    },
  };

  return (
    <html lang="en" className={geist.className}>
      <body
        className={`flex min-h-screen flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50`}
      >
        <Header />
        <Banner />
        <main className="container mx-auto px-4 py-8">
          <NavigationTabs />
          {children}
        </main>
        <Footer />
        <Analytics />
        <StructuredData data={schema} />
      </body>
    </html>
  );
};

export default RootLayout;
