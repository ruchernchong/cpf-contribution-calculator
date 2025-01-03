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
      employeeContribution,
      employerContribution,
      totalContribution,
    },
    grossIncome,
    takeHomeIncome,
    remainingAW,
  } = result;

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
              <p className="font-medium">{ageGroup.description}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Gross income</p>
              <p className="font-medium">{formatCurrency(grossIncome)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Your contribution ({(ageGroup.contributionRate.employee * 100).toFixed(0)}%)</p>
              <p className="font-medium text-emerald-600">
                {formatCurrency(employeeContribution)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Take home income</p>
              <p className="font-medium">{formatCurrency(takeHomeIncome)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Company's contribution ({(ageGroup.contributionRate.employer * 100).toFixed(0)}%)</p>
              <p className="font-medium text-emerald-600">
                {formatCurrency(employerContribution)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total CPF contribution</p>
              <p className="font-medium text-emerald-600">
                {formatCurrency(totalContribution)}
              </p>
            </div>
          </div>
          <div className="pt-4 border-t">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Remaining Additional Wage (AW) for CPF contribution
              </p>
              <p className="font-medium">{formatCurrency(remainingAW)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
