import { createLoader, parseAsString } from "nuqs/server";

export const searchParams = {
  birthDate: parseAsString,
};

export const loadSearchParams = createLoader(searchParams);
