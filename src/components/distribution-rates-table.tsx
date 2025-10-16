"use client";

import { useAtomValue } from "jotai";
import { ageGroupAtom } from "@/atoms/user-atom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ageGroups } from "@/data";
import { formatPercentage } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { AgeGroup } from "@/types";

const ACCOUNT_KEYS = ["OA", "SA", "MA"] as const;

const formatDistributionRate = (value: number): string =>
  formatPercentage(value, { decimalPlaces: 1 });

interface DistributionRowProps {
  group: AgeGroup;
  isCurrentGroup: boolean;
}

const DesktopRow = ({ group, isCurrentGroup }: DistributionRowProps) => (
  <div
    className={cn(
      "grid grid-cols-4 gap-4 py-4 px-4 -mx-4 border-b last:border-0",
      isCurrentGroup && "bg-emerald-50 dark:bg-emerald-950",
    )}
  >
    <p className="font-medium">{group.description}</p>
    {ACCOUNT_KEYS.map((key) => (
      <p key={key} className="text-right">
        {formatDistributionRate(group.distributionRate[key])}
      </p>
    ))}
  </div>
);

const MobileRow = ({ group, isCurrentGroup }: DistributionRowProps) => (
  <div
    className={cn(
      "py-4 px-4 -mx-4 border-b last:border-0 space-y-2",
      isCurrentGroup && "bg-emerald-50 dark:bg-emerald-950",
    )}
  >
    <p className="font-semibold text-lg">{group.description}</p>
    <div className="grid grid-cols-3 gap-4 text-sm">
      {ACCOUNT_KEYS.map((key) => (
        <div key={key}>
          <p className="text-muted-foreground">{key}</p>
          <p className="font-medium">
            {formatDistributionRate(group.distributionRate[key])}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export const DistributionRatesTable = () => {
  const currentAgeGroup = useAtomValue(ageGroupAtom);

  const isCurrentAgeGroup = (group: AgeGroup): boolean =>
    group.description === currentAgeGroup?.description;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-center">
          CPF Distribution Rates by Age Group
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Desktop: Table-like grid */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-4 pb-4 border-b font-semibold">
            <p>Age Group</p>
            {ACCOUNT_KEYS.map((key) => (
              <p key={key} className="text-right">
                {key}
              </p>
            ))}
          </div>
          {ageGroups.map((group) => (
            <DesktopRow
              key={group.description}
              group={group}
              isCurrentGroup={isCurrentAgeGroup(group)}
            />
          ))}
        </div>

        {/* Mobile: Stacked list */}
        <div className="md:hidden space-y-4">
          {ageGroups.map((group) => (
            <MobileRow
              key={group.description}
              group={group}
              isCurrentGroup={isCurrentAgeGroup(group)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DistributionRatesTable;
