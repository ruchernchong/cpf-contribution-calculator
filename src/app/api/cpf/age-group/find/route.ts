import { NextResponse } from "next/server";
import { findAgeGroup } from "@/lib/find-age-group";
import { loadSearchParams } from "./search-params";

export const GET = async (request: Request): Promise<NextResponse> => {
  const { age } = await loadSearchParams(request);

  if (!age && age !== 0) {
    return NextResponse.json({ error: "age is required" }, { status: 400 });
  }

  if (age < 0) {
    return NextResponse.json(
      { error: "age must be a non-negative number" },
      { status: 400 }
    );
  }

  const ageGroup = findAgeGroup(age);

  return NextResponse.json(ageGroup, { status: 200 });
};
