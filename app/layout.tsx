import type { Metadata } from "next";
import Script from "next/script";
import { Providers } from "./Providers";
import { Footer } from "../components/Footer";
import { BASE_URL, description, title } from "../config";
import "./globals.css";

const url = new URL(BASE_URL);

export const metadata: Metadata = {
  metadataBase: url,
  title: {
    template: `%s | ${title}`,
    default: title,
  },
  description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    siteName: title,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    url,
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: "/twitter-image.png", width: 1200, height: 630 }],
    creator: "@ruchernchong",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <main className="flex min-h-screen flex-col">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-4W2DF7BF1S" />
      <Script id="google-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-4W2DF7BF1S');
        `}
      </Script>
    </html>
  );
};

export default RootLayout;
