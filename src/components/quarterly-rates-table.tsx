"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CPF_ACCOUNT_INTEREST_MAP,
  QUARTERLY_CPF_RATES,
} from "@/constants/cpf-interest-rates";
import { formatPercentage } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { QuarterlyRate } from "@/types";

const ACCOUNT_KEYS = ["oa", "sa", "ma", "ra"] as const;

const formatInterestRate = (value: number): string =>
  formatPercentage(value / 100, { decimalPlaces: 2 });

interface RateRowProps {
  rate: QuarterlyRate;
  isFloorApplied: boolean;
}

const DesktopRow = ({ rate, isFloorApplied }: RateRowProps) => (
  <div
    className={cn(
      "grid grid-cols-5 gap-4 py-4 px-4 -mx-4 border-b last:border-0",
      isFloorApplied && "bg-amber-50 dark:bg-amber-950",
    )}
  >
    <p className="font-medium">{rate.quarter}</p>
    {ACCOUNT_KEYS.map((key) => (
      <p key={key} className="text-right font-mono">
        {formatInterestRate(rate[key])}
      </p>
    ))}
  </div>
);

const MobileRow = ({ rate, isFloorApplied }: RateRowProps) => (
  <div
    className={cn(
      "py-4 px-4 -mx-4 border-b last:border-0 space-y-2",
      isFloorApplied && "bg-amber-50 dark:bg-amber-950",
    )}
  >
    <div className="flex items-center justify-between">
      <p className="font-semibold text-lg">{rate.quarter}</p>
      {isFloorApplied && (
        <span className="text-xs text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded">
          Floor Applied
        </span>
      )}
    </div>
    <div className="grid grid-cols-2 gap-3 text-sm">
      {ACCOUNT_KEYS.map((key) => (
        <div key={key}>
          <p className="text-muted-foreground">
            {CPF_ACCOUNT_INTEREST_MAP[key.toUpperCase()]}
          </p>
          <p className="font-medium font-mono">{formatInterestRate(rate[key])}</p>
        </div>
      ))}
    </div>
  </div>
);

export const QuarterlyRatesTable = () => {
  // Floor rate (4%) applied in 2025 Q1-Q3
  const isFloorApplied = (rate: QuarterlyRate): boolean =>
    rate.quarter.startsWith("2025") && rate.sa === 4.0;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-center">
          Quarterly CPF Interest Rates (2024-2025)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Desktop: Table-like grid */}
        <div className="hidden md:block">
          <div className="grid grid-cols-5 gap-4 pb-4 border-b font-semibold">
            <p>Quarter</p>
            {ACCOUNT_KEYS.map((key) => (
              <p key={key} className="text-right">
                {key.toUpperCase()}
              </p>
            ))}
          </div>
          {QUARTERLY_CPF_RATES.map((rate) => (
            <DesktopRow
              key={rate.quarter}
              rate={rate}
              isFloorApplied={isFloorApplied(rate)}
            />
          ))}
        </div>

        {/* Mobile: Stacked list */}
        <div className="md:hidden space-y-4">
          {QUARTERLY_CPF_RATES.map((rate) => (
            <MobileRow
              key={rate.quarter}
              rate={rate}
              isFloorApplied={isFloorApplied(rate)}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-950 rounded-md">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <span className="font-semibold">Note:</span> Quarters highlighted in
            amber indicate when the 4% floor rate was applied because the pegged
            rate (10-year SGS + 1%) fell below the floor.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuarterlyRatesTable;
