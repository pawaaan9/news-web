"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NavBar from "../../../components/navbar";
import AdCard from "../../../components/ad-card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getContentById } from "@/api/content.api";
import { formatDistanceToNow } from "date-fns";

export default function NewsView() {
  const params = useParams();
  const id = params.id as string;

  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = (await getContentById(id)) as { data: any };
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

  if (error || !article) {
    return (
      <main>
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-10">
            <p className="text-red-500">{error || "Article not found"}</p>
          </div>
        </div>
      </main>
    );
  }

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
            {article.headline1.substring(0, 20)}...
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

        <h2 className="text-xl text-gray-700 mb-1 font-bold">{article.headline2}</h2>
        {article.headline3 && (
          <h3 className="text-lg text-gray-600 mb-4">{article.headline3}</h3>
        )}

        {/* Article Content */}
        <div className="prose max-w-none mb-8">
          {article.contentBlocks?.map((block: any, index: number) => (
            <div key={block._id || index} className="mb-6">
              {block.type === "paragraph" && (
                <>
                  <p className="mb-4 text-gray-800 leading-relaxed">
                    {block.data || block.content}
                  </p>
                </>
              )}
              {block.type === "image" && block.file && (
                <div className="my-4">
                  <div className="relative w-full h-64">
                    <Image
                      src={block.file}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Keywords */}
        {article.keywords && article.keywords.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {article.keywords.map((keyword: string, index: number) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Advertisement */}
        <div className="my-8">
          <AdCard position="Article Bottom" />
        </div>
      </div>
    </main>
  );
}