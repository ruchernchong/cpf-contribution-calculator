import { contributionRateAtom } from "@/atoms/incomeCeilingAtom";
import { contributionResultAtom } from "@/atoms/resultAtom";
import { settingsAtom } from "@/atoms/settingAtom";
import { ageGroupAtom } from "@/atoms/userAtom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CPF_ADDITIONAL_WAGE_CEILING } from "@/config";
import { formatCurrency } from "@/lib/format";
import { useAtomValue } from "jotai";
import React from "react";

export const CalculatedResult = () => {
  const contributionRate = useAtomValue(contributionRateAtom);
  const { monthlyGrossIncome } = useAtomValue(settingsAtom);
  const ageGroup = useAtomValue(ageGroupAtom);
  const contributionResult = useAtomValue(contributionResultAtom);

  const annualWage = monthlyGrossIncome * 12;

  // Helper function to safely format currency with fallback
  const safeCurrency = (value: number | undefined) => {
    if (!value || isNaN(value)) return formatCurrency(0);
    return formatCurrency(value);
  };

  // Helper function to safely format percentage with fallback
  const safePercent = (value: number | undefined) => {
    if (!value || isNaN(value)) return "0";
    return (value * 100).toFixed(0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contribution Summary</CardTitle>
        <CardDescription>Your calculated CPF contributions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Age Group</p>
              <p className="font-medium">
                {ageGroup?.description || "Not specified"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Gross income</p>
              <p className="font-medium">{safeCurrency(monthlyGrossIncome)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Your contribution ({safePercent(contributionRate.employee)}%)
              </p>
              <p className="font-medium text-emerald-600">
                {safeCurrency(contributionResult.contribution.employee)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Take home income</p>
              <p className="font-medium">
                {safeCurrency(contributionResult.afterCpfContribution)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Company&apos;s contribution (
                {safePercent(contributionRate.employer)}
                %)
              </p>
              <p className="font-medium text-emerald-600">
                {safeCurrency(contributionResult.contribution.employer)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Total CPF contribution
              </p>
              <p className="font-medium text-emerald-600">
                {safeCurrency(
                  contributionResult.contribution.totalContribution,
                )}
              </p>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Remaining Additional Wage (AW) for CPF contribution
              </p>
              <p className="font-medium">
                {safeCurrency(CPF_ADDITIONAL_WAGE_CEILING - annualWage)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
