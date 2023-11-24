import {
  DEFAULT_EMPLOYEE_CONTRIBUTION,
  DEFAULT_EMPLOYER_CONTRIBUTION,
} from "../config";
import type { AgeGroup, CPFIncomeCeiling } from "../types";

export const ageGroups: AgeGroup[] = [
  {
    description: "55 and below",
    min: 0,
    max: 35,
    contributionRate: {
      employee: DEFAULT_EMPLOYEE_CONTRIBUTION,
      employer: DEFAULT_EMPLOYER_CONTRIBUTION,
    },
    distributionRate: { OA: 0.6217, SA: 0.1621, MA: 0.2162 },
  },
  {
    description: "55 and below",
    min: 35,
    max: 45,
    contributionRate: {
      employee: DEFAULT_EMPLOYEE_CONTRIBUTION,
      employer: DEFAULT_EMPLOYER_CONTRIBUTION,
    },
    distributionRate: { OA: 0.5677, SA: 0.1891, MA: 0.2432 },
  },
  {
    description: "55 and below",
    min: 45,
    max: 50,
    contributionRate: {
      employee: DEFAULT_EMPLOYEE_CONTRIBUTION,
      employer: DEFAULT_EMPLOYER_CONTRIBUTION,
    },
    distributionRate: { OA: 0.5136, SA: 0.2162, MA: 0.2702 },
  },
  {
    description: "55 and below",
    min: 50,
    max: 55,
    contributionRate: {
      employee: DEFAULT_EMPLOYEE_CONTRIBUTION,
      employer: DEFAULT_EMPLOYER_CONTRIBUTION,
    },
    distributionRate: { OA: 0.4055, SA: 0.3108, MA: 0.2837 },
  },
  {
    description: "Above 55 to 60",
    min: 55,
    max: 60,
    contributionRate: { employee: 0.15, employer: 0.145 },
    distributionRate: { OA: 0.4069, SA: 0.2372, MA: 0.3559 },
  },
  {
    description: "Above 60 to 65",
    min: 60,
    max: 65,
    contributionRate: { employee: 0.095, employer: 0.11 },
    distributionRate: { OA: 0.1709, SA: 0.317, MA: 0.5121 },
  },
  {
    description: "Above 65 to 70",
    min: 65,
    max: 70,
    contributionRate: { employee: 0.07, employer: 0.085 },
    distributionRate: { OA: 0.0646, SA: 0.258, MA: 0.6774 },
  },
  {
    description: "Above 70",
    min: 70,
    contributionRate: { employee: 0.05, employer: 0.075 },
    distributionRate: { OA: 0.08, SA: 0.08, MA: 0.84 },
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
