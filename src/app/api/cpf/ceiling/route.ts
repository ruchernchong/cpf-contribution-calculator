import { type NextRequest, NextResponse } from "next/server";
import { CPF_INCOME_CEILING, DEFAULT_CPF_INCOME_CEILING } from "@/constants";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  let date = searchParams.get("date");

  // If no date is provided, use today's date
  if (!date) {
    const today = new Date();
    date = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
  }

  const sortedDates = Object.keys(CPF_INCOME_CEILING)
    .map((dateString) => {
      // Attempt to create a new Date object from each key
      const date = new Date(dateString);

      // Format the date to yyyy-mm-dd
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    })
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // Provide defaults for specific date ranges, returning early if applicable
  if (date <= "2023-01-01") {
    return NextResponse.json({ date, ceiling: 6000 });
  }

  if (date >= "2026-01-01") {
    return NextResponse.json({ date, ceiling: 8000 });
  }

  let ceiling: number = DEFAULT_CPF_INCOME_CEILING;

  for (const keyDate of sortedDates) {
    if (new Date(keyDate) <= new Date(date)) {
      ceiling = CPF_INCOME_CEILING[keyDate];
    } else {
      break;
    }
  }

  return NextResponse.json({ date, ceiling });
};
