import { atomWithStorage, createJSONStorage } from "jotai/utils";
import type { Settings } from "../types";

const initialValue: Settings = {
  shouldStoreInput: false,
  monthlyGrossIncome: 0,
  birthDate: "",
};

const storage = createJSONStorage<Settings>(() => localStorage);
export const settingsAtom = atomWithStorage<Settings>(
  "settings",
  initialValue,
  storage,
  { getOnInit: true }
);
