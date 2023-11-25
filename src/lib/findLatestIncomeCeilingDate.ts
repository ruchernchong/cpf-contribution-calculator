import { closestTo, format, parse } from "date-fns";
import { CPFIncomeCeiling } from "../types";

export const findLatestIncomeCeilingDate = (
  dates: CPFIncomeCeiling[]
): string => {
  const currentDate = new Date();

  const pastDates = dates
    .map(({ effectiveDate, ceiling }) => ({
      effectiveDate: parse(effectiveDate, "MM-yyyy", new Date()),
      ceiling,
    }))
    .filter(({ effectiveDate }) => effectiveDate < currentDate);

  const closestPastDate = closestTo(
    currentDate,
    pastDates.map(({ effectiveDate }) => effectiveDate)
  );

  if (closestPastDate) {
    return formatDateStandard(closestPastDate);
  }

  return formatDateStandard(
    pastDates.reverse().map(({ effectiveDate }) => effectiveDate)[0]
  );
};

const formatDateStandard = (date: Date) => format(date, "MM-yyyy");
