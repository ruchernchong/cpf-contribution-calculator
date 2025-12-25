import { File01Icon, Share01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useAtomValue } from "jotai";
import { contributionRateAtom } from "@/atoms/income-ceiling-atom";
import { contributionResultAtom } from "@/atoms/result-atom";
import { settingsAtom } from "@/atoms/setting-atom";
import { ageGroupAtom } from "@/atoms/user-atom";
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
import useAnimatedNumber from "@/hooks/use-animated-number";
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
          <div className="flex items-center justify-between border-b py-4">
            <p className="text-muted-foreground text-sm">Age Group</p>
            <p className="text-right font-medium">
              {ageGroup?.description || "Not specified"}
            </p>
          </div>
          <div className="flex items-center justify-between border-b py-4">
            <p className="text-muted-foreground text-sm">Gross Income</p>
            <p className="text-right font-medium">
              {safeCurrency(useAnimatedNumber(monthlyGrossIncome))}
            </p>
          </div>
          <div className="flex items-center justify-between border-b py-4">
            <p className="text-muted-foreground text-sm">Take-home Income</p>
            <p className="text-right font-medium">
              {safeCurrency(
                useAnimatedNumber(contributionResult.afterCpfContribution),
              )}
            </p>
          </div>
          <div className="flex items-center justify-between border-b py-4">
            <p className="text-muted-foreground text-sm">
              Your contribution ({safePercent(contributionRate.employee)}%)
            </p>
            <p className="text-right font-medium text-emerald-600">
              {safeCurrency(
                useAnimatedNumber(contributionResult.contribution.employee),
              )}
            </p>
          </div>
          <div className="flex items-center justify-between border-b py-4">
            <p className="text-muted-foreground text-sm">
              Company&apos;s contribution (
              {safePercent(contributionRate.employer)}
              %)
            </p>
            <p className="text-right font-medium text-emerald-600">
              {safeCurrency(
                useAnimatedNumber(contributionResult.contribution.employer),
              )}
            </p>
          </div>
          <div className="flex items-center justify-between py-4">
            <p className="text-muted-foreground text-sm">
              Total CPF contribution
            </p>
            <p className="text-right font-medium text-emerald-600">
              {safeCurrency(
                useAnimatedNumber(
                  contributionResult.contribution.totalContribution,
                ),
              )}
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-md border-orange-200 bg-orange-50 p-4">
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm">
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
          <HugeiconsIcon icon={File01Icon} className="size-4" strokeWidth={2} />
          Download PDF
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <HugeiconsIcon
            icon={Share01Icon}
            className="size-4"
            strokeWidth={2}
          />
          Share Results
        </Button>
      </CardFooter>
    </Card>
  );
};
