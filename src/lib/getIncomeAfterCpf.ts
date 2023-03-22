import { DEFAULT_EMPLOYEE_CONTRIBUTION } from "../config";

interface IncomeOptions {
  employeeContribution?: number;
  useCeilingBeforeChanges?: boolean | undefined;
}

const CPF_INCOME_CEILING_BEFORE_SEPT_2023: number = 6000;
const CPF_INCOME_CEILING: Record<string, number> = {
  2023: 6000,
  SEPT2023: 6300,
  2024: 6800,
  2025: 7400,
  2026: 8000,
};

export const getIncomeAfterCpf = (
  income: number,
  year: number | string,
  options?: IncomeOptions
) => {
  const EMPLOYEE_CONTRIBUTION: number =
    options?.employeeContribution ?? DEFAULT_EMPLOYEE_CONTRIBUTION;

  let INCOME_CEILING: number = CPF_INCOME_CEILING[year];

  if (options?.useCeilingBeforeChanges) {
    INCOME_CEILING = CPF_INCOME_CEILING_BEFORE_SEPT_2023;
  }

  if (income < INCOME_CEILING) {
    return (1 - EMPLOYEE_CONTRIBUTION) * income;
  }

  return income - EMPLOYEE_CONTRIBUTION * INCOME_CEILING;
};
