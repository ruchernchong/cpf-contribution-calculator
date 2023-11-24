import { ageGroups } from "../data";

export const findAgeGroup = (age: number) => {
  for (const group of ageGroups) {
    if (age >= group.min && (age <= Number(group.max) || !group.max)) {
      return group;
    }
  }
};
