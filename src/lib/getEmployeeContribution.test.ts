import { describe, expect, it } from "vitest";
import { getEmployeeContribution } from "./getEmployeeContribution";

describe("getEmployeeContribution", () => {
  it.each([
    {
      income: 6000,
      year: 2023,
      expected: 1200,
    },
    {
      income: 6000,
      year: 2024,
      expected: 1200,
    },
    {
      income: 6000,
      year: 2026,
      expected: 1200,
    },
  ])(
    "should return the employee contribution correctly for $income in $year",
    ({ income, year, expected }) => {
      expect(getEmployeeContribution(income, year)).toEqual(expected);
    }
  );
});
