import { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Footer } from "../components/Footer";
import { description, title } from "../config";
import "./global.css";

export const metadata: Metadata = {
  title: {
    template: `%s | ${title}`,
    default: title,
  },
  description,
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@ruchernchong",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
        <main className="flex min-h-screen flex-col">{children}</main>
        <Footer />
      </body>
      <GoogleTagManager gtmId="G-4W2DF7BF1S" />
    </html>
  );
};

export default RootLayout;
