import { createOpenAPI } from "fumadocs-openapi/server";
import spec from "../../../../openapi.json";

export const openapi = createOpenAPI({
  input: async () => ({
    "./openapi.json": {
      ...spec,
      servers: [
        {
          url: "/api/cpf",
          description:
            process.env.NODE_ENV === "production"
              ? "Production"
              : "Development",
        },
      ],
    },
  }),
});
