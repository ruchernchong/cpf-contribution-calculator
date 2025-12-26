import { createLoader, parseAsInteger } from "nuqs/server";

export const searchParams = {
  age: parseAsInteger,
};

export const loadSearchParams = createLoader(searchParams);
