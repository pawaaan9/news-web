"use client";

import { useEffect, useState } from "react";
import { getContent, ContentData } from "@/api/content.api";
import Image from "next/image";
import Link from "next/link";

export default function FeatureNews() {
  const [featuredNews, setFeaturedNews] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedNews = async () => {
      try {
        const response = await getContent();
        const featuredItem = response.data.find((item) => item.isFeatured === true);
        setFeaturedNews(featuredItem || null);
      } catch (error) {
        console.error("Failed to load featured news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedNews();
  }, []);

  if (loading) return <p>Loading featured news...</p>;
  if (!featuredNews) return <p>No featured news available.</p>;

  // Parse categories
  let parsedCategories: string[] = [];
  try {
    parsedCategories = JSON.parse(featuredNews.category);
  } catch (error) {
    console.error("Failed to parse category:", error);
    parsedCategories = ["Unknown"];
  }

  return (
    <div className="h-full">
      <div className="bg-white border border-charcoal rounded-lg shadow p-6 h-full flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Featured News</h2>
          <hr className="mt-2 border-charcoal" />
        </div>

        {/* Featured News Item */}
        <div className="flex-grow">
          <Link 
            href={`/news-view/${featuredNews.url}`} 
            passHref 
            className="cursor-pointer h-full flex flex-col"
          >
            <div className="rounded-lg overflow-hidden shadow-md bg-white relative hover:shadow-lg transition-shadow duration-300 flex-grow">
              {/* Image container with category badge */}
              <div className="relative w-full aspect-video">
                <Image
                  src={featuredNews.headlineImage}
                  alt={featuredNews.headline1}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Category badge in top-right corner */}
                <div className="absolute top-2 right-2 bg-zinc-200 text-xs px-2 py-0.5 rounded">
                  {parsedCategories.map((cat, index) => (
                    <span key={index} className="mr-1">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold mt-1">{featuredNews.headline1}</h3>
                <div className="text-sm text-gray-400 mt-2">
                  විසින් {featuredNews.author} •{" "}
                  {new Date(featuredNews.createdTime).toLocaleDateString("si-LK", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}