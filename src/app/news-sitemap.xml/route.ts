import { getContent } from "@/api/content.api";
import { NextResponse } from "next/server";

export async function GET() {
  const BASE_URL = "https://tamilmedia.lk";
  const PUBLICATION_NAME = "Tamil Media";
  const PUBLICATION_LANGUAGE = "ta"; // ISO 639 language code for Tamil

  let items = "";

  try {
    const response = await getContent();
    const articles = response.data.slice(0, 1000); // Google News supports up to 1000 items from the past 2 days

    items = articles
      .map((item) => {
        const pubDate = new Date(item.createdTime || Date.now()).toISOString();
        return `
          <url>
            <loc>${BASE_URL}/news-view/${item.url}</loc>
            <news:news>
              <news:publication>
                <news:name>${PUBLICATION_NAME}</news:name>
                <news:language>${PUBLICATION_LANGUAGE}</news:language>
              </news:publication>
              <news:publication_date>${pubDate}</news:publication_date>
              <news:title><![CDATA[${item.headline1}]]></news:title>
            </news:news>
          </url>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Error generating news sitemap:", error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    ${items}
  </urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
