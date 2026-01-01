"use client";

import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useAtomValue } from "jotai";
import { latestIncomeCeilingDateAtom } from "@/atoms/income-ceiling-atom";
import { ceilingComparisonAtom } from "@/atoms/result-atom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CPF_INCOME_CEILING,
  CPF_INCOME_CEILING_BEFORE_SEPT_2023,
} from "@/constants";
import useAnimatedNumber from "@/hooks/use-animated-number";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

const CeilingComparisonCard = () => {
  const comparison = useAtomValue(ceilingComparisonAtom);
  const currentCeilingDate = useAtomValue(latestIncomeCeilingDateAtom);
  const currentCeiling = CPF_INCOME_CEILING[currentCeilingDate];

  // Flip the perspective: show impact under CURRENT ceiling vs old
  // Positive = you have MORE under current ceiling
  // Negative = you have LESS under current ceiling
  const takeHomeImpact = -comparison.takeHomePayDifference;
  const cpfImpact = -comparison.totalContributionDifference;

  const animatedTakeHomeImpact = useAnimatedNumber(takeHomeImpact);
  const animatedCpfImpact = useAnimatedNumber(cpfImpact);

  const formatDifference = (value: number) => {
    const prefix = value > 0 ? "+" : "";
    return `${prefix}${formatCurrency(value)}`;
  };

  const ceilingHasIncreased =
    currentCeiling > CPF_INCOME_CEILING_BEFORE_SEPT_2023;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Ceiling Comparison</CardTitle>
        <CardDescription>Impact of income ceiling changes</CardDescription>
        {/* Timeline visual */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex flex-col items-center">
            <span className="font-mono font-semibold text-muted-foreground">
              {formatCurrency(CPF_INCOME_CEILING_BEFORE_SEPT_2023, 0)}
            </span>
            <span className="text-muted-foreground text-xs">Pre-Sept 2023</span>
          </div>
          <div className="relative flex-1">
            <div className="border-muted-foreground/40 border-t-2 border-dashed" />
            <div className="-translate-y-1/2 absolute top-1/2 right-0 size-0 border-y-4 border-y-transparent border-l-6 border-l-muted-foreground/40" />
          </div>
          <div className="flex flex-col items-center">
            <span className="font-mono font-semibold text-accent">
              {formatCurrency(currentCeiling, 0)}
            </span>
            <span className="text-muted-foreground text-xs">Current</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Comparison Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Take-home Pay Impact */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="mb-2 text-muted-foreground text-sm">
              Take-home pay impact
            </p>
            <div className="flex items-center gap-2">
              <HugeiconsIcon
                icon={takeHomeImpact >= 0 ? ArrowUp01Icon : ArrowDown01Icon}
                className={cn(
                  "size-5",
                  takeHomeImpact >= 0 ? "text-emerald-600" : "text-amber-600",
                )}
                strokeWidth={2}
              />
              <p
                className={cn(
                  "font-mono font-semibold text-lg",
                  takeHomeImpact >= 0 ? "text-emerald-600" : "text-amber-600",
                )}
              >
                {formatDifference(animatedTakeHomeImpact)}
              </p>
            </div>
            <p className="mt-2 text-muted-foreground text-xs">
              {takeHomeImpact < 0
                ? "Less take-home under current ceiling"
                : takeHomeImpact > 0
                  ? "More take-home under current ceiling"
                  : "No difference in take-home pay"}
            </p>
          </div>

          {/* CPF Contribution Impact */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="mb-2 text-muted-foreground text-sm">
              CPF contribution impact
            </p>
            <div className="flex items-center gap-2">
              <HugeiconsIcon
                icon={cpfImpact >= 0 ? ArrowUp01Icon : ArrowDown01Icon}
                className={cn(
                  "size-5",
                  cpfImpact >= 0 ? "text-accent" : "text-muted-foreground",
                )}
                strokeWidth={2}
              />
              <p
                className={cn(
                  "font-mono font-semibold text-lg",
                  cpfImpact >= 0 ? "text-accent" : "text-muted-foreground",
                )}
              >
                {formatDifference(animatedCpfImpact)}
              </p>
            </div>
            <p className="mt-2 text-muted-foreground text-xs">
              {cpfImpact > 0
                ? "More CPF savings under current ceiling"
                : cpfImpact < 0
                  ? "Less CPF under current ceiling"
                  : "No difference in CPF contributions"}
            </p>
          </div>
        </div>

        {/* Explanatory Note */}
        {ceilingHasIncreased && (
          <div className="rounded-md bg-muted/50 p-3">
            <p className="text-muted-foreground text-sm">
              The CPF income ceiling increased from{" "}
              <span className="font-medium text-foreground">
                {formatCurrency(CPF_INCOME_CEILING_BEFORE_SEPT_2023, 0)}
              </span>{" "}
              to{" "}
              <span className="font-medium text-foreground">
                {formatCurrency(currentCeiling, 0)}
              </span>
              . Higher earners now have more income subject to CPF
              contributions, increasing retirement savings but reducing
              take-home pay.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CeilingComparisonCard;
