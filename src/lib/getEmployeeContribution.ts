import { DEFAULT_EMPLOYEE_CONTRIBUTION } from "../config";

interface IncomeOptions {
  employeeContribution?: number;
}

const CPF_INCOME_CEILING: Record<string, number> = {
  2023: 6000,
  SEPT2023: 6300,
  2024: 6800,
  2025: 7400,
  2026: 8000,
};

export const getEmployeeContribution = (
  income: number,
  year: number | string,
  option?: IncomeOptions
) => {
  const EMPLOYEE_CONTRIBUTION =
    DEFAULT_EMPLOYEE_CONTRIBUTION ?? option?.employeeContribution;

  let INCOME_CEILING: number = CPF_INCOME_CEILING[year];

  if (income < INCOME_CEILING) {
    return EMPLOYEE_CONTRIBUTION * income;
  }

  return EMPLOYEE_CONTRIBUTION * INCOME_CEILING;
};
