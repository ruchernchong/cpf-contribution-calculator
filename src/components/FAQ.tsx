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
    <>
      <h2>FAQs</h2>
      {items.map(({ question, answer }, index) => {
        const selectedIndex = activeIndex === index;

        return (
          <Fragment key={question}>
            <div
              className={classNames(
                "cursor-pointer border border-neutral-600 p-4",
                {
                  "bg-neutral-50 text-neutral-900": selectedIndex,
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
                "border border-neutral-600 bg-neutral-100 bg-neutral-800 p-4",
                {
                  hidden: !selectedIndex,
                }
              )}
            >
              {answer}
            </div>
          </Fragment>
        );
      })}
    </>
  );
};
