import { Fragment } from "react";
import type { FAQ as FAQType } from "../types";
import { Accordion } from "./Accordion";

interface FAQProps {
  items: FAQType[];
}

export const FAQ = ({ items }: FAQProps) => {
  return (
    <Fragment>
      <h3>Frequently Asked Questions</h3>
      {items.map(({ question, answer }) => {
        const hasQuestionAndAnswer = Boolean(question && answer);

        return (
          hasQuestionAndAnswer && (
            <Accordion key={question} title={question}>
              {answer}
            </Accordion>
          )
        );
      })}
    </Fragment>
  );
};
