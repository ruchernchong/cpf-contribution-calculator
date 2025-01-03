import { atom } from "jotai";
import { convertBirthDateToAge } from "../lib/convertBirthDateToAge";
import { findAgeGroup } from "../lib/findAgeGroup";
import type { AgeGroup } from "../types";
import { settingsAtom } from "./settingAtom";

export const ageAtom = atom<number>(
  (get) => convertBirthDateToAge(get(settingsAtom).birthDate) || 0,
);

export const ageGroupAtom = atom<AgeGroup>((get) => {
  const age = get(ageAtom);
  return findAgeGroup(age);
});
