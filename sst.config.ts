import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "cpf-contribution-calculator",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.stack(function site({ stack }) {
      const nextjsSite = new NextjsSite(stack, "site", {
        customDomain: {
          domainName: "cpf-contribution-calculator.ruchern.xyz",
          hostedZone: "ruchern.xyz",
        },
        experimental: {
          disableIncrementalCache: true,
        },
      });

      stack.addOutputs({
        SiteUrl: nextjsSite.url,
      });
    });
  },
} satisfies SSTConfig;
