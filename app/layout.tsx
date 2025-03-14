import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Script from "next/script";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

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

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Script defer src="https://assets.onedollarstats.com/tracker.js" />
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
