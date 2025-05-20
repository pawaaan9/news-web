"use client";

import { useEffect, useState } from "react";
import { getContent, ContentData } from "@/api/content.api";
import Image from "next/image";
import Link from "next/link";

interface SpecialNewsProps {
  shouldFetch: boolean;
}

export default function SpecialNews({ shouldFetch }: SpecialNewsProps) {
  const [specialNews, setSpecialNews] = useState<ContentData[]>([]);
  const [loading, setLoading] = useState(true);

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
  if (loading) return <p>Loading special news...</p>;
  if (specialNews.length === 0) return <p>No special news available.</p>;

  return (
    <div className="h-full">
      <div className="bg-gray-100 shadow-accent-teal rounded-lg shadow-sm  h-full flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div
            className="inline-block px-6 py-2 rounded-tl-xl rounded-br-xl font-bold text-lg md:text-2xl font-muktaMalar text-white shadow"
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
                <Link
                  href={`/news-view/${item._id}`}
                  passHref
                  key={item._id}
                  className="cursor-pointer h-full flex flex-col"
                >
                  <div className="rounded-lg overflow-hidden shadow-md mx-2 bg-white relative hover:shadow-lg transition-shadow duration-300 flex-grow">
                    {/* Image container with category badge */}
                    <div className="relative w-full pt-[56.25%]">
                      {" "}
                      {/* 16:9 aspect ratio */}
                      <Image
                        src={item.headlineImage}
                        alt={item.headline1}
                        fill
                        className="object-cover absolute inset-0 w-full h-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />
                      {/* Category badge in top-right corner */}
                      {/* <div className="absolute top-2 right-2 bg-teal-100 text-teal-800 text-xs px-2 py-0.5 rounded">
                        {parsedCategories.map((cat, index) => (
                          <span key={index} className="mr-1">
                            {cat}
                          </span>
                        ))}
                      </div> */}
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-bold font-muktaMalar">
                        {item.headline1}
                      </h3>
                      <div className="text-sm text-gray-400 mt-2 ">
                        by {item.author} •{" "}
                        {new Date(item.createdTime).toLocaleDateString(
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
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
