import { formatCurrency, formatDate, formatPercentage } from "../format";

describe("formatCurrency", () => {
  it("should return a nicely formatted currency", () => {
    expect(formatCurrency(10000)).toEqual("$10,000.00");
    expect(formatCurrency("10000")).toEqual("$10,000.00");
  });
});

describe("formatDate", () => {
  it("should return a formatted date of DD MMMM YYYY by default", () => {
    expect(formatDate("2023-09-01")).toBe("01 September 2023");
  });

  it("should return the date formatted to the expected output", () => {
    expect(formatDate("2023-09-01")).toBe("01 September 2023");
    expect(formatDate("2024-01-01", "dd-MM-yyyy")).toBe("01-01-2024");
  });

  it("should return the date formatted to the expected output for a instanceof Date provided", () => {
    expect(formatDate(new Date("2023-01-01"))).toBe("01 January 2023");
  });
});

describe("formatPercentage", () => {
  it("should return a nicely formatted value in percentage", () => {
    expect(formatPercentage(0.125)).toEqual("12.50%");
    expect(formatPercentage(1)).toEqual("100.00%");
    expect(formatPercentage("0.125")).toEqual("12.50%");
    expect(formatPercentage("1")).toEqual("100.00%");
  });

  it("should return a nicely formatted value in percentage based on the number of decimal places specified", () => {
    expect(formatPercentage(0.5, { decimalPlaces: 0 })).toEqual("50%");
    expect(formatPercentage(1, { decimalPlaces: 0 })).toEqual("100%");
  });
});
