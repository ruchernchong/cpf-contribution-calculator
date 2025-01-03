import {
  UserInputSchema,
  type UserInputType,
} from "@/lib/validators/user-input";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const defaultUserInput: UserInputType = {
  birthDate: "",
  monthlyGrossIncome: 0,
  effectiveDate: "01 January 2025",
  shouldStoreInput: false,
};

export const userInputAtom = atomWithStorage<UserInputType>(
  "user-input",
  defaultUserInput,
  {
    getItem: (key) => {
      const storedValue = localStorage.getItem(key);
      if (!storedValue) return defaultUserInput;

      try {
        const parsed = JSON.parse(storedValue);
        const validation = UserInputSchema.safeParse(parsed);
        return validation.success ? parsed : defaultUserInput;
      } catch {
        return defaultUserInput;
      }
    },
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
  },
);

export const resetUserInputAtom = atom(null, (get, set) => {
  set(userInputAtom, defaultUserInput);
});
