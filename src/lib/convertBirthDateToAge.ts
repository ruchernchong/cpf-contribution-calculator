import { differenceInYears, parse } from "date-fns";

export const convertBirthDateToAge = (birthDate: string): number => {
  const parsedDate = parse(birthDate, "MM/yyyy", new Date());
  const currentDate = new Date();

  return differenceInYears(currentDate, parsedDate);
};
