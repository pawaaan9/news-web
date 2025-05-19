"use client";

import { useEffect, useState } from "react";
import { getContent, ContentData } from "@/api/content.api";
import Image from "next/image";
import Link from "next/link";

interface FeatureNewsProps {
  shouldFetch: boolean;
}

export default function FeatureNews({ shouldFetch }: FeatureNewsProps) {
  const [featuredNews, setFeaturedNews] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedNews = async () => {
      if (!shouldFetch) {
        setLoading(false);
        return;
      }

      try {
        const response = await getContent();
        const featuredItem = response.data.find(
          (item) => item.isFeatured === true
        );
        setFeaturedNews(featuredItem || null);
      } catch (error) {
        console.error("Failed to load featured news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedNews();
  }, [shouldFetch]);

  if (!shouldFetch) return null;
  if (loading) return <p>Loading featured news...</p>;
  if (!featuredNews) return <p>No featured news available.</p>;

  // Parse categories
  // let parsedCategories: string[] = [];
  // try {
  //   parsedCategories = JSON.parse(featuredNews.category);
  // } catch (error) {
  //   console.error("Failed to parse category:", error);
  //   parsedCategories = ["Unknown"];
  // }

  return (
    <div className="h-full">
      <div className="bg-white shadow-acccent-orange lg:border lg:border-charcoal rounded-lg shadow p-6 h-full flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div
            className="inline-block px-6 py-2 rounded-tl-xl rounded-br-xl font-bold text-lg md:text-2xl font-dmSans text-white shadow"
            style={{
              background: "linear-gradient(90deg, #ff3131 0%, #ff914d 100%)",
              letterSpacing: "1px",
            }}
          >
            சிறப்பு செய்திகள்
          </div>
        </div>

        {/* Featured News Item */}
        <div className="flex-grow">
          <Link
            href={`/news-view/${featuredNews._id}`}
            passHref
            className="cursor-pointer h-full flex flex-col"
          >
            <div className="rounded-lg overflow-hidden shadow-md bg-white relative hover:shadow-lg transition-shadow duration-300 flex-grow">
              {/* Image container with category badge */}
              <div className="relative w-full pt-[56.25%]">
                {" "}
                {/* 16:9 aspect ratio */}
                <Image
                  src={featuredNews.headlineImage}
                  alt={featuredNews.headline1}
                  fill
                  className="object-cover absolute inset-0 w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
                {/* Category badge in top-right corner */}
                {/* <div className="absolute top-2 right-2 bg-zinc-200 text-xs px-2 py-0.5 rounded">
                  {parsedCategories.map((cat, index) => (
                    <span key={index} className="mr-1">
                      {cat}
                    </span>
                  ))}
                </div> */}
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold font-muktaMalar">
                  {featuredNews.headline1}
                </h3>
                <div className="text-sm text-gray-400 mt-2">
                  by {featuredNews.author} •{" "}
                  {new Date(featuredNews.createdTime).toLocaleDateString(
                    "si-LK",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
