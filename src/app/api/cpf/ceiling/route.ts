import { type NextRequest, NextResponse } from "next/server";
import { CPF_INCOME_CEILING, DEFAULT_CPF_INCOME_CEILING } from "@/constants";
import { CACHE_HEADERS } from "@/lib/cache-headers";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const searchParams = request.nextUrl.searchParams;
  let date = searchParams.get("date");

  if (!date) {
    const today = new Date();
    date = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
  }

  const sortedDates = Object.keys(CPF_INCOME_CEILING)
    .map((dateString) => {
      const dateObj = new Date(dateString);
      return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;
    })
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  if (date <= "2023-01-01") {
    return NextResponse.json(
      { date, ceiling: 6000 },
      { status: 200, headers: CACHE_HEADERS.static },
    );
  }

  if (date >= "2026-01-01") {
    return NextResponse.json(
      { date, ceiling: 8000 },
      { status: 200, headers: CACHE_HEADERS.static },
    );
  }

  let ceiling: number = DEFAULT_CPF_INCOME_CEILING;

  for (const keyDate of sortedDates) {
    if (new Date(keyDate) <= new Date(date)) {
      ceiling = CPF_INCOME_CEILING[keyDate];
    } else {
      break;
    }
  }

  return NextResponse.json(
    { date, ceiling },
    { status: 200, headers: CACHE_HEADERS.static },
  );
};
