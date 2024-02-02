import { Fragment } from "react";
import type { FAQ as FAQType } from "../types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface FAQProps {
  items: FAQType[];
}

export const FAQ = ({ items }: FAQProps) => {
  return (
    <Fragment>
      <h3>Frequently Asked Questions</h3>
      <Accordion type="single" collapsible>
        {items.map(({ question, answer }, index) => {
          const key = `${question}-${index}`;

          return (
            <AccordionItem key={key} value={question}>
              <AccordionTrigger className="text-left">
                {question}
              </AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Fragment>
  );
};
