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
      "-mx-4 grid grid-cols-5 gap-4 border-b px-4 py-4 last:border-0",
      isFloorApplied && "bg-amber-50",
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
      "-mx-4 flex flex-col gap-2 border-b px-4 py-4 last:border-0",
      isFloorApplied && "bg-amber-50",
    )}
  >
    <div className="flex items-center justify-between">
      <p className="font-semibold text-lg">{rate.quarter}</p>
      {isFloorApplied && (
        <span className="rounded bg-amber-100 px-2 py-1 text-amber-700 text-xs">
          Floor Applied
        </span>
      )}
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm">
      {ACCOUNT_KEYS.map((key) => (
        <div key={key}>
          <p className="text-muted-foreground">
            {CPF_ACCOUNT_INTEREST_MAP[key.toUpperCase()]}
          </p>
          <p className="font-medium font-mono">
            {formatInterestRate(rate[key])}
          </p>
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
      <CardContent className="flex flex-col gap-6">
        {/* Desktop: Table-like grid */}
        <div className="hidden md:block">
          <div className="grid grid-cols-5 gap-4 border-b pb-4 font-semibold">
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
        <div className="flex flex-col gap-4 md:hidden">
          {QUARTERLY_CPF_RATES.map((rate) => (
            <MobileRow
              key={rate.quarter}
              rate={rate}
              isFloorApplied={isFloorApplied(rate)}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="rounded-md bg-blue-50 p-4">
          <p className="text-blue-900 text-sm">
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
