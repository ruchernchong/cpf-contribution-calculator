import {
  CPF_INCOME_CEILING,
  CPF_INCOME_CEILING_BEFORE_SEPT_2023,
  CPF_TYPE,
  DEFAULT_EMPLOYEE_CONTRIBUTION,
  DEFAULT_EMPLOYER_CONTRIBUTION,
} from "../config";
import type {
  ComputedResult,
  DistributionRate,
  DistributionResult,
  IncomeOptions,
} from "../types";

export const calculateCpfContribution = (
  income: number,
  year: number | string,
  options?: IncomeOptions
): ComputedResult => {
  let employeeContribution = DEFAULT_EMPLOYEE_CONTRIBUTION,
    employerContribution = DEFAULT_EMPLOYER_CONTRIBUTION;

  if (options?.ageGroup) {
    const contributionRate = options.ageGroup.contributionRate;
    employeeContribution = contributionRate.employee;
    employerContribution = contributionRate.employer;
  }

  const totalCpfContribution = employeeContribution + employerContribution;

  let incomeCeiling = CPF_INCOME_CEILING[year];
  if (options?.useCeilingBeforeSep2023) {
    incomeCeiling = CPF_INCOME_CEILING_BEFORE_SEPT_2023;
  }

  const distributionRate = options?.ageGroup?.distributionRate;

  const calculateDistributionValue = (
    type: string
  ): DistributionRate | undefined => {
    if (distributionRate) {
      return {
        [type]: parseInt(
          (distributionRate[type] * totalCpfContribution * income).toFixed(2)
        ),
      };
    }
  };

  const calculateContribution = (income: number) => {
    let employee, employer, total, afterCpfContribution;

    if (income <= incomeCeiling) {
      employee = +(employeeContribution * income).toFixed(2);
      employer = +(employerContribution * income).toFixed(2);
      total = totalCpfContribution * income;
      afterCpfContribution = (1 - employeeContribution) * income;
    } else {
      employee = +(employeeContribution * incomeCeiling).toFixed(2);
      employer = +(employerContribution * incomeCeiling).toFixed(2);
      total = totalCpfContribution * incomeCeiling;
      afterCpfContribution = income - employeeContribution * incomeCeiling;
    }

    return {
      contribution: { employee, employer, total },
      distribution: {
        ...calculateDistributionValue(CPF_TYPE.OA),
        ...calculateDistributionValue(CPF_TYPE.SA),
        ...calculateDistributionValue(CPF_TYPE.MA),
      },
      afterCpfContribution,
    };
  };

  return calculateContribution(income);
};
