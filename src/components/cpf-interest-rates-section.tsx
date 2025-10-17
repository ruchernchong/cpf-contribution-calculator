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
              <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold text-blue-900">
                    {CPF_ACCOUNT_INTEREST_MAP.OA}
                  </h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <QuestionMarkCircleIcon className="h-5 w-5 cursor-help text-blue-600" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          The Ordinary Account (OA) has a fixed floor rate and
                          is not pegged to SGS yields. It earns a minimum of
                          2.5% per annum.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="mb-2 font-bold text-3xl text-blue-700">
                  {formatPercentage(CPF_INTEREST_FLOOR_RATES.OA / 100, {
                    decimalPlaces: 1,
                  })}{" "}
                  p.a.
                </p>
                <p className="text-blue-800 text-sm">
                  Fixed floor rate (not pegged to SGS)
                </p>
              </div>

              {/* SMRA Floor + Pegged Rate Card */}
              <div className="rounded-lg border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold text-emerald-900">
                    {CPF_ACCOUNT_INTEREST_MAP.SMRA}
                  </h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <QuestionMarkCircleIcon className="h-5 w-5 cursor-help text-emerald-600" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>
                          SMRA (Special, MediSave & Retirement Accounts)
                          interest rate is pegged to the 12-month average of
                          10-year SGS yield plus 1%, with a minimum floor of 4%.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="mb-2 font-bold text-3xl text-emerald-700">
                  {formatPercentage(CPF_INTEREST_FLOOR_RATES.SMRA / 100, {
                    decimalPlaces: 1,
                  })}{" "}
                  p.a.
                </p>
                <p className="mb-2 text-emerald-800 text-sm">
                  Floor rate (minimum guaranteed)
                </p>
                <div className="rounded bg-white/50 p-2">
                  <p className="font-medium text-emerald-900 text-xs">
                    Pegged Formula:
                  </p>
                  <p className="text-emerald-800 text-xs">
                    10-year SGS yield + 1% OR floor rate, whichever is higher
                  </p>
                </div>
              </div>
            </div>

            {/* Key Differences Explanation */}
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <h4 className="mb-3 font-semibold text-zinc-900">
                Floor Rate vs Pegged Rate
              </h4>
              <div className="space-y-2 text-sm text-zinc-700">
                <div className="flex gap-2">
                  <span className="min-w-[120px] font-semibold">
                    Floor Rate:
                  </span>
                  <span>
                    The minimum guaranteed interest rate your CPF accounts will
                    earn, regardless of market conditions.
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="min-w-[120px] font-semibold">
                    Pegged Rate:
                  </span>
                  <span>
                    For SMRA accounts, the interest rate is linked (pegged) to
                    the 12-month average of 10-year Singapore Government
                    Securities (SGS) yield, plus 1%.
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="min-w-[120px] font-semibold">
                    Actual Rate:
                  </span>
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
