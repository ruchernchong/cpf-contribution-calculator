interface IncomeOptions {
  useCeilingBeforeChanges?: boolean | undefined;
}

const CPF_INCOME_CEILING_BEFORE_SEPT_2023: number = 6000;
const CPF_INCOME_CEILING: Record<number, number> = {
  2023: 6000,
  2024: 6800,
  2025: 7400,
  2026: 8000,
};

export const getIncomeAfterCpf = (
  income: number,
  year: number,
  options?: IncomeOptions
) => {
  const EMPLOYEE_CONTRIBUTION: number = 0.2;

  let INCOME_CEILING: number = CPF_INCOME_CEILING[year];

  if (options?.useCeilingBeforeChanges) {
    INCOME_CEILING = CPF_INCOME_CEILING_BEFORE_SEPT_2023;
  }

  return income - EMPLOYEE_CONTRIBUTION * INCOME_CEILING;
};
