import { closestTo, max, parse } from "date-fns";
import { formatDate } from "./format";
import { CPFIncomeCeiling } from "../types";

export const findLatestIncomeCeilingDate = (
  dates: CPFIncomeCeiling[],
): string => {
  const currentDate = new Date();

  const pastDates = dates
    .map(({ effectiveDate, ceiling }) => ({
      effectiveDate: parse(effectiveDate, "MM-dd-yyyy", new Date()),
      ceiling,
    }))
    .filter(({ effectiveDate }) => effectiveDate < currentDate);

  const closestPastDate = closestTo(
    currentDate,
    pastDates.map(({ effectiveDate }) => effectiveDate),
  );

  if (closestPastDate) {
    return formatDate(closestPastDate, "MM-dd-yyyy");
  }

  const latestDate = max(pastDates.map(({ effectiveDate }) => effectiveDate));

  return formatDate(latestDate, "MM-dd-yyyy");
};
