import { getContent } from "@/api/content.api";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = "https://tamilmedia.lk";

  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const response = await getContent();
    postEntries = response.data.map((item) => ({
      url: `${BASE_URL}/news-view/${item.url}`,
      lastModified: item.createdTime ? new Date(item.createdTime) : new Date(),
    }));
  } catch {
    postEntries = [];
  }

  return [
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/user-guidelines`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/cookie-settings`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/data-protection`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: new Date(),
    },
    ...postEntries,
  ];
}
