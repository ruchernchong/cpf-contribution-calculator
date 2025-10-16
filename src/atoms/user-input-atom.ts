import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const defaultUserInput = {
  birthDate: "",
  monthlyGrossIncome: 0,
  effectiveDate: "01 January 2025",
  shouldStoreInput: false,
};

export const userInputAtom = atomWithStorage("user-input", defaultUserInput, {
  getItem: (key) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) {
      return defaultUserInput;
    }

    try {
      return JSON.parse(storedValue);
    } catch (error) {
      console.error("Failed to parse stored value:", error);
      return defaultUserInput;
    }
  },
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
});

export const resetUserInputAtom = atom(null, (get, set) => {
  set(userInputAtom, defaultUserInput);
});
