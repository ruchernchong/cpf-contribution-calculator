import { NextResponse } from "next/server";
import { PEGGED_RATE_MARKUP } from "@/constants/cpf-interest-rates";
import {
  calculateSmraRate,
  isFloorRateApplied,
} from "@/lib/calculate-interest-trend";
import { loadSearchParams } from "./search-params";

export const GET = async (request: Request): Promise<NextResponse> => {
  const { sgsYield } = await loadSearchParams(request);

  if (!sgsYield && sgsYield !== 0) {
    return NextResponse.json(
      { error: "sgsYield is required" },
      { status: 400 }
    );
  }

  if (sgsYield < 0) {
    return NextResponse.json(
      { error: "sgsYield must be a non-negative number" },
      { status: 400 }
    );
  }

  const peggedRate = sgsYield + PEGGED_RATE_MARKUP;
  const floorApplied = isFloorRateApplied(sgsYield);
  const actualRate = calculateSmraRate(sgsYield);

  return NextResponse.json(
    {
      sgsYield,
      peggedRate,
      floorApplied,
      actualRate,
    },
    { status: 200 }
  );
};
