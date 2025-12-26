import { NextResponse } from "next/server";
import { ageGroups } from "@/data";

export const GET = async (): Promise<NextResponse> => {
  return NextResponse.json(ageGroups, { status: 200 });
};
