"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NavBar from "../../../components/navbar";
import AdCard from "../../../components/ad-card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getContentById } from "@/api/content.api";
import { formatDistanceToNow } from "date-fns";
import Footer from "../../../components/footer";

interface Article {
  headline1: string;
  headline2: string;
  headline3?: string;
  content: string;
  headlineImage?: string;
  author: string;
  category: string[] | string;
  keywords: string[] | string;
  createdTime: string;
  isFeatured?: boolean;
  isSpecial?: boolean;
}

export default function NewsView() {
  const params = useParams();
  const id = params.id as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = (await getContentById(id)) as { data: Article };
        setArticle(response.data);
      } catch (err) {
        setError("Failed to load article");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <main>
        <NavBar onCategorySelect={() => {}} selectedCategory={null} />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>පුවත් ලිපිය ලබා ගැනීමට...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main>
        <NavBar onCategorySelect={() => {}} selectedCategory={null} />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-10">
            <p className="text-red-500">{error || "Article not found"}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="font-dmSans">
      <NavBar onCategorySelect={() => {}} selectedCategory={null} />
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
            {Array.isArray(article.category)
              ? article.category[0]
              : article.category}
          </Link>{" "}
          &gt;
          <span className="text-gray-700 ml-1 font-muktaMalar">
            {article.headline1.substring(0, 20)}...
          </span>
        </div>

        {/* Article Header */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-2">
            {Array.isArray(article.category?.[0]) ? (
              article.category[0].map((cat: string, index: number) => (
                <span
                  key={index}
                  className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded"
                >
                  {cat}
                </span>
              ))
            ) : (
              <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded">
                {article.category}
              </span>
            )}
          </div>

          <h1 className="text-2xl lg:text-[32px] font-bold mb-2 font-muktaMalar">
            {article.headline1}
          </h1>
          <div className="flex items-center text-sm text-gray-600 mb-4">
            by<span className="font-medium ml-1">{article.author} </span> •{" "}
            {formatDistanceToNow(new Date(article.createdTime), {
              addSuffix: true,
            })}
          </div>
        </div>

        {/* Featured Image */}
        {article.headlineImage && (
          <div className="relative w-full aspect-[16/9] mb-6 rounded-lg overflow-hidden ">
            <Image
              src={article.headlineImage}
              alt={article.headline1}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <h2 className="text-xl text-gray-700 mb-1 font-bold font-muktaMalar">
          {article.headline2}
        </h2>
        {article.headline3 && (
          <h3 className="text-lg text-gray-600 mb-4 font-muktaMalar">
            {article.headline3}
          </h3>
        )}

        {/* Article Content */}
        <div className="prose max-w-none mb-8 font-muktaMalar text-[16px] [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-lg [&_iframe]:max-w-full">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Keywords */}
        {article.keywords && article.keywords.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(article.keywords) ? (
                Array.isArray(article.keywords[0]) ? (
                  article.keywords[0].map((keyword: string, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {keyword}
                    </span>
                  ))
                ) : (
                  article.keywords.map((keyword: string, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {keyword}
                    </span>
                  ))
                )
              ) : (
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {article.keywords}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Advertisement */}
        <div className="my-8">
          <AdCard position="Article Bottom" />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
