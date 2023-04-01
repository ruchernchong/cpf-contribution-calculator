import {
  DEFAULT_EMPLOYEE_CONTRIBUTION,
  DEFAULT_EMPLOYER_CONTRIBUTION,
} from "../config";

export type Contribution = {
  employee: number;
  employer: number;
};

export type AgeGroup = {
  description: string;
  min?: number;
  max?: number;
  contribution: Contribution;
};

export type CPFIncomeCeiling = {
  year: string;
  ceiling: number;
};

export const ageGroups: AgeGroup[] = [
  {
    description: "55 and below",
    min: 0,
    max: 55,
    contribution: {
      employee: DEFAULT_EMPLOYEE_CONTRIBUTION,
      employer: DEFAULT_EMPLOYER_CONTRIBUTION,
    },
  },
  {
    description: "Above 55 to 60",
    min: 55,
    max: 60,
    contribution: { employee: 0.15, employer: 0.145 },
  },
  {
    description: "Above 60 to 65",
    min: 60,
    max: 65,
    contribution: { employee: 0.095, employer: 0.11 },
  },
  {
    description: "Above 65 to 70",
    min: 65,
    max: 70,
    contribution: { employee: 0.07, employer: 0.085 },
  },
  {
    description: "Above 70",
    min: 70,
    contribution: { employee: 0.05, employer: 0.075 },
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
