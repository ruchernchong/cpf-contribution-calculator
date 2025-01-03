import type { Settings } from "@/types";
import { atomWithStorage } from "jotai/utils";

const initialValue: Settings = {
  shouldStoreInput: false,
  monthlyGrossIncome: 0,
  birthDate: "",
};

export const settingsAtom = atomWithStorage<Settings>(
  "settings",
  initialValue,
  undefined,
  { getOnInit: true },
);
