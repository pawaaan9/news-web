"use client";

import { useEffect, useState } from "react";
import { getContent, ContentData } from "@/api/content.api";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

interface FeatureNewsProps {
  shouldFetch: boolean;
}

export default function FeatureNews({ shouldFetch }: FeatureNewsProps) {
  const [featuredNews, setFeaturedNews] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/?category=${encodeURIComponent(categoryName)}`);
  };

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
  if (loading)
    return (
      <span className="inline-block w-8 h-8 border-4 border-accent-orange border-t-transparent rounded-full animate-spin"></span>
    );
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
      <div className="bg-white shadow-acccent-orange rounded-xl shadow-sm  h-full flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div
            className="inline-block px-6 py-2 rounded-tl-xl rounded-br-xl font-bold text-lg md:text-2xl font-muktaMalar text-white shadow"
            style={{
              background: "linear-gradient(90deg, #ff3131 0%, #ff914d 100%)",
              letterSpacing: "1px",
            }}
          >
            சிறப்பு செய்தி
          </div>
        </div>

        {/* Featured News Item */}
        <div className="flex-grow">
          <div className="cursor-pointer h-full flex flex-col">
            <div className="rounded-lg overflow-hidden shadow-md bg-white relative hover:shadow-lg transition-shadow duration-300 flex-grow">
              {/* Image container with category badge */}
              <div className="relative w-full pt-[56.25%]">
                {" "}
                {/* 16:9 aspect ratio */}
                <Link href={`/news/${featuredNews.url}`} passHref>
                  <Image
                    src={featuredNews.headlineImage}
                    alt={featuredNews.headline1}
                    fill
                    className="object-cover absolute inset-0 w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </Link>
                {/* Category badge in top-left corner */}
                {featuredNews.category && (
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-20">
                    {Array.isArray(featuredNews.category) ? (
                      featuredNews.category.map((cat: any, idx: number) => (
                        <span
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategoryClick(cat.name);
                          }}
                          className="bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white text-xs px-2 py-0.5 rounded cursor-pointer hover:underline"
                        >
                          {cat.subCategory
                            ? `${cat.name} (${cat.subCategory})`
                            : cat.name}
                        </span>
                      ))
                    ) : (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(featuredNews.category as string);
                        }}
                        className="bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white text-xs px-2 py-0.5 rounded cursor-pointer hover:underline"
                      >
                        {featuredNews.category}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <Link href={`/news/${featuredNews.url}`} passHref>
                <div className="p-4">
                  <h3 className="text-lg font-bold font-muktaMalar leading-5 line-clamp-2">
                    {featuredNews.headline1}
                  </h3>
                  <div className="text-sm text-gray-400 mt-2 flex justify-between">
                    <div>by {featuredNews.author} </div>

                    {featuredNews.scheduledPublishDate
                      ? formatDistanceToNow(
                          new Date(featuredNews.scheduledPublishDate),
                          { addSuffix: true }
                        )
                      : featuredNews.modifiedTime
                      ? formatDistanceToNow(
                          new Date(featuredNews.modifiedTime),
                          { addSuffix: true }
                        )
                      : ""}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
