"use client";

import { HelpCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
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
    <div className="flex flex-col gap-12">
      {/* Overview Section */}
      <div className="flex flex-col gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-center">
              Understanding CPF Interest Rates
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* OA Floor Rate Card - Navy theme */}
              <div className="flex flex-col gap-2 rounded-lg border border-chart-1/20 bg-chart-1/5 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-chart-1">
                    {CPF_ACCOUNT_INTEREST_MAP.OA}
                  </h3>
                  <Tooltip>
                    <TooltipTrigger className="cursor-help">
                      <HugeiconsIcon
                        icon={HelpCircleIcon}
                        className="size-5 text-chart-1"
                        strokeWidth={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>
                        The Ordinary Account (OA) has a fixed floor rate and is
                        not pegged to SGS yields. It earns a minimum of 2.5% per
                        annum.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="font-mono text-3xl font-bold text-chart-1">
                  {formatPercentage(CPF_INTEREST_FLOOR_RATES.OA / 100, {
                    decimalPlaces: 1,
                  })}{" "}
                  p.a.
                </p>
                <p className="text-sm text-muted-foreground">
                  Fixed floor rate (not pegged to SGS)
                </p>
              </div>

              {/* SMRA Floor + Pegged Rate Card - Slate theme */}
              <div className="flex flex-col gap-2 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-primary">
                    {CPF_ACCOUNT_INTEREST_MAP.SMRA}
                  </h3>
                  <Tooltip>
                    <TooltipTrigger className="cursor-help">
                      <HugeiconsIcon
                        icon={HelpCircleIcon}
                        className="size-5 text-primary"
                        strokeWidth={2}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>
                        SMRA (Special, MediSave & Retirement Accounts) interest
                        rate is pegged to the 12-month average of 10-year SGS
                        yield plus 1%, with a minimum floor of 4%.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="font-mono text-3xl font-bold text-primary">
                  {formatPercentage(CPF_INTEREST_FLOOR_RATES.SMRA / 100, {
                    decimalPlaces: 1,
                  })}{" "}
                  p.a.
                </p>
                <p className="text-sm text-muted-foreground">
                  Floor rate (minimum guaranteed)
                </p>
                <div className="rounded bg-background/50 p-2">
                  <p className="text-xs font-medium text-foreground">
                    Pegged Formula:
                  </p>
                  <p className="text-xs text-muted-foreground">
                    10-year SGS yield + 1% OR floor rate, whichever is higher
                  </p>
                </div>
              </div>
            </div>

            {/* Key Differences Explanation */}
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <h4 className="pb-3 font-semibold text-foreground">
                Floor Rate vs Pegged Rate
              </h4>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
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
        <h3 className="pb-6 text-center text-2xl font-semibold">
          Interest Rate Trend
        </h3>
        <InterestRateTrendChart />
      </div>

      {/* Quarterly Rates Section */}
      <div>
        <h3 className="pb-6 text-center text-2xl font-semibold">
          Quarterly Interest Rates
        </h3>
        <QuarterlyRatesTable />
      </div>
    </div>
  );
};

export default CPFInterestRatesSection;
