import { type MetadataRoute } from "next";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";

/** Generated at /sitemap.xml — public marketing routes only. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: ROUTES.home, priority: 1, changeFrequency: "weekly" },
    { path: ROUTES.about, priority: 0.8, changeFrequency: "monthly" },
    { path: ROUTES.team, priority: 0.8, changeFrequency: "weekly" },
    { path: ROUTES.pricing, priority: 0.9, changeFrequency: "monthly" },
    { path: ROUTES.equipment, priority: 0.7, changeFrequency: "monthly" },
    { path: ROUTES.gallery, priority: 0.6, changeFrequency: "weekly" },
    { path: ROUTES.contact, priority: 0.7, changeFrequency: "monthly" },
  ];

  return entries.map(({ path, priority, changeFrequency }) => ({
    url: new URL(path, SITE.url).toString(),
    lastModified,
    changeFrequency,
    priority,
  }));
}
