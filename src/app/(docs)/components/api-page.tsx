import { createAPIPage } from "fumadocs-openapi/ui";
import { openapi } from "@/app/(docs)/lib/openapi";
import client from "./api-page.client";

export const APIPage = createAPIPage(openapi, {
  client,
});
