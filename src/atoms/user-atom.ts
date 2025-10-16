import { atom } from "jotai";
import { convertBirthDateToAge } from "../lib/convert-birth-date-to-age";
import { findAgeGroup } from "../lib/find-age-group";
import type { AgeGroup } from "../types";
import { settingsAtom } from "./setting-atom";

export const ageAtom = atom<number>(
  (get) => convertBirthDateToAge(get(settingsAtom).birthDate) || 0,
);

export const ageGroupAtom = atom<AgeGroup>((get) => {
  const age = get(ageAtom);
  return findAgeGroup(age);
});
