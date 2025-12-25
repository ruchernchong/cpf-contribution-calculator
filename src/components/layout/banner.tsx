"use client";

import { useAtomValue } from "jotai";
import { latestIncomeCeilingDateAtom } from "@/atoms/income-ceiling-atom";
import { CPF_INCOME_CEILING } from "@/constants";
import useAnimatedNumber from "@/hooks/use-animated-number";
import { formatCurrency } from "@/lib/format";

const Banner = () => {
  const latestIncomeCeilingDate = useAtomValue(latestIncomeCeilingDateAtom);
  const currentCeiling = CPF_INCOME_CEILING[latestIncomeCeilingDate];

  const formattedDate = new Date(latestIncomeCeilingDate).toLocaleDateString(
    "en-SG",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="sticky top-16 z-40 overflow-hidden">
      {/* Gradient background - Slate */}
      <div className="relative bg-primary py-3">
        {/* Subtle teal accent line at top */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-6">
            {/* Label */}
            <span className="text-sm font-medium uppercase tracking-wider text-primary-foreground/80">
              Current Income Ceiling
            </span>

            {/* Divider - Teal dot */}
            <span className="hidden size-1.5 rounded-full bg-accent md:block" />

            {/* Value - Large number */}
            <span className="font-mono text-2xl font-bold text-primary-foreground">
              {formatCurrency(useAnimatedNumber(currentCeiling))}
            </span>

            {/* Divider */}
            <span className="hidden size-1.5 rounded-full bg-accent/50 md:block" />

            {/* Effective date */}
            <span className="text-sm text-primary-foreground/70">
              Effective from {formattedDate}
            </span>
          </div>
        </div>

        {/* Subtle teal accent line at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>
    </div>
  );
};

export default Banner;
