import { atom } from "jotai";
import { cpfIncomeCeilings } from "../data";
import { ageGroupAtom } from "./userAtom";
import { findLatestIncomeCeilingDate } from "../lib/findLatestIncomeCeilingDate";
import type { ContributionRate } from "../types";

export const contributionRateAtom = atom<ContributionRate>(
  (get) => get(ageGroupAtom).contributionRate
);

export const latestIncomeCeilingDateAtom = atom(findLatestIncomeCeilingDate());

export const latestIncomeCeilingAtom = atom(
  (get) => cpfIncomeCeilings[get(latestIncomeCeilingDateAtom)]
);
