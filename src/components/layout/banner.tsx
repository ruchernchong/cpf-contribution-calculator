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
    <div className="sticky top-0 z-50 bg-zinc-800 py-2 text-zinc-50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col items-center md:flex-row md:gap-4">
          <div className="flex items-center md:gap-2">
            <span className="font-semibold">Current Income Ceiling</span>
          </div>
          <span className="hidden md:inline-block">•</span>
          <span className="font-bold text-xl">
            {formatCurrency(useAnimatedNumber(currentCeiling))}
          </span>
          <span className="hidden md:inline-block">•</span>
          <span className="text-sm text-zinc-200">
            Effective from {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
