import React from 'react';
import { useAtomValue } from 'jotai';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { contributionResultAtom } from '@/atoms/resultAtom';
import { formatCurrency } from '@/lib/format';
import { ageGroupAtom } from '@/atoms/userAtom';

export const CalculatedResult = () => {
  const result = useAtomValue(contributionResultAtom);
  const ageGroup = useAtomValue(ageGroupAtom);

  const {
    contribution: {
      employeeContribution = 0,
      employerContribution = 0,
      totalContribution = 0,
    },
    grossIncome = 0,
    takeHomeIncome = 0,
    remainingAW = 0,
  } = result || {};

  // Helper function to safely format currency with fallback
  const safeCurrency = (value: number | undefined) => {
    if (!value || isNaN(value)) return formatCurrency(0);
    return formatCurrency(value);
  };

  // Helper function to safely format percentage with fallback
  const safePercent = (value: number | undefined) => {
    if (!value || isNaN(value)) return '0';
    return (value * 100).toFixed(0);
  };

  const employeeRate = ageGroup?.contributionRate?.employee || 0;
  const employerRate = ageGroup?.contributionRate?.employer || 0;

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
              <p className="font-medium">{ageGroup?.description || 'Not specified'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Gross income</p>
              <p className="font-medium">{safeCurrency(grossIncome)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Your contribution ({safePercent(employeeRate)}%)</p>
              <p className="font-medium text-emerald-600">
                {safeCurrency(employeeContribution)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Take home income</p>
              <p className="font-medium">{safeCurrency(takeHomeIncome)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Company's contribution ({safePercent(employerRate)}%)</p>
              <p className="font-medium text-emerald-600">
                {safeCurrency(employerContribution)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total CPF contribution</p>
              <p className="font-medium text-emerald-600">
                {safeCurrency(totalContribution)}
              </p>
            </div>
          </div>
          <div className="pt-4 border-t">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Remaining Additional Wage (AW) for CPF contribution
              </p>
              <p className="font-medium">{safeCurrency(remainingAW)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
