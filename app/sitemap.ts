import type { MetadataRoute } from "next";
import { BASE_URL } from "../config";

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
};

export default sitemap;
