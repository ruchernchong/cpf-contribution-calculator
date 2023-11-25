import { describe, expect, it } from "vitest";
import { calculateCpfContribution } from "./calculateCpfContribution";
import type { ComputedResult } from "../types";
import {
  DEFAULT_EMPLOYEE_CONTRIBUTION,
  DEFAULT_EMPLOYER_CONTRIBUTION,
} from "../config";

type TestCase = {
  effectiveDate: string;
  income: number;
  expected: ComputedResult;
};

const testCases: TestCase[] = [
  {
    effectiveDate: "01-2023",
    income: 4000,
    expected: {
      contribution: { employee: 800, employer: 680, total: 1480 },
      distribution: {
        OA: 920.12,
        SA: 239.91,
        MA: 319.98,
      },
      afterCpfContribution: 3200,
    },
  },
  {
    effectiveDate: "01-2023",
    income: 6000,
    expected: {
      contribution: { employee: 1200, employer: 1020, total: 2220 },
      distribution: {
        MA: 479.96,
        OA: 1380.17,
        SA: 359.86,
      },
      afterCpfContribution: 4800,
    },
  },
  {
    effectiveDate: "01-2023",
    income: 8000,
    expected: {
      contribution: { employee: 1200, employer: 1020, total: 2220 },
      distribution: {
        MA: 639.95,
        OA: 1840.23,
        SA: 479.82,
      },
      afterCpfContribution: 6800,
    },
  },
  {
    effectiveDate: "01-2026",
    income: 4000,
    expected: {
      contribution: { employee: 800, employer: 680, total: 1480 },
      distribution: {
        OA: 920.12,
        SA: 239.91,
        MA: 319.98,
      },
      afterCpfContribution: 3200,
    },
  },
  {
    effectiveDate: "01-2026",
    income: 6000,
    expected: {
      contribution: { employee: 1200, employer: 1020, total: 2220 },
      distribution: {
        MA: 479.96,
        OA: 1380.17,
        SA: 359.86,
      },
      afterCpfContribution: 4800,
    },
  },
  {
    effectiveDate: "01-2026",
    income: 8000,
    expected: {
      contribution: { employee: 1600, employer: 1360, total: 2960 },
      distribution: {
        MA: 639.95,
        OA: 1840.23,
        SA: 479.82,
      },
      afterCpfContribution: 6400,
    },
  },
  {
    effectiveDate: "01-2026",
    income: 10000,
    expected: {
      contribution: { employee: 1600, employer: 1360, total: 2960 },
      distribution: {
        MA: 799.94,
        OA: 2300.29,
        SA: 599.77,
      },
      afterCpfContribution: 8400,
    },
  },
];

const testAgeGroup = {
  description: "55 and below",
  min: 0,
  max: 35,
  contributionRate: {
    employee: DEFAULT_EMPLOYEE_CONTRIBUTION,
    employer: DEFAULT_EMPLOYER_CONTRIBUTION,
  },
  distributionRate: { OA: 0.6217, SA: 0.1621, MA: 0.2162 },
};

describe("calculateCpfContribution", () => {
  it.each(testCases)(
    "should return the expected income after CPF contribution in $year on a gross income of $income",
    ({ effectiveDate, income, expected }) => {
      expect(
        calculateCpfContribution(income, effectiveDate, {
          ageGroup: testAgeGroup,
        })
      ).toEqual(expected);
    }
  );

  it("should return the income after CPF contribution before the ceiling changes", () => {
    expect(
      calculateCpfContribution(6000, "01-2023", {
        useCeilingBeforeSep2023: true,
      })
    ).toEqual({
      contribution: { employee: 1200, employer: 1020, total: 2220 },
      distribution: {},
      afterCpfContribution: 4800,
    });
    expect(
      calculateCpfContribution(8000, "01-2023", {
        useCeilingBeforeSep2023: true,
      })
    ).toEqual({
      contribution: { employee: 1200, employer: 1020, total: 2220 },
      distribution: {},
      afterCpfContribution: 6800,
    });
  });

  it("should return the result correctly for a certain age group", () => {
    expect(
      calculateCpfContribution(6000, "01-2023", {
        ageGroup: {
          description: "Above 70",
          min: 70,
          contributionRate: { employee: 0.05, employer: 0.075 },
          distributionRate: { OA: 0.08, SA: 0.08, MA: 0.84 },
        },
      })
    ).toEqual({
      contribution: { employee: 300, employer: 450, total: 750 },
      distribution: {
        OA: 60,
        SA: 60,
        MA: 630,
      },
      afterCpfContribution: 5700,
    });
  });
});
