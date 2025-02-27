import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Script from "next/script";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CPF Calculator",
  description:
    "Calculate your CPF contributions with the latest income ceiling changes",
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
      </body>
    </html>
  );
};

export default RootLayout;
