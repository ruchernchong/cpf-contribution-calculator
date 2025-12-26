import { NextResponse } from "next/server";
import { SGS_YIELDS_MONTHLY } from "@/constants/cpf-interest-rates";
import { calculateInterestTrend } from "@/lib/calculate-interest-trend";

export const GET = async (): Promise<NextResponse> => {
  const trendData = calculateInterestTrend(SGS_YIELDS_MONTHLY);

  return NextResponse.json(trendData, { status: 200 });
};
