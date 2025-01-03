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
import React from "react";

export const metadata = {
  title: "About - CPF Calculator",
  description: "About the CPF Calculator and frequently asked questions",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>About CPF Calculator</CardTitle>
          <CardDescription>
            Understanding your CPF contributions made simple
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The CPF Calculator is a user-friendly tool designed to help
            Singapore Citizens and Permanent Residents estimate their CPF
            contributions based on their income and age group.
          </p>
          <p>
            We keep our calculator updated with the latest CPF policies and
            income ceiling changes announced in the Singapore Budget 2023,
            ensuring accurate calculations for your financial planning needs.
          </p>
          <p>
            This tool takes into account the progressive increases in CPF Income
            Ceiling from 2023 to 2026, helping you understand how these changes
            affect your contributions over time.
          </p>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-orange-800">
            Important Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent className="text-orange-800">
          <p>
            This calculator is an independent tool created to assist with CPF
            contribution calculations. It is not affiliated with, endorsed by,
            or officially connected to the Central Provident Fund Board (CPF
            Board), Ministry of Manpower (MOM), or any other government agency.
          </p>
          <p className="mt-4">
            While we strive to maintain accuracy, for official information and
            verification of CPF matters, please refer to the official CPF Board
            website or contact CPF Board directly.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Common questions about the CPF Calculator
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
