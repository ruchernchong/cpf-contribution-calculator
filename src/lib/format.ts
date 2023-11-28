import { format, parse } from "date-fns";

type PercentageFormatOptions = {
  decimalPlaces?: number;
};

type DateOptions = {
  inputFormat: string;
  outputFormat?: string;
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

/**
 * TODO: Clean up this function
 *
 * @param date
 * @param options
 */
export const formatDate = (date: Date | string, options?: DateOptions) => {
  let inputFormat = "MM-yyyy";
  let outputFormat = "MM-yyyy";

  if (options?.outputFormat) {
    inputFormat = options.inputFormat;
  }
  if (options?.outputFormat) {
    outputFormat = options.outputFormat;
  }

  if (typeof date === "string") {
    date = parse(date, inputFormat, new Date());
  }

  return format(date, outputFormat);
};

export const formatPercentage = (
  value: number | string,
  options?: PercentageFormatOptions
): string => {
  if (typeof value === "string") {
    value = Number(value);
  }

  return new Intl.NumberFormat("en-SG", {
    style: "percent",
    maximumFractionDigits: options?.decimalPlaces || 2,
  }).format(value);
};
