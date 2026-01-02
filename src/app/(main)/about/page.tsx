import type { Metadata } from "next";
import type { AboutPage, WithContext } from "schema-dts";
import { StructuredData } from "@/components/seo/structured-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BASE_URL } from "@/config";
import faqData from "@/data/faq.json";

export const metadata: Metadata = {
  title: "About",
  description: "About SimplyCPF and frequently asked questions",
  alternates: {
    canonical: "/about",
  },
};

const About = () => {
  const schema: WithContext<AboutPage> = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About SimplyCPF",
    description: "Information about SimplyCPF and frequently asked questions",
    url: `${BASE_URL}/about`,
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: faqData.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  };

  return (
    <>
      <StructuredData data={schema} />
      <div className="flex flex-col gap-8 p-6">
        <Card>
          <CardHeader>
            <CardTitle>About SimplyCPF</CardTitle>
            <CardDescription>
              Understanding your CPF contributions made simple
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p>
              SimplyCPF is a user-friendly tool designed to help Singapore
              Citizens and Permanent Residents estimate their CPF contributions
              based on their income and age group.
            </p>
            <p>
              We keep our calculator updated with the latest CPF policies and
              income ceiling changes announced in the Singapore Budget 2023,
              ensuring accurate calculations for your financial planning needs.
            </p>
            <p>
              This tool takes into account the progressive increases in CPF
              Income Ceiling from 2023 to 2026, helping you understand how these
              changes affect your contributions over time.
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle>Important Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This calculator is an independent tool created to assist with CPF
              contribution calculations. It is not affiliated with, endorsed by,
              or officially connected to the Central Provident Fund Board (CPF
              Board), Ministry of Manpower (MOM), or any other government
              agency.
            </p>
            <p>
              While we strive to maintain accuracy, for official information and
              verification of CPF matters, please refer to the official CPF
              Board website or contact CPF Board directly.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Common questions about SimplyCPF</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion className="w-full">
              {faqData.map(({ question, answer }) => {
                const index = `${question}-${answer}`;
                return (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {answer}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default About;
