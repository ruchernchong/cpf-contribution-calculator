import { DEFAULT_EMPLOYEE_CONTRIBUTION } from "../config";

export const ageGroups = [
  {
    description: "55 and below",
    min: 0,
    max: 55,
    contribution: DEFAULT_EMPLOYEE_CONTRIBUTION,
  },
  { description: "Above 55 to 60", min: 55, max: 60, contribution: 0.15 },
  { description: "Above 60 to 65", min: 60, max: 65, contribution: 0.095 },
  { description: "Above 65 to 70", min: 65, max: 70, contribution: 0.07 },
  { description: "Above 70", min: 70, contribution: 0.05 },
];

export const cpfIncomeCeilings: {
  year: string;
  ceiling: number;
}[] = [
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
