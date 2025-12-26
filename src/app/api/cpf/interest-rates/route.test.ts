import { GET } from "./route";

describe("GET /api/cpf/interest-rates", () => {
  it("should return quarterly rates and SGS yields", async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty("quarterlyRates");
    expect(data).toHaveProperty("sgsYields");
  });

  it("should return quarterly rates with correct structure", async () => {
    const response = await GET();
    const data = await response.json();

    expect(Array.isArray(data.quarterlyRates)).toBe(true);
    expect(data.quarterlyRates.length).toBeGreaterThan(0);

    for (const rate of data.quarterlyRates) {
      expect(rate).toHaveProperty("quarter");
      expect(rate).toHaveProperty("oa");
      expect(rate).toHaveProperty("sa");
      expect(rate).toHaveProperty("ma");
      expect(rate).toHaveProperty("ra");
    }
  });

  it("should return SGS yields with correct structure", async () => {
    const response = await GET();
    const data = await response.json();

    expect(Array.isArray(data.sgsYields)).toBe(true);
    expect(data.sgsYields.length).toBeGreaterThan(0);

    for (const yieldData of data.sgsYields) {
      expect(yieldData).toHaveProperty("month");
      expect(yieldData).toHaveProperty("yield");
      expect(typeof yieldData.month).toBe("string");
      expect(typeof yieldData.yield).toBe("number");
    }
  });
});
