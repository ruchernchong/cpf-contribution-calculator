import { describe, expect, it } from "vitest";
import {
  calculateInterestTrend,
  calculateSmraRate,
  isFloorRateApplied,
} from "../calculate-interest-trend";
import type { MonthlyYield } from "@/types";

describe("calculateSmraRate", () => {
  it("should return floor rate when pegged rate is below 4%", () => {
    const result = calculateSmraRate(2.5);
    expect(result).toBe(4.0);
  });

  it("should return pegged rate when it exceeds floor rate", () => {
    const result = calculateSmraRate(3.5);
    expect(result).toBe(4.5);
  });

  it("should return floor rate when pegged rate equals floor rate", () => {
    const result = calculateSmraRate(3.0);
    expect(result).toBe(4.0);
  });

  it("should handle edge case with very low yields", () => {
    const result = calculateSmraRate(0.5);
    expect(result).toBe(4.0);
  });

  it("should handle edge case with very high yields", () => {
    const result = calculateSmraRate(10.0);
    expect(result).toBe(11.0);
  });
});

describe("isFloorRateApplied", () => {
  it("should return true when pegged rate is below floor", () => {
    const result = isFloorRateApplied(2.5);
    expect(result).toBe(true);
  });

  it("should return false when pegged rate exceeds floor", () => {
    const result = isFloorRateApplied(3.5);
    expect(result).toBe(false);
  });

  it("should return false when pegged rate equals floor", () => {
    const result = isFloorRateApplied(3.0);
    expect(result).toBe(false);
  });
});

describe("calculateInterestTrend", () => {
  it("should calculate trend data correctly with yields above floor", () => {
    const yields: MonthlyYield[] = [
      { month: "2024-01", yield: 3.5 },
      { month: "2024-02", yield: 4.0 },
    ];

    const result = calculateInterestTrend(yields);

    expect(result).toEqual([
      {
        month: "2024-01",
        sgsYield: 3.5,
        peggedRate: 4.5,
        actualRate: 4.5,
      },
      {
        month: "2024-02",
        sgsYield: 4.0,
        peggedRate: 5.0,
        actualRate: 5.0,
      },
    ]);
  });

  it("should apply floor rate when yields are low", () => {
    const yields: MonthlyYield[] = [
      { month: "2024-01", yield: 2.5 },
      { month: "2024-02", yield: 2.8 },
    ];

    const result = calculateInterestTrend(yields);

    expect(result).toEqual([
      {
        month: "2024-01",
        sgsYield: 2.5,
        peggedRate: 3.5,
        actualRate: 4.0,
      },
      {
        month: "2024-02",
        sgsYield: 2.8,
        peggedRate: 3.8,
        actualRate: 4.0,
      },
    ]);
  });

  it("should handle mixed scenarios with some yields above and below floor", () => {
    const yields: MonthlyYield[] = [
      { month: "2024-01", yield: 2.5 },
      { month: "2024-02", yield: 3.5 },
      { month: "2024-03", yield: 2.9 },
    ];

    const result = calculateInterestTrend(yields);

    expect(result).toEqual([
      {
        month: "2024-01",
        sgsYield: 2.5,
        peggedRate: 3.5,
        actualRate: 4.0,
      },
      {
        month: "2024-02",
        sgsYield: 3.5,
        peggedRate: 4.5,
        actualRate: 4.5,
      },
      {
        month: "2024-03",
        sgsYield: 2.9,
        peggedRate: 3.9,
        actualRate: 4.0,
      },
    ]);
  });

  it("should handle empty array", () => {
    const result = calculateInterestTrend([]);
    expect(result).toEqual([]);
  });

  it("should handle single data point", () => {
    const yields: MonthlyYield[] = [{ month: "2024-01", yield: 3.0 }];

    const result = calculateInterestTrend(yields);

    expect(result).toEqual([
      {
        month: "2024-01",
        sgsYield: 3.0,
        peggedRate: 4.0,
        actualRate: 4.0,
      },
    ]);
  });
});
