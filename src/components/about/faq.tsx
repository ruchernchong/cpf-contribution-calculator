import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqItems = [
  {
    question: "What is the CPF Income Ceiling?",
    answer:
      "The CPF Income Ceiling is the maximum amount of monthly ordinary wages on which CPF contributions are payable. The current CPF Income Ceiling is $7,400 per month, effective from January 2025.",
  },
  {
    question: "How is the CPF contribution calculated?",
    answer:
      "CPF contributions are calculated based on your monthly ordinary wages, up to the prevailing CPF Income Ceiling. Both employees and employers make contributions at rates that vary according to the employee's age group and citizenship status.",
  },
  {
    question: "What are the different CPF accounts?",
    answer:
      "The CPF consists of three main accounts: Ordinary Account (OA) for housing, education, and investment needs; Special Account (SA) for retirement and investment in retirement-related financial products; and MediSave Account (MA) for medical expenses, including hospitalization and certain outpatient treatments.",
  },
  {
    question: "What is Additional Wage (AW)?",
    answer:
      "Additional Wage refers to non-regular income such as annual bonuses, leave pay, and incentives. CPF contributions on Additional Wage are subject to an Additional Wage Ceiling, which is calculated as (CPF Annual Limit - Ordinary Wage subject to CPF contributions for the year).",
  },
  {
    question: "How accurate is this calculator?",
    answer:
      "This calculator provides estimates based on the official CPF contribution rates and ceilings. While we strive for accuracy, it's always advisable to refer to the official CPF website or consult CPF Board for your specific situation.",
  },
];

export function FAQ() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-center">
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion className="w-full">
          {faqItems.map((item, index) => {
            return (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
