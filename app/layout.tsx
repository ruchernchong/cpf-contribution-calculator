import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CPF Calculator",
  description:
    "Calculate your CPF contributions with the latest income ceiling changes"
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
    <body
      className={`${inter.className} flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50`}
    >
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
    <Script
      defer
      src="https://assets.onedollarstats.com/tracker.js">
    </Script>
    </body>
    </html>
  );
};

export default RootLayout;
