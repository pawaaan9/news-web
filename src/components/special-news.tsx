"use client";

import { useEffect, useState } from "react";
import { getContent, ContentData } from "@/api/content.api";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

interface SpecialNewsProps {
  shouldFetch: boolean;
}

export default function SpecialNews({ shouldFetch }: SpecialNewsProps) {
  const [specialNews, setSpecialNews] = useState<ContentData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/?category=${encodeURIComponent(categoryName)}`);
  };

  useEffect(() => {
    const fetchSpecialNews = async () => {
      if (!shouldFetch) {
        setLoading(false);
        return;
      }

      try {
        const response = await getContent();
        const filtered = response.data
          .filter((item) => item.isSpecial === true)
          .slice(0, 2); // Limit to 2 items
        setSpecialNews(filtered);
      } catch (error) {
        console.error("Failed to load special news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialNews();
  }, [shouldFetch]);

  if (!shouldFetch) return null;
  if (loading)
    return (
      <span className="inline-block w-8 h-8 border-4 border-accent-orange border-t-transparent rounded-full animate-spin"></span>
    );
  if (specialNews.length === 0) return <p>No special news available.</p>;

  return (
    <div className="h-full">
      <div className="bg-white shadow-accent-teal rounded-xl shadow-sm  h-full flex flex-col">
        {/* Header */}
        <div className="mb-6 lg:flex lg:justify-center">
          <div
            className="inline-block px-6 py-2 lg:rounded-b-xl lg:rounded-t-none rounded-tl-xl rounded-br-xl font-bold text-lg md:text-2xl font-muktaMalar text-white shadow"
            style={{
              background: "linear-gradient(90deg, #0d9488 0%, #14b8a6 100%)",
              letterSpacing: "1px",
            }}
          >
            முக்கிய செய்திகள்
          </div>
        </div>

        {/* News Grid */}
        <div className="flex-grow">
          <div className="grid gap-6 md:grid-cols-2 h-full pb-4">
            {specialNews.map((item) => {
              // Parse categories similar to NewsCard
              // let parsedCategories: string[] = [];
              // try {
              //   parsedCategories = JSON.parse(item.category);
              // } catch (error) {
              //   console.error("Failed to parse category:", error);
              //   parsedCategories = ["Unknown"];
              // }

              return (
                <div
                  key={item._id}
                  className="cursor-pointer h-full flex flex-col"
                >
                  <div className="rounded-lg overflow-hidden shadow-md mx-2 bg-white relative hover:shadow-lg transition-shadow duration-300 flex-grow">
                    <div className="relative w-full pt-[56.25%]">
                      {/* 16:9 aspect ratio */}
                      <Link href={`/news/${item.url}`} passHref>
                        <Image
                          src={item.headlineImage}
                          alt={item.headline1}
                          fill
                          className="object-cover absolute inset-0 w-full h-full"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority
                        />
                      </Link>
                      {/* Category badge in top-left corner */}
                      {item.category && (
                        <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-20">
                          {Array.isArray(item.category) ? (
                            item.category.map((cat: any, idx: number) => (
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
                                handleCategoryClick(item.category as string);
                              }}
                              className="bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white text-xs px-2 py-0.5 rounded cursor-pointer hover:underline"
                            >
                              {item.category}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <Link href={`/news/${item.url}`} passHref>
                      <div className="p-4">
                        <h3 className="text-lg font-bold font-muktaMalar leading-5 line-clamp-2">
                          {item.headline1}
                        </h3>
                        <div className="text-sm text-gray-400 mt-2 flex justify-between">
                          <div>by {item.author} </div>

                          {formatDistanceToNow(new Date(item.createdTime), {
                            addSuffix: true,
                          })}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
