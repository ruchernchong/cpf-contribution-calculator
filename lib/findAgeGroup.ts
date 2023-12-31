import { ageGroups } from "../data";

export const findAgeGroup = (age: number) => {
  for (const group of ageGroups) {
    if (age >= group.minAge && (age <= Number(group.maxAge) || !group.maxAge)) {
      return group;
    }
  }

  return ageGroups[0];
};
