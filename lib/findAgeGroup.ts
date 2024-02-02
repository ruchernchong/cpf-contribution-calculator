import { ageGroups } from "../data";

export const findAgeGroup = (age: number) => {
  for (const ageGroup of ageGroups) {
    if (
      age >= ageGroup.minAge &&
      (age <= Number(ageGroup.maxAge) || !ageGroup.maxAge)
    ) {
      return ageGroup;
    }
  }

  return ageGroups[0];
};
