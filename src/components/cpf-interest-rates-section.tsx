"use client";

import { QuestionMarkCircleIcon } from "@heroicons/react/16/solid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CPF_ACCOUNT_INTEREST_MAP,
  CPF_INTEREST_FLOOR_RATES,
} from "@/constants/cpf-interest-rates";
import { formatPercentage } from "@/lib/format";
import { InterestRateTrendChart } from "./interest-rate-trend-chart";
import { QuarterlyRatesTable } from "./quarterly-rates-table";

export const CPFInterestRatesSection = () => {
  return (
    <div className="space-y-12">
      {/* Overview Section */}
      <div className="space-y-6">
        <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-center">
            Understanding CPF Interest Rates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* OA Floor Rate Card */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  {CPF_ACCOUNT_INTEREST_MAP.OA}
                </h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <QuestionMarkCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>
                        The Ordinary Account (OA) has a fixed floor rate and is
                        not pegged to SGS yields. It earns a minimum of 2.5% per
                        annum.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">
                {formatPercentage(CPF_INTEREST_FLOOR_RATES.OA / 100, { decimalPlaces: 1 })} p.a.
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Fixed floor rate (not pegged to SGS)
              </p>
            </div>

            {/* SMRA Floor + Pegged Rate Card */}
            <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">
                  {CPF_ACCOUNT_INTEREST_MAP.SMRA}
                </h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <QuestionMarkCircleIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>
                        SMRA (Special, MediSave & Retirement Accounts) interest
                        rate is pegged to the 12-month average of 10-year SGS
                        yield plus 1%, with a minimum floor of 4%.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-300 mb-2">
                {formatPercentage(CPF_INTEREST_FLOOR_RATES.SMRA / 100, { decimalPlaces: 1 })} p.a.
              </p>
              <p className="text-sm text-emerald-800 dark:text-emerald-200 mb-2">
                Floor rate (minimum guaranteed)
              </p>
              <div className="p-2 bg-white/50 dark:bg-black/20 rounded">
                <p className="text-xs text-emerald-900 dark:text-emerald-100 font-medium">
                  Pegged Formula:
                </p>
                <p className="text-xs text-emerald-800 dark:text-emerald-200">
                  10-year SGS yield + 1% OR floor rate, whichever is higher
                </p>
              </div>
            </div>
          </div>

          {/* Key Differences Explanation */}
          <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <h4 className="font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
              Floor Rate vs Pegged Rate
            </h4>
            <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <div className="flex gap-2">
                <span className="font-semibold min-w-[120px]">Floor Rate:</span>
                <span>
                  The minimum guaranteed interest rate your CPF accounts will
                  earn, regardless of market conditions.
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold min-w-[120px]">Pegged Rate:</span>
                <span>
                  For SMRA accounts, the interest rate is linked (pegged) to the
                  12-month average of 10-year Singapore Government Securities
                  (SGS) yield, plus 1%.
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold min-w-[120px]">Actual Rate:</span>
                <span>
                  You always receive the higher of the two rates - either the
                  pegged rate or the floor rate.
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>

      {/* Trend Chart Section */}
      <div>
        <h3 className="mb-6 text-center font-semibold text-2xl">
          Interest Rate Trend
        </h3>
        <InterestRateTrendChart />
      </div>

      {/* Quarterly Rates Section */}
      <div>
        <h3 className="mb-6 text-center font-semibold text-2xl">
          Quarterly Interest Rates
        </h3>
        <QuarterlyRatesTable />
      </div>
    </div>
  );
};

export default CPFInterestRatesSection;
