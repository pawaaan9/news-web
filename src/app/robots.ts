import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin"],
    },
    sitemap: [
      "https://tamilmedia.lk/sitemap.xml",
      "https://tamilmedia.lk/news-sitemap.xml",
    ],
  };
}
