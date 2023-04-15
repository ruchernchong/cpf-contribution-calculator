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
