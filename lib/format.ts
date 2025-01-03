import { format, parse } from "date-fns";

type PercentageFormatOptions = {
  decimalPlaces?: number;
};

export const formatCurrency = (value: number | string): string => {
  const numericValue = typeof value === "string" ? Number(value) : value;

  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
  }).format(numericValue);
};

export const formatDate = (
  date: Date | string,
  dateFormat = "dd MMMM yyyy",
) => {
  const dateValue =
    date instanceof Date ? date : parse(date, "yyyy-MM-dd", new Date());
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
