import { atom } from 'jotai';

export const selectedYearAtom = atom(2023);
export const yearCeilingsAtom = atom({
  2023: 6000,
  2024: 6800,
  2025: 7400,
  2026: 8000
});