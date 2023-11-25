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
      cpfContribution = 0,
      afterCpfContribution = 0;

    if (income > 0) {
      if (income <= incomeCeiling) {
        employee = +(employeeContribution * income).toFixed(2);
        employer = +(employerContribution * income).toFixed(2);
        cpfContribution = totalCpfContribution * income;
        afterCpfContribution = (1 - employeeContribution) * income;
      } else {
        employee = +(employeeContribution * incomeCeiling).toFixed(2);
        employer = +(employerContribution * incomeCeiling).toFixed(2);
        cpfContribution = totalCpfContribution * incomeCeiling;
        afterCpfContribution = income - employeeContribution * incomeCeiling;
      }
    }

    return {
      contribution: { employee, employer, total: cpfContribution },
      distribution: {
        ...calculateDistributionValue(cpfContribution, CPF_TYPE.OA),
        ...calculateDistributionValue(cpfContribution, CPF_TYPE.SA),
        ...calculateDistributionValue(cpfContribution, CPF_TYPE.MA),
      },
      afterCpfContribution,
    };
  };

  return calculateContribution(income);
};
