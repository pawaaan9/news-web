"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NavBar from "../../../components/navbar";
import LargeAdCard from "../../../components/large-ad-card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getContentById } from "@/api/content.api";
import { formatDistanceToNow } from "date-fns";
import Footer from "../../../components/footer";
import AdCard from "@/components/ad-card";

interface Article {
  headline1: string;
  headline2: string;
  headline3?: string;
  content: string;
  headlineImage?: string;
  author: string;
  category: { name: string; subCategory?: string }[] | string;
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
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
    <main className="font-dmSans bg-gray-100 mt-[120px] lg:mt-[160px] py-6">
      <NavBar onCategorySelect={() => {}} selectedCategory={null} />
      <div className="max-w-4xl mx-auto px-4 py-8 bg-white my-4 rounded-lg shadow">
        {/* Breadcrumbs */}
        <div className="text-xs mb-4">
          <Link href="/" className="text-blue-500 hover:underline">
            Home
          </Link>{" "}
          &gt;
          <Link
            href={`/?category=${
              Array.isArray(article.category)
                ? article.category[0]?.name
                : article.category
            }`}
            className="text-blue-500 hover:underline ml-1"
          >
            {Array.isArray(article.category)
              ? article.category[0]?.name
              : article.category}
          </Link>
          &gt;
          <span className="text-gray-700 ml-1 font-muktaMalar">
            {article.headline1.substring(0, 20)}...
          </span>
        </div>

        {/* Article Header */}
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            {Array.isArray(article.category) ? (
              article.category.map(
                (
                  cat: { name: string; subCategory?: string },
                  index: number
                ) => (
                  <span
                    key={index}
                    className="inline-block bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white text-xs px-2 py-1 rounded"
                  >
                    {cat.subCategory
                      ? `${cat.name} (${cat.subCategory})`
                      : cat.name}
                  </span>
                )
              )
            ) : (
              <span className="inline-block bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white text-xs px-2 py-1 rounded">
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

        <hr className="border-b border-gray-200 mb-4" />

        {/* Featured Image */}
        {article.headlineImage && (
          <div className="relative w-full aspect-[16/9] mb-6 rounded-lg overflow-hidden my-6">
            <Image
              src={article.headlineImage}
              alt={article.headline1}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <hr className="border-b border-gray-200 mb-4" />

        {/* First Advertisement */}
        <div className="my-8 flex justify-center lg:hidden">
          <LargeAdCard />
        </div>

        <h2 className="text-xl text-gray-700 mb-1 font-bold font-muktaMalar">
          {article.headline2}
        </h2>

        {article.headline3 && (
          <h3 className="text-lg text-gray-600 mb-4 font-muktaMalar">
            {article.headline3}
          </h3>
        )}

        {/* Article Content */}
        <div className="prose max-w-none mb-8 font-muktaMalar prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Keywords */}
        {article.keywords && article.keywords.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {Array.isArray(article.keywords) ? (
                Array.isArray(article.keywords[0]) ? (
                  article.keywords[0].map((keyword: string, index: number) => (
                    <Link
                      key={index}
                      href={`/keyword/${encodeURIComponent(keyword)}`}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      {keyword}
                    </Link>
                  ))
                ) : (
                  article.keywords.map((keyword: string, index: number) => (
                    <Link
                      key={index}
                      href={`/keyword/${encodeURIComponent(keyword)}`}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      {keyword}
                    </Link>
                  ))
                )
              ) : (
                <Link
                  href={`/keyword/${encodeURIComponent(article.keywords)}`}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {article.keywords}
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Advertisement */}
        <div className="my-8 flex lg:hidden">
          <AdCard position="Medium Rectangle" />
        </div>
      </div>
      <Footer />
    </main>
  );
}
