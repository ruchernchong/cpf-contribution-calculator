import { NextResponse } from "next/server";
import { CPF_INCOME_CEILING } from "@/constants";
import { CACHE_HEADERS } from "@/lib/cache-headers";

export const GET = async (): Promise<NextResponse> => {
  const timeline = Object.entries(CPF_INCOME_CEILING)
    .map(([date, ceiling]) => ({ date, ceiling }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return NextResponse.json(timeline, {
    status: 200,
    headers: CACHE_HEADERS.immutable,
  });
};
