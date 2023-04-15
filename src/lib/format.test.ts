import { describe, expect, it } from "vitest";
import { formatCurrency, formatPercentage } from "./format";

describe("formatCurrency", () => {
  it("should return a nicely formatted currency", () => {
    expect(formatCurrency(10000)).toEqual(`$10,000.00`);
    expect(formatCurrency("10000")).toEqual(`$10,000.00`);
  });
});

describe("formatPercentage", () => {
  it("should return a nicely formatted value in percentage", () => {
    expect(formatPercentage(0.125)).toEqual(`12.5%`);
    expect(formatPercentage(1)).toEqual(`100%`);
    expect(formatPercentage("0.125")).toEqual(`12.5%`);
    expect(formatPercentage("1")).toEqual(`100%`);
  });

  it("should return a nicely formatted value in percentage based on the number of decimal places specified", () => {
    expect(formatPercentage(0.5, { decimalPlaces: 0 })).toEqual(`50%`);
    expect(formatPercentage(1, { decimalPlaces: 0 })).toEqual(`100%`);
  });
});
