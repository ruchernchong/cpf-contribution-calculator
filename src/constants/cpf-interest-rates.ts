import type { MonthlyYield, QuarterlyRate } from "@/types";

// CPF interest rate floor rates
export const CPF_INTEREST_FLOOR_RATES = {
  OA: 2.5,
  SMRA: 4.0, // Special, MediSave, Retirement Accounts
} as const;

// Pegged rate markup: SMRA = 10-year SGS + 1%
export const PEGGED_RATE_MARKUP = 1.0;

// CPF account names mapping
export const CPF_ACCOUNT_INTEREST_MAP: Record<string, string> = {
  OA: "Ordinary Account (OA)",
  SA: "Special Account (SA)",
  MA: "MediSave Account (MA)",
  RA: "Retirement Account (RA)",
  SMRA: "Special, MediSave & Retirement Accounts",
};

// Historical 10-year SGS yields (monthly data for 12-month trend)
// Data from October 2024 to September 2025
export const SGS_YIELDS_MONTHLY: MonthlyYield[] = [
  { month: "2024-10", yield: 2.95 },
  { month: "2024-11", yield: 2.88 },
  { month: "2024-12", yield: 2.92 },
  { month: "2025-01", yield: 2.85 },
  { month: "2025-02", yield: 2.9 },
  { month: "2025-03", yield: 2.87 },
  { month: "2025-04", yield: 2.83 },
  { month: "2025-05", yield: 2.79 },
  { month: "2025-06", yield: 2.75 },
  { month: "2025-07", yield: 2.72 },
  { month: "2025-08", yield: 2.68 },
  { month: "2025-09", yield: 2.65 },
];

// Quarterly CPF interest rates
// Data from 2024 Q1 to 2025 Q3
export const QUARTERLY_CPF_RATES: QuarterlyRate[] = [
  {
    quarter: "2024 Q1",
    oa: 2.5,
    sa: 4.08,
    ma: 4.08,
    ra: 4.08,
  },
  {
    quarter: "2024 Q2",
    oa: 2.5,
    sa: 4.05,
    ma: 4.05,
    ra: 4.05,
  },
  {
    quarter: "2024 Q3",
    oa: 2.5,
    sa: 4.08,
    ma: 4.08,
    ra: 4.08,
  },
  {
    quarter: "2024 Q4",
    oa: 2.5,
    sa: 4.14,
    ma: 4.14,
    ra: 4.14,
  },
  {
    quarter: "2025 Q1",
    oa: 2.5,
    sa: 4.0,
    ma: 4.0,
    ra: 4.0,
  },
  {
    quarter: "2025 Q2",
    oa: 2.5,
    sa: 4.0,
    ma: 4.0,
    ra: 4.0,
  },
  {
    quarter: "2025 Q3",
    oa: 2.5,
    sa: 4.0,
    ma: 4.0,
    ra: 4.0,
  },
];
