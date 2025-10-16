import { format, parse } from "date-fns";

type PercentageFormatOptions = {
  decimalPlaces?: number;
};

export const formatCurrency = (
  value: number | string,
  decimalPlaces = 2,
): string => {
  const numericValue = typeof value === "string" ? Number(value) : value;

  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(numericValue);
};

export const formatDate = (
  date: Date | string,
  dateFormat = "dd MMMM yyyy",
) => {
  let dateValue: Date;

  if (date instanceof Date) {
    dateValue = date;
  } else {
    // Try different date formats
    try {
      dateValue = parse(date, "yyyy-MM-dd", new Date());
    } catch (e) {
      try {
        dateValue = parse(date, "MM-dd-yyyy", new Date());
      } catch (e) {
        // Last resort, use the JS Date constructor
        dateValue = new Date(date);
      }
    }
  }

  return format(dateValue, dateFormat);
};

export const formatPercentage = (
  value: number | string,
  options?: PercentageFormatOptions,
): string => {
  const numericValue = typeof value === "string" ? Number(value) : value;

  return new Intl.NumberFormat("en-SG", {
    style: "percent",
    maximumFractionDigits: options?.decimalPlaces || 2,
  }).format(numericValue);
};
