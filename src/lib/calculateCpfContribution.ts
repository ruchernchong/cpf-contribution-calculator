import {
  CPF_INCOME_CEILING,
  CPF_INCOME_CEILING_BEFORE_SEPT_2023,
  DEFAULT_EMPLOYEE_CONTRIBUTION,
  DEFAULT_EMPLOYER_CONTRIBUTION,
} from "../config";
import type { ContributionResult, IncomeOptions } from "../types";

export const calculateCpfContribution = (
  income: number,
  year: number | string,
  options?: IncomeOptions
): ContributionResult => {
  const employeeContribution = DEFAULT_EMPLOYEE_CONTRIBUTION;
  const employerContribution = DEFAULT_EMPLOYER_CONTRIBUTION;
  const totalCpfContribution = employeeContribution + employerContribution;

  let incomeCeiling = CPF_INCOME_CEILING[year];
  if (options?.useCeilingBeforeSep2023) {
    incomeCeiling = CPF_INCOME_CEILING_BEFORE_SEPT_2023;
  }

  if (income <= incomeCeiling) {
    return {
      contribution: {
        employee: employeeContribution * income,
        employer: Math.round(employerContribution * income),
        total: totalCpfContribution * income,
      },
      afterCpfContribution: (1 - employeeContribution) * income,
    };
  }

  return {
    contribution: {
      employee: employeeContribution * incomeCeiling,
      employer: Math.round(employerContribution * incomeCeiling),
      total: totalCpfContribution * incomeCeiling,
    },
    afterCpfContribution: income - employeeContribution * incomeCeiling,
  };
};
