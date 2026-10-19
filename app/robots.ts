import type { MetadataRoute } from "next";
import { geoAiUserAgents } from "@/config/geo";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const aiRules = geoAiUserAgents.map((userAgent) => ({
    userAgent,
    allow: "/" as const,
    disallow: ["/admin/", "/admin"],
  }));

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin"],
      },
      ...aiRules,
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
