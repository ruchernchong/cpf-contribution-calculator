import {
  CPF_INCOME_CEILING,
  CPF_INCOME_CEILING_BEFORE_SEPT_2023,
  CPF_TYPE,
  DEFAULT_EMPLOYEE_CONTRIBUTION_RATE,
  DEFAULT_EMPLOYER_CONTRIBUTION_RATE,
} from "../config";
import type { ComputedResult, DistributionRate, IncomeOptions } from "../types";

export const calculateCpfContribution = (
  income: number,
  year: number | string,
  options?: IncomeOptions,
): ComputedResult => {
  const { ageGroup, useCeilingBeforeSep2023 } = options || {};

  const {
    employee: employeeContributionRate = DEFAULT_EMPLOYEE_CONTRIBUTION_RATE,
    employer: employerContributionRate = DEFAULT_EMPLOYER_CONTRIBUTION_RATE,
  } = ageGroup?.contributionRate || {};

  const totalCpfContributionRate =
    employeeContributionRate + employerContributionRate;

  const incomeCeiling = useCeilingBeforeSep2023
    ? CPF_INCOME_CEILING_BEFORE_SEPT_2023
    : CPF_INCOME_CEILING[year];

  const distributionRate = ageGroup?.distributionRate;

  const calculateDistributionValue = (
    cpfContribution: number,
    type: string,
  ): DistributionRate | undefined => {
    if (distributionRate) {
      return {
        [type]: parseFloat(
          (distributionRate[type] * cpfContribution).toFixed(2),
        ),
      };
    }
  };

  const calculateContribution = (income: number): ComputedResult => {
    const cappedIncome = income >= incomeCeiling ? incomeCeiling : income;
    const employee = parseFloat(
      (employeeContributionRate * cappedIncome).toFixed(2),
    );
    const employer = parseFloat(
      (employerContributionRate * cappedIncome).toFixed(2),
    );
    const totalCpfContribution = parseFloat(
      (totalCpfContributionRate * cappedIncome).toFixed(2),
    );
    const afterCpfContribution =
      income - employeeContributionRate * cappedIncome;

    return {
      contribution: {
        employee,
        employer,
        totalContribution: totalCpfContribution,
      },
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
