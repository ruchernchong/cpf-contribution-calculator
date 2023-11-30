import moment from "moment";
import { formatDate } from "./format";
import { CPFIncomeCeiling } from "../types";

export const findLatestIncomeCeilingDate = (
  dates: CPFIncomeCeiling[]
): string => {
  const currentDate = moment();

  const pastDates = dates
    .map(({ effectiveDate, ceiling }) => ({
      effectiveDate: moment(effectiveDate, "MM-DD-YYYY"),
      ceiling,
    }))
    .filter(({ effectiveDate }) => effectiveDate.isBefore(currentDate));

  const closestPastDate = moment.max(
    pastDates.map(({ effectiveDate }) => effectiveDate)
  );

  if (closestPastDate) {
    return formatDate(closestPastDate, "MM-DD-YYYY");
  }

  return formatDate(
    pastDates.reverse().map(({ effectiveDate }) => effectiveDate)[0],
    "MM-DD-YYYY"
  );
};
