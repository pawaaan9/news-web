"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NavBar from "../../../components/navbar";
import LargeAdCard from "../../../components/large-ad-card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getContent, getContentByUrl } from "@/api/content.api";
import { formatDistanceToNow } from "date-fns";
import Footer from "../../../components/footer";
import AdCard from "@/components/ad-card";
import NewsCard from "@/components/news-card";
import { useRouter } from "next/navigation";
import RelatedNewsCard from "@/modules/shared/related-news-card";

interface Article {
  _id: string;
  url: string;
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

  const url = params.url as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [otherNews, setOtherNews] = useState<Article[]>([]);
  const [error, setError] = useState("");
  let beforeContent = "";
  let afterContent = "";
  if (article && article.content) {
    [beforeContent, afterContent] = splitContentAtParagraph(article.content, 2);
  }
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/?category=${encodeURIComponent(categoryName)}`);
  };

  const relatedNews = otherNews.slice(0, 2);

  function splitContentAtParagraph(html: string, afterParagraph = 2) {
    const parts = html.split(/(<\/p>)/i);
    let before = "";
    let after = "";
    let count = 0;
    for (let i = 0; i < parts.length; i++) {
      before += parts[i];
      if (parts[i].toLowerCase() === "</p>") count++;
      if (count === afterParagraph) {
        after = parts.slice(i + 1).join("");
        break;
      }
    }
    return [before, after];
  }

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = (await getContentByUrl(url)) as { data: Article };
        setArticle(response.data);
      } catch (err) {
        setError("Failed to load article");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchArticle();
    }
  }, [url]);

  useEffect(() => {
    const fetchOtherNews = async () => {
      try {
        const allNews = await getContent();
        // Exclude the current article
        const filtered = (allNews.data as Article[]).filter(
          (item: Article) => item.url !== url
        );
        setOtherNews(filtered);
      } catch (err) {
        console.error("Failed to load other news:", err);
      }
    };

    if (article) {
      fetchOtherNews();
    }
  }, [article, url]);

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
      <div className="max-w-4xl mx-auto   my-4 rounded-lg ">
        {/* Article Header */}
        <div className="bg-white rounded-lg shadow p-4 mb-3 mx-4 lg:mx-0">
          {/* Breadcrumbs */}
          <div className="text-xs mb-4">
            <Link href="/" className="text-[#ff3131] hover:underline font-bold">
              Home
            </Link>
            <span className="mx-1 text-[#ff3131]">&gt;</span>
            <span
              onClick={() =>
                typeof article.category[0] === "object"
                  ? handleCategoryClick(article.category[0].name)
                  : handleCategoryClick(article.category[0] as string)
              }
              className="text-[#ff3131] hover:underline font-bold cursor-pointer"
            >
              {typeof article.category[0] === "object"
                ? article.category[0].name
                : (article.category[0] as string)}
            </span>

            <span className="mx-1 text-gray-400">&gt;</span>
            <span className="text-gray-700 ml-1 font-muktaMalar">
              {article.headline1.substring(0, 20)}...
            </span>
          </div>
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
          <div className="flex items-center text-sm text-gray-600 mb-2 font-rubik">
            <span>by</span>
            <span className="font-medium ml-1">{article.author}</span>
            <span className="mx-2">|</span>
            <span>
              {formatDistanceToNow(new Date(article.createdTime), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mx-4 lg:mx-0">
          {/* Featured Image */}
          {article.headlineImage && (
            <div className="relative w-full aspect-[16/9] mb-6 rounded-lg overflow-hidden shadow-md border border-acccent-orange">
              <Image
                src={article.headlineImage}
                alt={article.headline1}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* First Advertisement */}
          <div className="my-8 flex justify-center lg:hidden">
            <LargeAdCard />
          </div>

          <h2 className="text-xl text-gray-700 mb-1 font-bold font-muktaMalar px-4">
            {article.headline2}
          </h2>

          {article.headline3 && (
            <h3 className="text-lg text-gray-600 mb-4 font-muktaMalar px-4">
              {article.headline3}
            </h3>
          )}

          {/* Article Content */}
          <div className="prose max-w-none mb-3 font-muktaMalar prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl px-4 py-4">
            {/* First part of content */}
            <div dangerouslySetInnerHTML={{ __html: beforeContent }} />

            {relatedNews.length > 0 && (
              <div className="my-4 p-4 bg-gray-50 rounded-lg ">
                <h3 className="text-lg font-bold mb-4 text-accent-teal">
                  தொடர்புடைய செய்திகள்
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {relatedNews.map((news) => (
                    <RelatedNewsCard
                      key={news._id}
                      url={news.url}
                      image={news.headlineImage || ""}
                      title={news.headline1 || ""}
                      date={formatDistanceToNow(new Date(news.createdTime), {
                        addSuffix: true,
                      })}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Second part of content */}
            <div dangerouslySetInnerHTML={{ __html: afterContent }} />
          </div>
        </div>

        {article.keywords && article.keywords.length > 0 && (
          <div className="bg-white rounded-lg shadow p-4 mb-6 mx-4 lg:mx-0">
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

        {otherNews.length > 0 && (
          <div className="bg-white rounded-lg shadow p-4 mb-6 mx-4 lg:mx-0">
            <h2 className="text-2xl font-bold mb-8 font-muktaMalar">
              ஏனைய செய்திகள்
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {otherNews.map((news) => (
                <NewsCard
                  key={news._id}
                  url={news.url}
                  image={news.headlineImage || ""}
                  title={news.headline1 || ""}
                  author={news.author}
                  // Convert category to string[] if it's an array of objects
                  category={
                    Array.isArray(news.category)
                      ? news.category.map((c) =>
                          c.subCategory
                            ? `${c.name} (${c.subCategory})`
                            : c.name
                        )
                      : news.category
                  }
                  date={formatDistanceToNow(new Date(news.createdTime), {
                    addSuffix: true,
                  })}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
