import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CPF Calculator",
  description:
    "Calculate your CPF contributions with the latest income ceiling changes",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <Header />
        <main className="flex-grow bg-gray-50">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
