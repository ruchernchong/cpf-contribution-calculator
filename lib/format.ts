import { format, parse, toDate } from "date-fns";

type PercentageFormatOptions = {
  decimalPlaces?: number;
};

export const formatCurrency = (value: number | string): string => {
  if (typeof value === "string") {
    value = Number(value);
  }

  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
  }).format(value);
};

export const formatDate = (
  date: Date | string,
  dateFormat = "dd MMMM yyyy",
) => {
  if (date instanceof Date) {
    return format(date, dateFormat);
  }

  return format(parse(date, "MM-dd-yyyy", new Date()), dateFormat);
};

export const formatPercentage = (
  value: number | string,
  options?: PercentageFormatOptions,
): string => {
  if (typeof value === "string") {
    value = Number(value);
  }

  return new Intl.NumberFormat("en-SG", {
    style: "percent",
    maximumFractionDigits: options?.decimalPlaces || 2,
  }).format(value);
};
