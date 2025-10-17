import {
  CPF_INTEREST_FLOOR_RATES,
  PEGGED_RATE_MARKUP,
} from "@/constants/cpf-interest-rates";
import type { InterestRateTrendData, MonthlyYield } from "@/types";

/**
 * Calculate SMRA interest rate based on 10Y SGS yield
 * Returns the higher of: (10Y SGS + 1%) or floor rate (4%)
 */
export const calculateSmraRate = (sgsYield: number): number => {
  const peggedRate = sgsYield + PEGGED_RATE_MARKUP;
  return Math.max(peggedRate, CPF_INTEREST_FLOOR_RATES.SMRA);
};

/**
 * Check if floor rate is being applied
 */
export const isFloorRateApplied = (sgsYield: number): boolean => {
  const peggedRate = sgsYield + PEGGED_RATE_MARKUP;
  return peggedRate < CPF_INTEREST_FLOOR_RATES.SMRA;
};

/**
 * Calculate interest rate trend data from monthly SGS yields
 * Computes pegged rate and actual rate (considering floor rate)
 */
export const calculateInterestTrend = (
  yields: MonthlyYield[],
): InterestRateTrendData[] => {
  return yields.map((item) => {
    const peggedRate = item.yield + PEGGED_RATE_MARKUP;
    const actualRate = Math.max(peggedRate, CPF_INTEREST_FLOOR_RATES.SMRA);

    return {
      month: item.month,
      sgsYield: item.yield,
      peggedRate,
      actualRate,
    };
  });
};
