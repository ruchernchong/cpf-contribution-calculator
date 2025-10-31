"use client";

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import { useTransition } from "react";
import { latestIncomeCeilingDateAtom } from "@/atoms/income-ceiling-atom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CPF_INCOME_CEILING } from "@/constants";
import { findLatestIncomeCeilingDate } from "@/lib/find-latest-income-ceiling-date";
import { formatCurrency, formatDate } from "@/lib/format";

const CPFIncomeCeilingTimeline = () => {
  const [selectedDate, setSelectedDate] = useAtom(latestIncomeCeilingDateAtom);
  const [isPending, startTransition] = useTransition();

  const dateKeys = Object.keys(CPF_INCOME_CEILING);
  const currentIncomeCeilingDate = findLatestIncomeCeilingDate();

  const handleTimelineItemClick = (date: string) => {
    startTransition(() => {
      setSelectedDate(date);
    });
  };

  return (
    <Card className="mb-4 w-full shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">CPF Income Ceiling Timeline</CardTitle>
        <CardDescription>
          Track the progression of CPF income ceiling changes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          {dateKeys.map((date, index) => {
            const isActive = date === selectedDate;
            const isCurrent = date === currentIncomeCeilingDate;
            const isLast = index === dateKeys.length - 1;

            return (
              <li key={date}>
                {index > 0 && <hr className={isActive ? "bg-primary" : ""} />}
                <div className="timeline-middle">
                  <CheckCircleIcon
                    className={`size-6 transition-colors ${isCurrent ? "text-primary" : ""}`}
                  />
                </div>
                <button
                  type="button"
                  className={`${index % 2 === 0 ? "timeline-start" : "timeline-end"} mb-10 cursor-pointer text-left transition-all hover:scale-105 ${isActive ? "scale-105" : ""} ${isCurrent ? "rounded-lg border-2 border-primary bg-primary/5 p-3" : ""}`}
                  onClick={() => handleTimelineItemClick(date)}
                  disabled={isPending}
                  aria-busy={isPending}
                >
                  <time
                    className={`font-mono text-sm transition-colors ${isActive ? "font-semibold text-primary" : "text-muted-foreground"} ${isCurrent ? "font-bold text-primary" : ""}`}
                  >
                    {formatDate(date)}
                  </time>
                  <div
                    className={`font-bold text-lg transition-colors ${isActive ? "text-primary" : "text-foreground"} ${isCurrent ? "text-primary text-xl" : ""}`}
                  >
                    {formatCurrency(CPF_INCOME_CEILING[date])}
                  </div>
                  {index === 0 && (
                    <p className="mt-1 text-muted-foreground text-xs">
                      Pre-Budget 2023
                    </p>
                  )}
                  {isCurrent && (
                    <p className="mt-1 flex items-center gap-1 font-semibold text-primary text-xs uppercase tracking-wide">
                      <span className="inline-block size-2 animate-pulse rounded-full bg-primary" />
                      Current ceiling
                    </p>
                  )}
                  {isLast && (
                    <p className="mt-1 text-muted-foreground text-xs">
                      Final ceiling
                    </p>
                  )}
                </button>
                {!isLast && (
                  <hr
                    className={
                      index < dateKeys.indexOf(selectedDate) ? "bg-primary" : ""
                    }
                  />
                )}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CPFIncomeCeilingTimeline;
