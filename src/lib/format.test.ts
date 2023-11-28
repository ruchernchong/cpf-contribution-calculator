import { describe, expect, it } from "vitest";
import { formatCurrency, formatDate, formatPercentage } from "./format";

describe("formatCurrency", () => {
  it("should return a nicely formatted currency", () => {
    expect(formatCurrency(10000)).toEqual(`$10,000.00`);
    expect(formatCurrency("10000")).toEqual(`$10,000.00`);
  });
});

describe("formatDate", () => {
  it("should return a formatted date of MM-yyyy by default", () => {
    expect(formatDate("09-2023", { inputFormat: "MM-yyyy" })).toBe("09-2023");
  });

  it("should return a nicely formatted date", () => {
    expect(
      formatDate("09-2023", {
        inputFormat: "MM-yyyy",
        outputFormat: "dd MMMM yyyy",
      })
    ).toBe("01 September 2023");
    expect(
      formatDate("01-2024", {
        inputFormat: "MM-yyyy",
        outputFormat: "dd MMMM yyyy",
      })
    ).toBe("01 January 2024");
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
