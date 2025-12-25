import { describe, expect, it, vi } from "vitest";
import { findAgeGroup } from "../find-age-group";

// Mock the ageGroups to avoid test dependency on data changes
vi.mock("../../data", () => ({
  ageGroups: [
    {
      description: "35 and below",
      minAge: 0,
      maxAge: 35,
      contributionRate: { employee: 0.2, employer: 0.17 },
      distributionRate: { OA: 0.6217, SA: 0.1621, MA: 0.2162 },
    },
    {
      description: "Above 35 to 45",
      minAge: 35,
      maxAge: 45,
      contributionRate: { employee: 0.2, employer: 0.17 },
      distributionRate: { OA: 0.5677, SA: 0.1891, MA: 0.2432 },
    },
    {
      description: "Above 45 to 50",
      minAge: 45,
      maxAge: 50,
      contributionRate: { employee: 0.2, employer: 0.17 },
      distributionRate: { OA: 0.5136, SA: 0.2162, MA: 0.2702 },
    },
    {
      description: "Above 70",
      minAge: 70,
      contributionRate: { employee: 0.05, employer: 0.075 },
      distributionRate: { OA: 0.08, SA: 0.08, MA: 0.84 },
    },
  ],
}));

describe("findAgeGroup", () => {
  it("should find the correct age group for age within range", () => {
    // First age group (0-35)
    expect(findAgeGroup(0).description).toBe("35 and below");
    expect(findAgeGroup(20).description).toBe("35 and below");
    expect(findAgeGroup(35).description).toBe("Above 35 to 45"); // Boundary case (35 is in second group)

    // Second age group (35-45)
    expect(findAgeGroup(40).description).toBe("Above 35 to 45");
    expect(findAgeGroup(45).description).toBe("Above 45 to 50"); // Boundary case

    // Third age group (45-50)
    expect(findAgeGroup(48).description).toBe("Above 45 to 50");

    // Last age group (above 70)
    expect(findAgeGroup(71).description).toBe("Above 70");
    expect(findAgeGroup(100).description).toBe("Above 70");
  });

  it("should return the first age group for invalid ages", () => {
    // Negative ages should default to first age group
    expect(findAgeGroup(-1).description).toBe("35 and below");
  });

  it("should correctly handle boundary cases", () => {
    expect(findAgeGroup(35).description).toBe("Above 35 to 45");
    expect(findAgeGroup(45).description).toBe("Above 45 to 50");
    expect(findAgeGroup(70).description).toBe("Above 70");
  });
});
