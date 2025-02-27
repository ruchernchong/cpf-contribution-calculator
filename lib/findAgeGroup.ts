import { ageGroups } from "../data";

export const findAgeGroup = (age: number) => {
  // Special handling for boundary cases - find the right group when age matches minAge
  for (let i = ageGroups.length - 1; i >= 0; i--) {
    const ageGroup = ageGroups[i];
    if (age === ageGroup.minAge) {
      return ageGroup;
    }
  }

  // Regular case
  for (const ageGroup of ageGroups) {
    if (
      age > ageGroup.minAge &&
      (age <= Number(ageGroup.maxAge) || !ageGroup.maxAge)
    ) {
      return ageGroup;
    }
  }

  return ageGroups[0];
};
