import { type NextRequest, NextResponse } from "next/server";
import { ageGroups } from "@/data";
import { calculateCpfContribution } from "@/lib/calculate-cpf-contribution";

interface ProjectionRequest {
  income: number;
  age: number;
  years: number;
}

interface YearlyProjection {
  year: number;
  age: number;
  ageGroup: string;
  contribution: {
    employee: number;
    employer: number;
    totalContribution: number;
  };
  cumulative: {
    employee: number;
    employer: number;
    totalContribution: number;
  };
}

const MAX_YEARS = 50;

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
    const body: ProjectionRequest = await request.json();
    const { income, age, years } = body;

    if (income === undefined || income === null) {
      return NextResponse.json(
        { error: "income is required" },
        { status: 400 }
      );
    }

    if (typeof income !== "number" || income < 0) {
      return NextResponse.json(
        { error: "income must be a non-negative number" },
        { status: 400 }
      );
    }

    if (age === undefined || age === null) {
      return NextResponse.json({ error: "age is required" }, { status: 400 });
    }

    if (typeof age !== "number" || age < 0) {
      return NextResponse.json(
        { error: "age must be a non-negative number" },
        { status: 400 }
      );
    }

    if (years === undefined || years === null) {
      return NextResponse.json({ error: "years is required" }, { status: 400 });
    }

    if (typeof years !== "number" || years < 1) {
      return NextResponse.json(
        { error: "years must be a positive number" },
        { status: 400 }
      );
    }

    if (years > MAX_YEARS) {
      return NextResponse.json(
        { error: `Maximum ${MAX_YEARS} years allowed` },
        { status: 400 }
      );
    }

    const currentYear = new Date().getFullYear();
    const projections: YearlyProjection[] = [];

    let cumulativeEmployee = 0;
    let cumulativeEmployer = 0;
    let cumulativeTotal = 0;

    for (let i = 0; i < years; i++) {
      const projectedAge = age + i;
      const projectedYear = currentYear + i;
      const ageGroup = findAgeGroup(projectedAge);

      const result = calculateCpfContribution(
        income,
        projectedYear.toString(),
        { ageGroup }
      );

      const yearlyEmployee = result.contribution.employee * 12;
      const yearlyEmployer = result.contribution.employer * 12;
      const yearlyTotal = result.contribution.totalContribution * 12;

      cumulativeEmployee += yearlyEmployee;
      cumulativeEmployer += yearlyEmployer;
      cumulativeTotal += yearlyTotal;

      projections.push({
        year: projectedYear,
        age: projectedAge,
        ageGroup: ageGroup?.description ?? "Unknown",
        contribution: {
          employee: Math.round(yearlyEmployee * 100) / 100,
          employer: Math.round(yearlyEmployer * 100) / 100,
          totalContribution: Math.round(yearlyTotal * 100) / 100,
        },
        cumulative: {
          employee: Math.round(cumulativeEmployee * 100) / 100,
          employer: Math.round(cumulativeEmployer * 100) / 100,
          totalContribution: Math.round(cumulativeTotal * 100) / 100,
        },
      });
    }

    return NextResponse.json(
      {
        input: { income, age, years },
        projections,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
