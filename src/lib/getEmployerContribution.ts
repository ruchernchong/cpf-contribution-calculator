import { DEFAULT_EMPLOYER_CONTRIBUTION } from "../config";

interface IncomeOptions {
  employerContribution?: number;
}

const CPF_INCOME_CEILING: Record<string, number> = {
  2023: 6000,
  SEPT2023: 6300,
  2024: 6800,
  2025: 7400,
  2026: 8000,
};

export const getEmployerContribution = (
  income: number,
  year: number | string,
  options?: IncomeOptions
): number => {
  const EMPLOYER_CONTRIBUTION =
    DEFAULT_EMPLOYER_CONTRIBUTION ?? options?.employerContribution;

  let INCOME_CEILING: number = CPF_INCOME_CEILING[year];

  if (income < INCOME_CEILING) {
    return EMPLOYER_CONTRIBUTION * income;
  }

  return EMPLOYER_CONTRIBUTION * INCOME_CEILING;
};
