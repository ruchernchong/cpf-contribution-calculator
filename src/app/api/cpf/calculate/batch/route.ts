import { type NextRequest, NextResponse } from "next/server";
import { ageGroups } from "@/data";
import { calculateCpfContribution } from "@/lib/calculate-cpf-contribution";

interface Scenario {
  income: number;
  date?: string;
  age?: number;
}

interface BatchRequest {
  scenarios: Scenario[];
}

const MAX_SCENARIOS = 100;

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
    const body: BatchRequest = await request.json();
    const { scenarios } = body;

    if (!scenarios || !Array.isArray(scenarios)) {
      return NextResponse.json(
        { error: "scenarios array is required" },
        { status: 400 },
      );
    }

    if (scenarios.length === 0) {
      return NextResponse.json(
        { error: "scenarios array cannot be empty" },
        { status: 400 },
      );
    }

    if (scenarios.length > MAX_SCENARIOS) {
      return NextResponse.json(
        { error: `Maximum ${MAX_SCENARIOS} scenarios allowed per request` },
        { status: 400 },
      );
    }

    for (let i = 0; i < scenarios.length; i++) {
      const scenario = scenarios[i];

      if (scenario.income === undefined || scenario.income === null) {
        return NextResponse.json(
          { error: `Scenario ${i}: income is required` },
          { status: 400 },
        );
      }

      if (typeof scenario.income !== "number" || scenario.income < 0) {
        return NextResponse.json(
          { error: `Scenario ${i}: income must be a non-negative number` },
          { status: 400 },
        );
      }

      if (
        scenario.age !== undefined &&
        (typeof scenario.age !== "number" || scenario.age < 0)
      ) {
        return NextResponse.json(
          { error: `Scenario ${i}: age must be a non-negative number` },
          { status: 400 },
        );
      }
    }

    const results = scenarios.map((scenario) => {
      const year = scenario.date ?? new Date().toISOString().split("T")[0];
      const ageGroup =
        scenario.age !== undefined ? findAgeGroup(scenario.age) : undefined;

      return calculateCpfContribution(scenario.income, year, { ageGroup });
    });

    return NextResponse.json(results, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
};
