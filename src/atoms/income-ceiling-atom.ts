import { atom } from "jotai";
import { findLatestIncomeCeilingDate } from "@/lib/find-latest-income-ceiling-date";

export const latestIncomeCeilingDateAtom = atom(findLatestIncomeCeilingDate());
