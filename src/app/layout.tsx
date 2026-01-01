import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";
import type { WebApplication, WithContext } from "schema-dts";
import { StructuredData } from "@/components/seo/structured-data";

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

const schema: WithContext<WebApplication> = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CPF Contribution Estimator",
  url: `https://${process.env.VERCEL_URL}`,
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

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactNode {
  return (
    <html lang="en" className={geist.className}>
      <body className="flex min-h-screen flex-col">
        <NuqsAdapter>
          {children}
          <Analytics />
          <StructuredData data={schema} />
        </NuqsAdapter>
      </body>
    </html>
  );
}
