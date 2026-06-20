import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: [
      "https://www.sgpostalcode.com/sitemap.xml",
      "https://www.sgpostalcode.com/sitemap-postal.xml",
    ],
    host: "https://www.sgpostalcode.com",
  };
}
