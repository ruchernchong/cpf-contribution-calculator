import { describe, expect, it } from "vitest";
import { calculateCpfContribution } from "./calculateCpfContribution";
import type { ContributionResult } from "../types";

type TestCase = {
  year: number;
  income: number;
  expected: ContributionResult;
};

const testCases: TestCase[] = [
  {
    year: 2023,
    income: 4000,
    expected: {
      contribution: { employee: 800, employer: 680, total: 1480 },
      afterCpfContribution: 3200,
    },
  },
  {
    year: 2023,
    income: 6000,
    expected: {
      contribution: { employee: 1200, employer: 1020, total: 2220 },
      afterCpfContribution: 4800,
    },
  },
  {
    year: 2023,
    income: 8000,
    expected: {
      contribution: { employee: 1200, employer: 1020, total: 2220 },
      afterCpfContribution: 6800,
    },
  },
  {
    year: 2026,
    income: 4000,
    expected: {
      contribution: { employee: 800, employer: 680, total: 1480 },
      afterCpfContribution: 3200,
    },
  },
  {
    year: 2026,
    income: 6000,
    expected: {
      contribution: { employee: 1200, employer: 1020, total: 2220 },
      afterCpfContribution: 4800,
    },
  },
  {
    year: 2026,
    income: 8000,
    expected: {
      contribution: { employee: 1600, employer: 1360, total: 2960 },
      afterCpfContribution: 6400,
    },
  },
  {
    year: 2026,
    income: 10000,
    expected: {
      contribution: { employee: 1600, employer: 1360, total: 2960 },
      afterCpfContribution: 8400,
    },
  },
];

describe("calculateCpfContribution", () => {
  it.each(testCases)(
    "should return the expected income after CPF contribution in $year on a gross income of $income",
    ({ year, income, expected }) => {
      expect(calculateCpfContribution(income, year)).toEqual(expected);
    }
  );

  it("should return the income after CPF contribution before the ceiling changes", () => {
    expect(
      calculateCpfContribution(6000, 2023, { useCeilingBeforeSep2023: true })
    ).toEqual({
      contribution: { employee: 1200, employer: 1020, total: 2220 },
      afterCpfContribution: 4800,
    });
    expect(
      calculateCpfContribution(8000, 2023, { useCeilingBeforeSep2023: true })
    ).toEqual({
      contribution: { employee: 1200, employer: 1020, total: 2220 },
      afterCpfContribution: 6800,
    });
  });
});
