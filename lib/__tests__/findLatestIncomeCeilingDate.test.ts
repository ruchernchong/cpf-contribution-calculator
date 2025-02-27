import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { findLatestIncomeCeilingDate } from "../findLatestIncomeCeilingDate";
import * as dateFns from "date-fns";
import * as formatModule from "../format";

// Mock constants import
vi.mock("@/constants", () => ({
  CPF_INCOME_CEILING: {
    "2023-01-01": 6000,
    "2023-09-01": 6300,
    "2024-01-01": 6800,
    "2025-01-01": 7400,
  }
}));

// Mock formatDate function
vi.mock("../format", () => ({
  formatDate: vi.fn()
}));

describe("findLatestIncomeCeilingDate", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.useFakeTimers();
    
    // Return formatted date as expected by tests
    vi.mocked(formatModule.formatDate).mockImplementation((date) => {
      if (date instanceof Date) {
        if (date.getTime() === new Date("2023-09-01").getTime()) {
          return "2023-09-01";
        }
        if (date.getTime() === new Date("2024-01-01").getTime()) {
          return "2024-01-01";
        }
        // Fallback for any other date
        return date.toISOString().split('T')[0];
      }
      return "";
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should return the closest past date", () => {
    // Mock formatDate implementation to return expected results for specific dates
    vi.mocked(formatModule.formatDate).mockImplementation((date, format) => {
      // Check if date is a Date for September 1, 2023
      if (date instanceof Date && date.getMonth() === 8 && date.getDate() === 1 && date.getFullYear() === 2023) {
        return "2023-09-01";
      }
      return String(date);
    });

    // Set current date to Oct 15, 2023 (between Sep 2023 and Jan 2024)
    vi.setSystemTime(new Date("2023-10-15T00:00:00Z"));
    
    const result = findLatestIncomeCeilingDate();
    
    // The function should find 2023-09-01 as the most recent
    expect(result).toBe("2023-09-01");
  });

  it("should find the latest date before current date", () => {
    // Mock formatDate implementation to return expected results for specific dates
    vi.mocked(formatModule.formatDate).mockImplementation((date, format) => {
      // Check if date is a Date for January 1, 2024
      if (date instanceof Date && date.getMonth() === 0 && date.getDate() === 1 && date.getFullYear() === 2024) {
        return "2024-01-01";
      }
      return String(date);
    });

    // Set current date to Feb 15, 2024 (between Jan 2024 and Jan 2025)
    vi.setSystemTime(new Date("2024-02-15T00:00:00Z"));
    
    const result = findLatestIncomeCeilingDate();
    
    // The function should find 2024-01-01 as the most recent
    expect(result).toBe("2024-01-01");
  });
});