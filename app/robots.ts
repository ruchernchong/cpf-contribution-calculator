import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://cpf-contribution-calculator.ruchern.xyz/sitemap.xml",
  };
};

export default robots;
