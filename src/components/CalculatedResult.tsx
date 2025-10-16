import { useAtomValue } from "jotai";
import { FileText, Share } from "lucide-react";
import React from "react";
import { contributionRateAtom } from "@/atoms/incomeCeilingAtom";
import { contributionResultAtom } from "@/atoms/resultAtom";
import { settingsAtom } from "@/atoms/settingAtom";
import { ageGroupAtom } from "@/atoms/userAtom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CPF_ADDITIONAL_WAGE_CEILING } from "@/constants";
import useAnimatedNumber from "@/hooks/useAnimatedNumber";
import { formatCurrency } from "@/lib/format";

export const CalculatedResult = () => {
  const contributionRate = useAtomValue(contributionRateAtom);
  const { monthlyGrossIncome } = useAtomValue(settingsAtom);
  const ageGroup = useAtomValue(ageGroupAtom);
  const contributionResult = useAtomValue(contributionResultAtom);

  const annualWage = monthlyGrossIncome * 12;

  // Helper function to safely format currency with fallback
  const safeCurrency = (value: number | undefined, decimalPlaces = 2) => {
    if (!value || Number.isNaN(value)) {
      return formatCurrency(0, decimalPlaces);
    }
    return formatCurrency(value, decimalPlaces);
  };

  // Helper function to safely format percentage with fallback
  const safePercent = (value: number | undefined) => {
    if (!value || Number.isNaN(value)) return "0";
    return (value * 100).toFixed(0);
  };

  const additionalWageGap = CPF_ADDITIONAL_WAGE_CEILING - annualWage;
  const remainingAdditionalWage = Math.max(0, additionalWageGap);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Contribution Summary</CardTitle>
        <CardDescription>Your calculated CPF contributions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-0">
          <div className="py-4 flex justify-between items-center border-b">
            <p className="text-sm text-muted-foreground">Age Group</p>
            <p className="font-medium text-right">
              {ageGroup?.description || "Not specified"}
            </p>
          </div>
          <div className="py-4 flex justify-between items-center border-b">
            <p className="text-sm text-muted-foreground">Gross Income</p>
            <p className="font-medium text-right">
              {safeCurrency(useAnimatedNumber(monthlyGrossIncome))}
            </p>
          </div>
          <div className="py-4 flex justify-between items-center border-b">
            <p className="text-sm text-muted-foreground">Take-home Income</p>
            <p className="font-medium text-right">
              {safeCurrency(
                useAnimatedNumber(contributionResult.afterCpfContribution),
              )}
            </p>
          </div>
          <div className="py-4 flex justify-between items-center border-b">
            <p className="text-sm text-muted-foreground">
              Your contribution ({safePercent(contributionRate.employee)}%)
            </p>
            <p className="font-medium text-emerald-600 text-right">
              {safeCurrency(
                useAnimatedNumber(contributionResult.contribution.employee),
              )}
            </p>
          </div>
          <div className="py-4 flex justify-between items-center border-b">
            <p className="text-sm text-muted-foreground">
              Company&apos;s contribution (
              {safePercent(contributionRate.employer)}
              %)
            </p>
            <p className="font-medium text-emerald-600 text-right">
              {safeCurrency(
                useAnimatedNumber(contributionResult.contribution.employer),
              )}
            </p>
          </div>
          <div className="py-4 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Total CPF contribution
            </p>
            <p className="font-medium text-emerald-600 text-right">
              {safeCurrency(
                useAnimatedNumber(
                  contributionResult.contribution.totalContribution,
                ),
              )}
            </p>
          </div>
        </div>
        <div className="mt-4 p-4 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950 dark:text-orange-200 rounded-md">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Remaining Additional Wage (AW) for CPF contribution
            </p>
            <p className="font-medium text-lg">
              {safeCurrency(useAnimatedNumber(remainingAdditionalWage), 0)}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" className="gap-2">
          <FileText className="h-4 w-4" />
          Download PDF
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Share className="h-4 w-4" />
          Share Results
        </Button>
      </CardFooter>
    </Card>
  );
};
