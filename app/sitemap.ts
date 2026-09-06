import type { MetadataRoute } from "next";
import { wedding } from "@/lib/wedding";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: wedding.site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
