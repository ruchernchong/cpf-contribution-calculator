import { atom } from "jotai";
import { findLatestIncomeCeilingDate } from "@/lib/find-latest-income-ceiling-date";
import type { ContributionRate } from "@/types";
import { ageGroupAtom } from "./user-atom";

export const contributionRateAtom = atom<ContributionRate>(
  (get) => get(ageGroupAtom).contributionRate,
);

export const latestIncomeCeilingDateAtom = atom(findLatestIncomeCeilingDate());
