import moment from "moment";

export const convertBirthDateToAge = (birthDate: string) => {
  const parsedDate = moment(birthDate, "MM/YYYY");
  const currentDate = moment();

  return currentDate.diff(parsedDate, "years");
};
