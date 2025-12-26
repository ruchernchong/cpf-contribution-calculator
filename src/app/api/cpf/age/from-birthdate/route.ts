import { NextResponse } from "next/server";
import { convertBirthDateToAge } from "@/lib/convert-birth-date-to-age";
import { loadSearchParams } from "./search-params";

export const GET = async (request: Request): Promise<NextResponse> => {
  const { birthDate } = await loadSearchParams(request);

  if (!birthDate) {
    return NextResponse.json(
      { error: "birthDate is required" },
      { status: 400 }
    );
  }

  const birthDatePattern = /^\d{2}\/\d{4}$/;
  if (!birthDatePattern.test(birthDate)) {
    return NextResponse.json(
      { error: "birthDate must be in MM/YYYY format" },
      { status: 400 }
    );
  }

  try {
    const age = convertBirthDateToAge(birthDate);

    if (age < 0) {
      return NextResponse.json(
        { error: "birthDate cannot be in the future" },
        { status: 400 }
      );
    }

    return NextResponse.json({ birthDate, age }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Invalid birthDate format" },
      { status: 400 }
    );
  }
};
