import { File01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { latestIncomeCeilingDateAtom } from "@/atoms/income-ceiling-atom";
import {
  ceilingComparisonAtom,
  contributionResultAtom,
  distributionResultsAtom,
} from "@/atoms/result-atom";
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
import {
  CPF_ACCOUNT_MAP,
  CPF_ADDITIONAL_WAGE_CEILING,
  CPF_INCOME_CEILING,
  CPF_INCOME_CEILING_BEFORE_SEPT_2023,
} from "@/constants";
import useAnimatedNumber from "@/hooks/use-animated-number";
import { openPdf, type PdfData } from "@/lib/download-pdf";
import { formatCurrency } from "@/lib/format";

export function CalculatedResult() {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const { monthlyGrossIncome } = useAtomValue(settingsAtom);
  const ageGroup = useAtomValue(ageGroupAtom);
  const contributionRate = ageGroup.contributionRate;
  const contributionResult = useAtomValue(contributionResultAtom);
  const distributionResults = useAtomValue(distributionResultsAtom);
  const ceilingComparison = useAtomValue(ceilingComparisonAtom);
  const currentCeilingDate = useAtomValue(latestIncomeCeilingDateAtom);

  const annualWage = monthlyGrossIncome * 12;
  const currentCeiling = CPF_INCOME_CEILING[currentCeilingDate];

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

  const takeHomeImpact = -ceilingComparison.takeHomePayDifference;
  const cpfImpact = -ceilingComparison.totalContributionDifference;
  const hasNoCeilingDifference = takeHomeImpact === 0 && cpfImpact === 0;

  async function handleDownloadPdf() {
    setIsGeneratingPdf(true);
    try {
      const pdfData: PdfData = {
        generatedAt: new Date(),
        ageGroup: ageGroup?.description || "Not specified",
        monthlyGrossIncome,
        takeHomeIncome: contributionResult.afterCpfContribution,
        employeeContribution: contributionResult.contribution.employee,
        employerContribution: contributionResult.contribution.employer,
        employeeRate: Math.round((contributionRate.employee ?? 0) * 100),
        employerRate: Math.round((contributionRate.employer ?? 0) * 100),
        totalContribution: contributionResult.contribution.totalContribution,
        remainingAW: remainingAdditionalWage,
        ceilingComparison: hasNoCeilingDifference
          ? null
          : {
              preCeiling: CPF_INCOME_CEILING_BEFORE_SEPT_2023,
              currentCeiling,
              takeHomeImpact,
              cpfImpact,
            },
        distribution: distributionResults.map(({ name, value }) => ({
          name: `${CPF_ACCOUNT_MAP[name]} (${name})`,
          value,
        })),
      };

      await openPdf(pdfData);
    } finally {
      setIsGeneratingPdf(false);
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Contribution Summary</CardTitle>
        <CardDescription>Your calculated CPF contributions</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div>
          <div className="flex items-center justify-between border-b py-4">
            <p className="text-muted-foreground text-sm">Age Group</p>
            <p className="text-right font-medium">
              {ageGroup?.description || "Not specified"}
            </p>
          </div>
          <div className="flex items-center justify-between border-b py-4">
            <p className="text-muted-foreground text-sm">Gross Income</p>
            <p className="text-right font-medium font-mono">
              {safeCurrency(useAnimatedNumber(monthlyGrossIncome))}
            </p>
          </div>
          <div className="flex items-center justify-between border-b py-4">
            <p className="text-muted-foreground text-sm">Take-home Income</p>
            <p className="text-right font-medium font-mono">
              {safeCurrency(
                useAnimatedNumber(contributionResult.afterCpfContribution),
              )}
            </p>
          </div>
          <div className="flex items-center justify-between border-b py-4">
            <p className="text-muted-foreground text-sm">
              Your contribution ({safePercent(contributionRate.employee)}%)
            </p>
            <p className="text-right font-medium font-mono text-accent">
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
            <p className="text-right font-medium font-mono text-accent">
              {safeCurrency(
                useAnimatedNumber(contributionResult.contribution.employer),
              )}
            </p>
          </div>
          <div className="flex items-center justify-between py-4">
            <p className="text-muted-foreground text-sm">
              Total CPF contribution
            </p>
            <p className="text-right font-mono font-semibold text-accent">
              {safeCurrency(
                useAnimatedNumber(
                  contributionResult.contribution.totalContribution,
                ),
              )}
            </p>
          </div>
        </div>
        <div className="rounded-md border border-accent/30 bg-accent/5 p-4">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">
              Remaining Additional Wage (AW) for CPF contribution
            </p>
            <p className="font-medium font-mono text-lg">
              {safeCurrency(useAnimatedNumber(remainingAdditionalWage), 0)}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
        >
          <HugeiconsIcon icon={File01Icon} className="size-4" strokeWidth={2} />
          {isGeneratingPdf ? "Generating..." : "Download PDF"}
        </Button>
      </CardFooter>
    </Card>
  );
}
