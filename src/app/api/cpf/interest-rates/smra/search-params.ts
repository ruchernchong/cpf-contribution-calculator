import { createLoader, parseAsFloat } from "nuqs/server";

export const searchParams = {
  sgsYield: parseAsFloat,
};

export const loadSearchParams = createLoader(searchParams);
