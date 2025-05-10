"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NavBar from "../../../components/navbar";
import AdCard from "../../../components/ad-card";
import adImage from "@/assets/images/ad-card.jpg";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getContentById, getContent } from "@/api/content.api";
import { formatDistanceToNow } from "date-fns";

export default function NewsView() {
  const params = useParams();
  const id = params.id as string; // Get the "id" from the dynamic route

  const [article, setArticle] = useState<NewsItem | null>(null);
  interface NewsItem {
    _id: string;
    category: string;
    headline1: string;
    headline2?: string;
    contentBlocks?: {
      data: boolean;
      type: string;
      content?: string;
    }[];
    headlineImage?: string;
    author: string;
    createdTime: string;
  }

  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the article and related news
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        // Fetch the current article
        const articleData = (await getContentById(id)) as { data: NewsItem };
        setArticle(articleData.data);

        // Fetch all news to find related ones (same category)
        const allNewsResponse = await getContent();
        const allNews = (allNewsResponse as unknown as { data: NewsItem[] })
          .data;

        // Filter related news (same category, excluding current article)
        if (articleData.data && articleData.data.category) {
          const related = allNews
            .filter(
              (item) =>
                item.category === articleData.data.category && item._id !== id
            )
            .slice(0, 2); // Get only 2 related articles

          setRelatedNews(related);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load article. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);

  // Loading state
  if (isLoading) {
    return (
      <main>
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>පුවත් ලිපිය ලබා ගැනීමට...</p>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !article) {
    return (
      <main>
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-10 text-red-500">
            {error || "පුවත් ලිපිය සොයා ගත නොහැක"}
          </div>
        </div>
      </main>
    );
  }

  // Get the content blocks (paragraphs) from the article
  const contentBlocks = article.contentBlocks || [];
  const paragraphs = contentBlocks
    .filter((block) => block.type === "paragraph")
    .map((block) => block.content || "");

  return (
    <main>
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="text-xs mb-4">
          <Link href="/" className="text-blue-500 hover:underline">
            Home
          </Link>{" "}
          &gt;
          <Link
            href={`/?category=${article.category}`}
            className="text-blue-500 hover:underline ml-1"
          >
            {article.category}
          </Link>{" "}
          &gt;
          <span className="text-gray-700 ml-1">
            {article.headline1?.substring(0, 20)}...
          </span>
        </div>

        {/* Article Header */}
        <div className="mb-6">
          <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded mb-2">
            {article.category}
          </span>
          <h1 className="text-2xl font-bold mb-2">{article.headline1}</h1>
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <span className="font-medium">{article.author}</span> විසින් •{" "}
            {formatDistanceToNow(new Date(article.createdTime), {
              addSuffix: true,
            })}
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-80 mb-6 rounded-lg overflow-hidden">
          {article.headlineImage && (
            <Image
              src={article.headlineImage}
              alt={article.headline1}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* Article Content */}
        <div className="prose max-w-none mb-8">
          {/* Display headline2 as a subheading if available */}
          {article.headline2 && (
            <h2 className="text-xl font-semibold mb-4">{article.headline2}</h2>
          )}

          {/* Display headline3 as a secondary subheading if available */}
          {article.headline1 && (
            <h3 className="text-lg font-medium mb-3">{article.headline1}</h3>
          )}

          {/* Display content blocks */}
          {contentBlocks.length > 0
            ? contentBlocks.map((block, index) => {
                if (block.type === "paragraph") {
                  return (
                    <p
                      key={index}
                      className="mb-4 text-gray-800 leading-relaxed"
                    >
                      {block.content}
                    </p>
                  );
                } else if (block.type === "image" && block.data) {
                  return (
                    <div key={index} className="relative w-full h-64 my-6">
                      <Image
                        src={typeof block.data === "string" ? block.data : ""}
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  );
                } else if (block.type === "video" && block.data) {
                  return (
                    <div key={index} className="my-6">
                      <iframe
                        width="100%"
                        height="315"
                        src={typeof block.data === "string" ? block.data : ""}
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
            : // If no content blocks, display the paragraphs
              paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
        </div>

        {/* Advertisement */}
        <div className="my-8">
          <AdCard
            image={adImage}
            title="This Brilliant Japanese Invention Instantly Translates Foreign Languages"
            brand="Enence"
          />
        </div>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">තවත් පුවත්</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedNews.map((news) => (
                <Link href={`/news/${news._id}`} key={news._id} passHref>
                  <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-300">
                    <div className="relative w-full h-40">
                      {news.headlineImage && (
                        <Image
                          src={news.headlineImage}
                          alt={news.headline1}
                          fill
                          className="object-cover"
                        />
                      )}
                      <div className="absolute top-2 right-2 bg-white/80 text-xs px-2 py-0.5 rounded">
                        {news.category}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold mb-1 leading-snug">
                        {news.headline1}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-3">
                        {news.headline2 ||
                          (news.contentBlocks &&
                          news.contentBlocks[0]?.type === "paragraph"
                            ? news.contentBlocks[0].content?.substring(0, 100) +
                              "..."
                            : "")}
                      </p>
                      <div className="text-[10px] text-gray-500">
                        <span className="font-medium">{news.author}</span>{" "}
                        විසින් •{" "}
                        {formatDistanceToNow(new Date(news.createdTime), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
