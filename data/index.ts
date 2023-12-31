import {
  DEFAULT_EMPLOYEE_CONTRIBUTION_RATE,
  DEFAULT_EMPLOYER_CONTRIBUTION_RATE,
} from "../config";
import type { AgeGroup, CPFIncomeCeiling } from "../types";

export const ageGroups: AgeGroup[] = [
  {
    description: "55 and below",
    minAge: 0,
    maxAge: 35,
    contributionRate: {
      employee: DEFAULT_EMPLOYEE_CONTRIBUTION_RATE,
      employer: DEFAULT_EMPLOYER_CONTRIBUTION_RATE,
    },
    distributionRate: { OA: 0.6217, SA: 0.1621, MA: 0.2162 },
  },
  {
    description: "55 and below",
    minAge: 35,
    maxAge: 45,
    contributionRate: {
      employee: DEFAULT_EMPLOYEE_CONTRIBUTION_RATE,
      employer: DEFAULT_EMPLOYER_CONTRIBUTION_RATE,
    },
    distributionRate: { OA: 0.5677, SA: 0.1891, MA: 0.2432 },
  },
  {
    description: "55 and below",
    minAge: 45,
    maxAge: 50,
    contributionRate: {
      employee: DEFAULT_EMPLOYEE_CONTRIBUTION_RATE,
      employer: DEFAULT_EMPLOYER_CONTRIBUTION_RATE,
    },
    distributionRate: { OA: 0.5136, SA: 0.2162, MA: 0.2702 },
  },
  {
    description: "55 and below",
    minAge: 50,
    maxAge: 55,
    contributionRate: {
      employee: DEFAULT_EMPLOYEE_CONTRIBUTION_RATE,
      employer: DEFAULT_EMPLOYER_CONTRIBUTION_RATE,
    },
    distributionRate: { OA: 0.4055, SA: 0.3108, MA: 0.2837 },
  },
  {
    description: "Above 55 to 60",
    minAge: 55,
    maxAge: 60,
    contributionRate: { employee: 0.15, employer: 0.145 },
    distributionRate: { OA: 0.4069, SA: 0.2372, MA: 0.3559 },
  },
  {
    description: "Above 60 to 65",
    minAge: 60,
    maxAge: 65,
    contributionRate: { employee: 0.095, employer: 0.11 },
    distributionRate: { OA: 0.1709, SA: 0.317, MA: 0.5121 },
  },
  {
    description: "Above 65 to 70",
    minAge: 65,
    maxAge: 70,
    contributionRate: { employee: 0.07, employer: 0.085 },
    distributionRate: { OA: 0.0646, SA: 0.258, MA: 0.6774 },
  },
  {
    description: "Above 70",
    minAge: 70,
    contributionRate: { employee: 0.05, employer: 0.075 },
    distributionRate: { OA: 0.08, SA: 0.08, MA: 0.84 },
  },
];

export const cpfIncomeCeilings: CPFIncomeCeiling[] = [
  {
    effectiveDate: "01-01-2023",
    ceilingThreshold: 6000,
  },
  {
    effectiveDate: "09-01-2023",
    ceilingThreshold: 6300,
  },
  {
    effectiveDate: "01-01-2024",
    ceilingThreshold: 6800,
  },
  {
    effectiveDate: "01-01-2025",
    ceilingThreshold: 7400,
  },
  {
    effectiveDate: "01-01-2026",
    ceilingThreshold: 8000,
  },
];
