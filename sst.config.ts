import type { SSTConfig } from "sst";
import { StaticSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "cpf-contribution-calculator",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.stack(function site({ stack }) {
      const staticSite = new StaticSite(stack, "site", {
        buildOutput: "dist",
        buildCommand: "bun run build",
        customDomain: {
          domainName: "cpf-contribution-calculator.ruchern.xyz",
          hostedZone: "ruchern.xyz",
        },
      });

      stack.addOutputs({
        SiteUrl: staticSite.url,
      });
    });
  },
} satisfies SSTConfig;
