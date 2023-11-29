import { Fragment, useState } from "react";
import classNames from "classnames";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/20/solid";
import type { FAQ as FAQType } from "../types";

interface FAQProps {
  items: FAQType[];
}

export const FAQ = ({ items }: FAQProps) => {
  const [activeIndex, setActiveIndex] = useState<number>();

  return (
    <Fragment>
      <h3>FAQs</h3>
      {items.map(({ question, answer }, index) => {
        const selectedIndex = activeIndex === index;
        const hasQuestionAndAnswer = Boolean(question && answer);

        return (
          hasQuestionAndAnswer && (
            <Fragment key={question}>
              <div
                className={classNames(
                  "cursor-pointer border p-4 dark:border-gray-600",
                  {
                    "bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900":
                      selectedIndex,
                  }
                )}
                onClick={() => setActiveIndex(index)}
              >
                <div className="flex items-center">
                  <div className="mr-2">
                    {selectedIndex ? (
                      <ArrowUpCircleIcon width={24} height={24} />
                    ) : (
                      <ArrowDownCircleIcon width={24} height={24} />
                    )}
                  </div>
                  {question}
                </div>
              </div>
              <div
                className={classNames(
                  "border bg-gray-200 p-4 dark:border-gray-600 dark:bg-gray-800",
                  {
                    hidden: !selectedIndex,
                  }
                )}
              >
                {answer}
              </div>
            </Fragment>
          )
        );
      })}
    </Fragment>
  );
};
