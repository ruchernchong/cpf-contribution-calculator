import type { Metadata } from "next";
import type { AboutPage, WithContext } from "schema-dts";
import { StructuredData } from "@/components/structured-data";
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
import faqData from "@/data/faq.json";

export const metadata: Metadata = {
  title: "About - CPF Contribution Estimator",
  description:
    "About the CPF Contribution Estimator and frequently asked questions",
};

const About = () => {
  const schema: WithContext<AboutPage> = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About CPF Contribution Estimator",
    description:
      "Information about the CPF Contribution Estimator and frequently asked questions",
    url: "https://cpf-contribution-estimator.vercel.app/about",
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
      <div className="space-y-8 p-6">
        <Card>
          <CardHeader>
            <CardTitle>About CPF Contribution Estimator</CardTitle>
            <CardDescription>
              Understanding your CPF contributions made simple
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The CPF Contribution Estimator is a user-friendly tool designed to
              help Singapore Citizens and Permanent Residents estimate their CPF
              contributions based on their income and age group.
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

        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-200">
          <CardHeader>
            <CardTitle>Important Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              This calculator is an independent tool created to assist with CPF
              contribution calculations. It is not affiliated with, endorsed by,
              or officially connected to the Central Provident Fund Board (CPF
              Board), Ministry of Manpower (MOM), or any other government
              agency.
            </p>
            <p className="mt-4">
              While we strive to maintain accuracy, for official information and
              verification of CPF matters, please refer to the official CPF
              Board website or contact CPF Board directly.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Common questions about the CPF Contribution Estimator
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map(({ question, answer }) => {
                const index = `${question}-${answer}`;
                return (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {question}
                    </AccordionTrigger>
                    <AccordionContent className="text-zinc-600 dark:text-zinc-300">
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
