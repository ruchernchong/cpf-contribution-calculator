import { describe, expect, it } from "vitest";
import { getIncomeAfterCpf } from "../lib/getIncomeAfterCpf";

describe("calculateIncomeAfterCpf", () => {
  it.each([
    { year: 2023, income: 4000, expected: 3200 },
    { year: 2023, income: 6000, expected: 4800 },
    { year: 2023, income: 8000, expected: 6800 },
    { year: 2026, income: 4000, expected: 3200 },
    { year: 2026, income: 6000, expected: 4800 },
    { year: 2026, income: 8000, expected: 6400 },
    { year: 2026, income: 10000, expected: 8400 },
  ])(
    "should return the income after CPF contribution in year $year with a gross income of $income",
    ({ year, income, expected }) => {
      expect(getIncomeAfterCpf(income, year)).toBe(expected);
    }
  );

  it("should return the income after CPF contribution before the ceiling changes", () => {
    expect(
      getIncomeAfterCpf(6000, 2023, { useCeilingBeforeChanges: true })
    ).toBe(4800);
  });
});
