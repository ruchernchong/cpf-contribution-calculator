import { MetadataRoute } from "next";
import { BASE_URL } from "../config";

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
    },
  ];
};

export default sitemap;
