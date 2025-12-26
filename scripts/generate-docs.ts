import { generateFiles } from "fumadocs-openapi";
import { openapi } from "../src/app/(docs)/lib/openapi";

void generateFiles({
  input: openapi,
  output: "./content/docs/api",
  per: "operation",
  groupBy: "tag",
});
