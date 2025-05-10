"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NavBar from "../../../components/navbar";
import AdCard from "../../../components/ad-card";
import NewsCard from "../../../components/news-card";
import adImage from "@/assets/images/ad-card.jpg";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getContentById, getContent } from "@/api/content.api";
import { formatDistanceToNow } from "date-fns";

interface NewsItem {
  _id: string;
  category: string;
  headline1: string;
  headline2?: string;
  headline3?: string;
  contentBlocks?: {
    data: boolean | string;
    type: string;
    content?: string;
  }[];
  headlineImage?: string;
  author: string;
  createdTime: string;
}

export default function NewsView() {
  const params = useParams();
  const id = params.id as string;

  const [article, setArticle] = useState<NewsItem | null>(null);
  const [, setRelatedNews] = useState<NewsItem[]>([]);
  const [additionalNews, setAdditionalNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const articleData = (await getContentById(id)) as { data: NewsItem };
        setArticle(articleData.data);

        const allNewsResponse = await getContent();
        const allNews = (allNewsResponse as unknown as { data: NewsItem[] }).data;

        if (articleData.data?.category) {
          const related = allNews
            .filter(
              (item) =>
                item.category === articleData.data.category && item._id !== id
            )
            .slice(0, 2);
          setRelatedNews(related);
        }

        const additional = allNews
          .filter((item) => item._id !== id)
          .slice(0, 9);
        setAdditionalNews(additional);

        setError(null);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load article. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <main>
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>පුවත් ලිපිය ලබා ගැනීමට...</p>
        </div>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main>
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-red-500">
          {error || "පුවත් ලිපිය සොයා ගත නොහැක"}
        </div>
      </main>
    );
  }

  const contentBlocks = article.contentBlocks || [];

  return (
    <main>
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="text-xs mb-4">
          <Link href="/" className="text-blue-500 hover:underline">
            Home
          </Link>{" "}
          &gt;{" "}
          <Link
            href={`/?category=${article.category}`}
            className="text-blue-500 hover:underline"
          >
            {article.category}
          </Link>{" "}
          &gt;{" "}
          <span className="text-gray-700">{article.headline1?.slice(0, 30)}...</span>
        </div>

        {/* Article Header */}
        <div className="mb-6">
          <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded mb-2">
            {article.category}
          </span>
          <h1 className="text-2xl font-bold mb-2">{article.headline1}</h1>
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span className="font-medium">{article.author}</span> •{" "}
            {formatDistanceToNow(new Date(article.createdTime), {
              addSuffix: true,
            })}
          </div>
        </div>

        {/* Featured Image */}
        {article.headlineImage && (
          <div className="relative w-full h-80 mb-6 rounded-lg overflow-hidden">
            <Image
              src={article.headlineImage}
              alt={article.headline1}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose max-w-none mb-8">
          {article.headline2 && (
            <h2 className="text-xl font-semibold mb-4">{article.headline2}</h2>
          )}
          {article.headline3 && (
            <h3 className="text-lg font-medium mb-3">{article.headline3}</h3>
          )}

          {contentBlocks.length > 0
            ? contentBlocks.map((block, index) => {
                if (block.type === "paragraph") {
                  return (
                    <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                      {block.content}
                    </p>
                  );
                } else if (block.type === "image" && typeof block.data === "string") {
                  return (
                    <div key={index} className="relative w-full h-64 my-6">
                      <Image
                        src={block.data}
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  );
                } else if (block.type === "video" && typeof block.data === "string") {
                  return (
                    <div key={index} className="my-6">
                      <iframe
                        width="100%"
                        height="315"
                        src={block.data}
                        title={`Video ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  );
                }
                return null;
              })
            : null}
        </div>

        {/* Advertisement */}
        <div className="my-8">
          <AdCard
            image={adImage}
            title="This Brilliant Japanese Invention Instantly Translates Foreign Languages"
            brand="Enence"
          />
        </div>

        {/* Additional News */}
        <div className="my-8">
          <h2 className="text-xl font-bold mb-4">More News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalNews.map((news) => (
              <NewsCard
                key={news._id}
                id={news._id}
                image={news.headlineImage || "/fallback-image.jpg"}
                category={news.category}
                title={news.headline1}
                author={news.author}
                date={formatDistanceToNow(new Date(news.createdTime), {
                  addSuffix: true,
                })}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
