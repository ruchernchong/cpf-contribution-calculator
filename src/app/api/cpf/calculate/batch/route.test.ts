import { type NextRequest } from "next/server";
import { POST } from "./route";

const createRequest = (body: unknown): NextRequest => {
  return {
    json: async () => body,
  } as NextRequest;
};

describe("POST /api/cpf/calculate/batch", () => {
  it("should return 400 when scenarios is not provided", async () => {
    const request = createRequest({});
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("scenarios array is required");
  });

  it("should return 400 when scenarios is empty", async () => {
    const request = createRequest({ scenarios: [] });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("scenarios array cannot be empty");
  });

  it("should return 400 when scenarios exceeds maximum", async () => {
    const scenarios = Array.from({ length: 101 }, () => ({ income: 5000 }));
    const request = createRequest({ scenarios });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Maximum 100 scenarios allowed per request");
  });

  it("should return 400 when scenario income is missing", async () => {
    const request = createRequest({ scenarios: [{}] });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Scenario 0: income is required");
  });

  it("should return 400 when scenario income is negative", async () => {
    const request = createRequest({ scenarios: [{ income: -1000 }] });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Scenario 0: income must be a non-negative number");
  });

  it("should return 400 when scenario age is negative", async () => {
    const request = createRequest({ scenarios: [{ income: 5000, age: -1 }] });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Scenario 0: age must be a non-negative number");
  });

  it("should calculate batch scenarios successfully", async () => {
    const request = createRequest({
      scenarios: [
        { income: 5000 },
        { income: 6000, age: 30 },
        { income: 7000, date: "2025-01-01", age: 40 },
      ],
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data).toHaveLength(3);

    for (const result of data) {
      expect(result).toHaveProperty("contribution");
      expect(result).toHaveProperty("distribution");
      expect(result).toHaveProperty("afterCpfContribution");
    }
  });

  it("should return results with correct structure", async () => {
    const request = createRequest({
      scenarios: [{ income: 5000, age: 30 }],
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data[0].contribution).toHaveProperty("employee");
    expect(data[0].contribution).toHaveProperty("employer");
    expect(data[0].contribution).toHaveProperty("totalContribution");
  });
});
