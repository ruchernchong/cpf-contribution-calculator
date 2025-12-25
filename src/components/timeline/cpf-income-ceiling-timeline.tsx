"use client";

import { CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
                {index > 0 && <hr className={isActive ? "bg-secondary" : ""} />}
                <div className="timeline-middle">
                  <HugeiconsIcon
                    icon={CheckmarkCircle01Icon}
                    className={`size-6 transition-colors ${isCurrent ? "text-secondary" : ""}`}
                    strokeWidth={2}
                  />
                </div>
                <button
                  type="button"
                  className={`${index % 2 === 0 ? "timeline-start" : "timeline-end"} mb-10 flex cursor-pointer flex-col gap-1 text-left transition-all hover:scale-105 ${isActive ? "scale-105" : ""} ${isCurrent ? "rounded-lg border-2 border-secondary bg-secondary/5 p-3" : ""}`}
                  onClick={() => handleTimelineItemClick(date)}
                  disabled={isPending}
                  aria-busy={isPending}
                >
                  <time
                    className={`font-mono text-sm transition-colors ${isActive ? "font-semibold text-secondary" : "text-muted-foreground"} ${isCurrent ? "font-bold text-secondary" : ""}`}
                  >
                    {formatDate(date)}
                  </time>
                  <div
                    className={`font-bold text-lg transition-colors ${isActive ? "text-foreground" : "text-foreground"} ${isCurrent ? "text-xl" : ""}`}
                  >
                    {formatCurrency(CPF_INCOME_CEILING[date])}
                  </div>
                  {index === 0 && (
                    <p className="text-xs text-muted-foreground">
                      Pre-Budget 2023
                    </p>
                  )}
                  {isCurrent && (
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-secondary">
                      <span className="inline-block size-2 animate-pulse rounded-full bg-secondary" />
                      Current ceiling
                    </p>
                  )}
                  {isLast && (
                    <p className="text-xs text-muted-foreground">
                      Final ceiling
                    </p>
                  )}
                </button>
                {!isLast && (
                  <hr
                    className={
                      index < dateKeys.indexOf(selectedDate)
                        ? "bg-secondary"
                        : ""
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
