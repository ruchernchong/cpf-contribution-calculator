import { cpfIncomeCeilings } from "@/data";
import { closestTo, max, parse } from "date-fns";
import { formatDate } from "./format";

export const findLatestIncomeCeilingDate = (): string => {
  const currentDate = new Date();

  const pastDates = Object.entries(cpfIncomeCeilings)
    .map(([effectiveDate, ceilingThreshold]) => ({
      effectiveDate: parse(effectiveDate, "yyyy-MM-dd", new Date()),
      ceilingThreshold,
    }))
    .filter(({ effectiveDate }) => effectiveDate < currentDate);

  const closestPastDate = closestTo(
    currentDate,
    pastDates.map(({ effectiveDate }) => effectiveDate),
  );
  console.log(closestPastDate);

  if (closestPastDate) {
    return formatDate(closestPastDate, "yyyy-MM-dd");
  }

  const latestDate = max(pastDates.map(({ effectiveDate }) => effectiveDate));

  return formatDate(latestDate, "yyyy-MM-dd");
};
