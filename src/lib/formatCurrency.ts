export const formatCurrency = (value: number | string) => {
  if (typeof value === "string") {
    value = Number(value);
  }

  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
  }).format(value);
};
