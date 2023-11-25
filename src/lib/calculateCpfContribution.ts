import {
  CPF_INCOME_CEILING,
  CPF_INCOME_CEILING_BEFORE_SEPT_2023,
  CPF_TYPE,
  DEFAULT_EMPLOYEE_CONTRIBUTION_RATE,
  DEFAULT_EMPLOYER_CONTRIBUTION_RATE,
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
  let employeeContributionRate = DEFAULT_EMPLOYEE_CONTRIBUTION_RATE,
    employerContributionRate = DEFAULT_EMPLOYER_CONTRIBUTION_RATE;

  if (options?.ageGroup) {
    const contributionRate = options.ageGroup.contributionRate;
    employeeContributionRate = contributionRate.employee;
    employerContributionRate = contributionRate.employer;
  }

  const totalCpfContributionRate =
    employeeContributionRate + employerContributionRate;

  let incomeCeiling = CPF_INCOME_CEILING[year];
  if (options?.useCeilingBeforeSep2023) {
    incomeCeiling = CPF_INCOME_CEILING_BEFORE_SEPT_2023;
  }

  const distributionRate = options?.ageGroup?.distributionRate;

  const calculateDistributionValue = (
    cpfContribution: number,
    type: string
  ): DistributionRate | undefined => {
    if (distributionRate) {
      return {
        [type]: parseFloat(
          (distributionRate[type] * cpfContribution).toFixed(2)
        ),
      };
    }
  };

  const calculateContribution = (income: number): ComputedResult => {
    let employee = 0,
      employer = 0,
      totalCpfContribution = 0,
      afterCpfContribution = 0;

    if (income > 0) {
      if (income <= incomeCeiling) {
        employee = +(employeeContributionRate * income).toFixed(2);
        employer = +(employerContributionRate * income).toFixed(2);
        totalCpfContribution = totalCpfContributionRate * income;
        afterCpfContribution = (1 - employeeContributionRate) * income;
      } else {
        employee = +(employeeContributionRate * incomeCeiling).toFixed(2);
        employer = +(employerContributionRate * incomeCeiling).toFixed(2);
        totalCpfContribution = totalCpfContributionRate * incomeCeiling;
        afterCpfContribution =
          income - employeeContributionRate * incomeCeiling;
      }
    }

    return {
      contribution: { employee, employer, total: totalCpfContribution },
      distribution: {
        ...calculateDistributionValue(totalCpfContribution, CPF_TYPE.OA),
        ...calculateDistributionValue(totalCpfContribution, CPF_TYPE.SA),
        ...calculateDistributionValue(totalCpfContribution, CPF_TYPE.MA),
      },
      afterCpfContribution,
    };
  };

  return calculateContribution(income);
};
