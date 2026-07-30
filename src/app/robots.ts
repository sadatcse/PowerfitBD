import { type MetadataRoute } from "next";
import { SITE } from "@/constants/site";

/** Generated at /robots.txt. The dashboard and API are kept out of the index. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/dashboard/", "/api/", "/login"],
      },
    ],
    sitemap: new URL("/sitemap.xml", SITE.url).toString(),
    host: SITE.url,
  };
}
