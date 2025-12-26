import { GET } from "./route";

describe("GET /api/cpf/interest-rates/trend", () => {
  it("should return trend data array", async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it("should return trend data with correct structure", async () => {
    const response = await GET();
    const data = await response.json();

    for (const entry of data) {
      expect(entry).toHaveProperty("month");
      expect(entry).toHaveProperty("sgsYield");
      expect(entry).toHaveProperty("peggedRate");
      expect(entry).toHaveProperty("actualRate");
      expect(typeof entry.month).toBe("string");
      expect(typeof entry.sgsYield).toBe("number");
      expect(typeof entry.peggedRate).toBe("number");
      expect(typeof entry.actualRate).toBe("number");
    }
  });

  it("should have pegged rate = sgsYield + 1%", async () => {
    const response = await GET();
    const data = await response.json();

    for (const entry of data) {
      expect(entry.peggedRate).toBeCloseTo(entry.sgsYield + 1, 2);
    }
  });

  it("should have actual rate >= 4% (floor rate)", async () => {
    const response = await GET();
    const data = await response.json();

    for (const entry of data) {
      expect(entry.actualRate).toBeGreaterThanOrEqual(4.0);
    }
  });
});
