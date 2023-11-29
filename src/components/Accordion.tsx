import { Fragment, PropsWithChildren, useState } from "react";
import classNames from "classnames";
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/20/solid";

interface AccordionProps extends PropsWithChildren {
  title: string;
}

export const Accordion = ({ title, children }: AccordionProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggle = () => {
    setIsActive((prevState) => !prevState);
  };

  return (
    <Fragment>
      <div
        className={classNames(
          "cursor-pointer border p-4 dark:border-gray-600",
          {
            "bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900":
              isActive,
          }
        )}
        onClick={toggle}
      >
        <div className="flex items-center">
          <div className="mr-2">
            {isActive ? (
              <ArrowUpCircleIcon width={24} height={24} />
            ) : (
              <ArrowDownCircleIcon width={24} height={24} />
            )}
          </div>
          {title}
        </div>
      </div>
      <div
        className={classNames(
          "border bg-gray-200 p-4 dark:border-gray-600 dark:bg-gray-800",
          {
            hidden: !isActive,
          }
        )}
      >
        {children}
      </div>
    </Fragment>
  );
};
