import { atom } from "jotai";
import { cpfIncomeCeilings } from "../data";
import { findLatestIncomeCeilingDate } from "../lib/findLatestIncomeCeilingDate";
import type { ContributionRate } from "../types";
import { ageGroupAtom } from "./userAtom";
import { selectedYearAtom, yearCeilingsAtom } from "./yearSliderAtom";

export const contributionRateAtom = atom<ContributionRate>(
  (get) => get(ageGroupAtom).contributionRate,
);

export const latestIncomeCeilingDateAtom = atom(findLatestIncomeCeilingDate());

export const selectedYearCeilingAtom = atom(
  (get) => get(yearCeilingsAtom)[get(selectedYearAtom)],
);

export const latestIncomeCeilingAtom = atom((get) =>
  get(selectedYearCeilingAtom),
);
