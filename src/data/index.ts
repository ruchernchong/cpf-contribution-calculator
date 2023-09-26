import {
  DEFAULT_EMPLOYEE_CONTRIBUTION,
  DEFAULT_EMPLOYER_CONTRIBUTION,
} from "../config";
import type { AgeGroup, CPFIncomeCeiling } from "../types";

export const ageGroups: AgeGroup[] = [
  {
    description: "55 and below",
    min: 0,
    max: 55,
    contributionRate: {
      employee: DEFAULT_EMPLOYEE_CONTRIBUTION,
      employer: DEFAULT_EMPLOYER_CONTRIBUTION,
    },
  },
  {
    description: "Above 55 to 60",
    min: 55,
    max: 60,
    contributionRate: { employee: 0.15, employer: 0.145 },
  },
  {
    description: "Above 60 to 65",
    min: 60,
    max: 65,
    contributionRate: { employee: 0.095, employer: 0.11 },
  },
  {
    description: "Above 65 to 70",
    min: 65,
    max: 70,
    contributionRate: { employee: 0.07, employer: 0.085 },
  },
  {
    description: "Above 70",
    min: 70,
    contributionRate: { employee: 0.05, employer: 0.075 },
  },
];

export const cpfIncomeCeilings: CPFIncomeCeiling[] = [
  {
    year: "2023",
    ceiling: 6000,
  },
  {
    year: "SEPT2023",
    ceiling: 6300,
    current: true,
  },
  {
    year: "2024",
    ceiling: 6800,
  },
  {
    year: "2025",
    ceiling: 7400,
  },
  {
    year: "2026",
    ceiling: 8000,
  },
];
