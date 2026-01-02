import type { NextRequest } from "next/server";
import { POST } from "./route";

const createRequest = (body: unknown): NextRequest => {
  return {
    json: async () => body,
  } as NextRequest;
};

describe("POST /api/cpf/projection", () => {
  it("should return 400 when income is not provided", async () => {
    const request = createRequest({ age: 30, years: 5 });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("income is required");
  });

  it("should return 400 when income is negative", async () => {
    const request = createRequest({ income: -1000, age: 30, years: 5 });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("income must be a non-negative number");
  });

  it("should return 400 when age is not provided", async () => {
    const request = createRequest({ income: 5000, years: 5 });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("age is required");
  });

  it("should return 400 when age is negative", async () => {
    const request = createRequest({ income: 5000, age: -1, years: 5 });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("age must be a non-negative number");
  });

  it("should return 400 when years is not provided", async () => {
    const request = createRequest({ income: 5000, age: 30 });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("years is required");
  });

  it("should return 400 when years is less than 1", async () => {
    const request = createRequest({ income: 5000, age: 30, years: 0 });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("years must be a positive number");
  });

  it("should return 400 when years exceeds maximum", async () => {
    const request = createRequest({ income: 5000, age: 30, years: 51 });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Maximum 50 years allowed");
  });

  it("should return projection with correct structure", async () => {
    const request = createRequest({ income: 5000, age: 30, years: 5 });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty("input");
    expect(data).toHaveProperty("projections");
    expect(data.input).toEqual({ income: 5000, age: 30, years: 5 });
    expect(data.projections).toHaveLength(5);
  });

  it("should return yearly projections with correct structure", async () => {
    const request = createRequest({ income: 5000, age: 30, years: 2 });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);

    for (const projection of data.projections) {
      expect(projection).toHaveProperty("year");
      expect(projection).toHaveProperty("age");
      expect(projection).toHaveProperty("ageGroup");
      expect(projection).toHaveProperty("contribution");
      expect(projection).toHaveProperty("cumulative");
      expect(projection.contribution).toHaveProperty("employee");
      expect(projection.contribution).toHaveProperty("employer");
      expect(projection.contribution).toHaveProperty("totalContribution");
      expect(projection.cumulative).toHaveProperty("employee");
      expect(projection.cumulative).toHaveProperty("employer");
      expect(projection.cumulative).toHaveProperty("totalContribution");
    }
  });

  it("should increment age correctly over years", async () => {
    const request = createRequest({ income: 5000, age: 30, years: 3 });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.projections[0].age).toBe(30);
    expect(data.projections[1].age).toBe(31);
    expect(data.projections[2].age).toBe(32);
  });

  it("should calculate cumulative totals correctly", async () => {
    const request = createRequest({ income: 5000, age: 30, years: 2 });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);

    const firstYear = data.projections[0];
    const secondYear = data.projections[1];

    expect(secondYear.cumulative.totalContribution).toBeCloseTo(
      firstYear.cumulative.totalContribution +
        secondYear.contribution.totalContribution,
      2,
    );
  });

  it("should handle age 70+ without maxAge boundary", async () => {
    const request = createRequest({ income: 5000, age: 70, years: 3 });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.projections[0].ageGroup).toBe("Above 70");
    expect(data.projections[1].age).toBe(71);
    expect(data.projections[2].age).toBe(72);
  });

  it("should return 400 for invalid JSON body", async () => {
    const request = {
      json: async () => {
        throw new Error("Invalid JSON");
      },
    } as NextRequest;
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Invalid request body");
  });
});
