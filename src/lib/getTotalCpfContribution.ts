import { Contribution } from "../data";

interface IncomeOptions {
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

export const getTotalCpfContribution = (
  income: number,
  year: number | string,
  contribution: Contribution,
  options?: IncomeOptions
): number => {
  const TOTAL_CONTRIBUTION = Object.values(contribution).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  let INCOME_CEILING: number = CPF_INCOME_CEILING[year];

  if (options?.useCeilingBeforeChanges) {
    INCOME_CEILING = CPF_INCOME_CEILING_BEFORE_SEPT_2023;
  }

  if (income < INCOME_CEILING) {
    return TOTAL_CONTRIBUTION * income;
  }

  return TOTAL_CONTRIBUTION * INCOME_CEILING;
};
