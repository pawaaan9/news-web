"use client";

import { useEffect, useState } from "react";
import { getContent, ContentData } from "@/api/content.api";
import Image from "next/image";
import Link from "next/link";

export default function SpecialNews() {
  const [specialNews, setSpecialNews] = useState<ContentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialNews = async () => {
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
  }, []);

  if (loading) return <p>Loading special news...</p>;
  if (specialNews.length === 0) return <p>No special news available.</p>;

  return (
    <div className="h-full">
      <div className="bg-white border border-charcoal rounded-lg shadow p-6 h-full flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Special News</h2>
          <hr className="mt-2 border-charcoal" />
        </div>

        {/* News Grid */}
        <div className="flex-grow">
          <div className="grid gap-6 md:grid-cols-2 h-full">
            {specialNews.map((item) => {
              // Parse categories similar to NewsCard
              let parsedCategories: string[] = [];
              try {
                parsedCategories = JSON.parse(item.category);
              } catch (error) {
                console.error("Failed to parse category:", error);
                parsedCategories = ["Unknown"];
              }

              return (
                <Link 
                  href={`/news-view/${item.url}`} 
                  passHref 
                  key={item._id}
                  className="cursor-pointer h-full flex flex-col"
                >
                  <div className="rounded-lg overflow-hidden shadow-md bg-white relative hover:shadow-lg transition-shadow duration-300 flex-grow">
                    {/* Image container with category badge */}
                    <div className="relative w-full aspect-video">
                      <Image
                        src={item.headlineImage}
                        alt={item.headline1}
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
                      <h3 className="text-lg font-bold mt-1">{item.headline1}</h3>
                      <div className="text-sm text-gray-400 mt-2">
                        විසින් {item.author} •{" "}
                        {new Date(item.createdTime).toLocaleDateString("si-LK", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
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