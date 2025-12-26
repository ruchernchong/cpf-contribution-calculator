import { NextResponse } from "next/server";
import {
  QUARTERLY_CPF_RATES,
  SGS_YIELDS_MONTHLY,
} from "@/constants/cpf-interest-rates";

export const GET = async (): Promise<NextResponse> => {
  return NextResponse.json(
    {
      quarterlyRates: QUARTERLY_CPF_RATES,
      sgsYields: SGS_YIELDS_MONTHLY,
    },
    { status: 200 }
  );
};
