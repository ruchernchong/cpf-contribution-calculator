import { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: "https://cpf-contribution-calculator.ruchern.xyz",
      lastModified: "2023-09-27",
    },
  ];
};

export default sitemap;
