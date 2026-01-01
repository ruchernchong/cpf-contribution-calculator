import { NextResponse } from "next/server";
import { ageGroups } from "@/data";
import { CACHE_HEADERS } from "@/lib/cache-headers";

export const GET = async (): Promise<NextResponse> => {
  return NextResponse.json(ageGroups, {
    status: 200,
    headers: CACHE_HEADERS.immutable,
  });
};
