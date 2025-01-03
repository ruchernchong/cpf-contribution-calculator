import { atomWithStorage } from "jotai/utils";
import type { Settings } from "../types";

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
