import { atom } from "jotai";

// Get current year and ensure it's within valid range
const getCurrentDefaultYear = () => {
  const currentYear = new Date().getFullYear();
  // Only allow years between 2023 and 2026
  return Math.max(2023, Math.min(2026, currentYear));
};

export const selectedYearAtom = atom(getCurrentDefaultYear());
