import { describe, expect, it } from "vitest";
import { formatCurrency } from "./formatCurrency";

describe("formatCurrency", () => {
  it("should return a nicely formatted currency", () => {
    expect(formatCurrency(10000)).toBe(`$10,000.00`);
    expect(formatCurrency("10000")).toBe(`$10,000.00`);
  });
});
