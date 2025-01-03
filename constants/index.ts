import type { CPFIncomeCeiling } from "@/types";

export const DEFAULT_CPF_INCOME_CEILING = 6000;
export const CPF_INCOME_CEILING_BEFORE_SEPT_2023: number = 6000;
export const CPF_ADDITIONAL_WAGE_CEILING: number = 102000;

export const CPF_INCOME_CEILING: CPFIncomeCeiling = {
  "2023-01-01": 6000,
  "2023-09-01": 6300,
  "2024-01-01": 6800,
  "2025-01-01": 7400,
  "2026-01-01": 8000,
};
