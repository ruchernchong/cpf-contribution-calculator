import { Fragment } from "react";
import type { FAQ as FAQType } from "../types";

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
            <details>
              <summary className="cursor-pointer border p-4">
                {question}
              </summary>
              <div className="border bg-gray-100 p-4">{answer}</div>
            </details>
          )
        );
      })}
    </Fragment>
  );
};
