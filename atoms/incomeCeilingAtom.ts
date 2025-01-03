import { findLatestIncomeCeilingDate } from "@/lib/findLatestIncomeCeilingDate";
import type { ContributionRate } from "@/types";
import { atom } from "jotai";
import { ageGroupAtom } from "./userAtom";

export const contributionRateAtom = atom<ContributionRate>(
  (get) => get(ageGroupAtom).contributionRate,
);

export const latestIncomeCeilingDateAtom = atom(findLatestIncomeCeilingDate());
