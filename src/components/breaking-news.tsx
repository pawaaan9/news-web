"use client";

import { useEffect, useState } from "react";
import { getContent, ContentData } from "@/api/content.api";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { stripHtml } from "string-strip-html";
import speaker from "@/assets/images/speakerphone.svg";

interface BreakingNewsProps {
  shouldFetch: boolean;
}

export default function BreakingNews({ shouldFetch }: BreakingNewsProps) {
  const [breakingNews, setBreakingNews] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/?category=${encodeURIComponent(categoryName)}`);
  };

  useEffect(() => {
    const fetchBreakingNews = async () => {
      if (!shouldFetch) {
        setLoading(false);
        return;
      }

      try {
        const response = await getContent();
        const breakingItem = response.data.find(
          (item) => item.isBreaking === true && item.status === "Published"
        );
        setBreakingNews(breakingItem || null);
      } catch (error) {
        console.error("Failed to load breaking news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreakingNews();
  }, [shouldFetch]);

  if (!shouldFetch) return null;
  if (loading)
    return (
      <span className="inline-block w-8 h-8 border-4 border-accent-orange border-t-transparent rounded-full animate-spin"></span>
    );
  if (!breakingNews) return null;

  return (
    <div className="w-full mb-8">
      <div className="bg-white rounded-xl shadow-md flex flex-col lg:flex-row overflow-hidden h-full lg:h-[260px]">
        {/* Image */}
        <div className="relative w-full h-[220px] lg:w-[400px] lg:h-auto flex-shrink-0">
          {/* Badge on top of image for mobile only */}
          <div className="absolute top-3 left-3 z-10 block lg:hidden">
            <span
              className="inline-block px-6 py-2 rounded-lg font-bold text-lg md:text-2xl font-rubik bg-red-500 text-white shadow"
              style={{
                letterSpacing: "1px",
              }}
            >
              BREAKING
            </span>
          </div>
          <Link href={`/news/${breakingNews.url}`}>
            <Image
              src={breakingNews.headlineImage}
              alt={breakingNews.headline1}
              fill
              className="object-cover"
              priority
            />
          </Link>
        </div>
        {/* Content */}
        <div className="flex-1 flex flex-col justify-between pb-6">
          {/* Badge */}
          <div className="hidden lg:flex items-center mb-2 justify-start lg:justify-end">
            <span
              className="inline-block px-6 py-2 rounded-tr-xl rounded-bl-xl font-bold text-lg md:text-2xl font-rubik bg-red-500 text-white shadow"
              style={{
                letterSpacing: "1px",
              }}
            >
              BREAKING
            </span>
          </div>
          {/* Headline */}
          <Link href={`/news/${breakingNews.url}`}>
            <h2 className="text-2xl lg:text-3xl font-bold font-muktaMalar mb-2 leading-tight  px-6 pt-4 lg:pt-0">
              {breakingNews.headline1}
            </h2>
          </Link>
          {/* Content */}
          <div className="text-base lg:text-lg text-gray-700 mb-4 line-clamp-2 px-6 cursor-pointer">
            {stripHtml(breakingNews.content || "").result.slice(0, 160)}...
          </div>
          {/* Author & Time */}
          <div className="flex justify-between text-sm text-gray-400 px-6 cursor-pointer">
            <span>by {breakingNews.author}</span>
            <span>
              {formatDistanceToNow(new Date(breakingNews.createdTime), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
