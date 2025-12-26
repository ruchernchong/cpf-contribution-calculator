import { type NextRequest, NextResponse } from "next/server";
import { ageGroups } from "@/data";
import { calculateCpfContribution } from "@/lib/calculate-cpf-contribution";

interface CalculateRequest {
  income: number;
  date?: string;
  age?: number;
}

const findAgeGroup = (age: number) => {
  return ageGroups.find((group) => {
    if (group.maxAge === undefined) {
      return age >= group.minAge;
    }
    return age >= group.minAge && age < group.maxAge;
  });
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const body: CalculateRequest = await request.json();
    const { income, date, age } = body;

    if (income === undefined || income === null) {
      return NextResponse.json(
        { error: "income is required" },
        { status: 400 },
      );
    }

    if (typeof income !== "number" || income < 0) {
      return NextResponse.json(
        { error: "income must be a positive number" },
        { status: 400 },
      );
    }

    if (age !== undefined && (typeof age !== "number" || age < 0)) {
      return NextResponse.json(
        { error: "age must be a positive number" },
        { status: 400 },
      );
    }

    const year = date ?? new Date().toISOString().split("T")[0];
    const ageGroup = age !== undefined ? findAgeGroup(age) : undefined;

    const result = calculateCpfContribution(income, year, { ageGroup });

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
};
