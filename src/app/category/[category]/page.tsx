"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/components/navbar";
import NewsCard from "@/components/news-card";
import Footer from "@/components/footer";
import { getContent, ContentData } from "@/api/content.api";
import { formatDistanceToNow } from "date-fns";

export default function CategoryNewsPage() {
  const params = useParams();
  const category = params.category as string;
  const [newsItems, setNewsItems] = useState<ContentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await getContent();
        // Filter news items by category
        const filteredNews = response.data.filter((item) => {
          const categories = Array.isArray(item.category) ? item.category : [];
          return categories.some(
            (cat: { name: string; subCategory?: string }) =>
              cat.name === category || cat.subCategory === category
          );
        });
        setNewsItems(filteredNews);
      } catch (error) {
        setError("Failed to fetch articles");
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchNews();
    }
  }, [category]);

  const newsCards = newsItems.map((item) => (
    <NewsCard
      key={item._id}
      id={item._id}
      image={item.headlineImage}
      title={item.headline1}
      author={item.author}
      date={formatDistanceToNow(new Date(item.createdTime), {
        addSuffix: true,
      })}
    />
  ));

  return (
    <main className="min-h-screen bg-gray-100 mt-[120px] lg:mt-[160px] lg:py-4">
      <NavBar onCategorySelect={() => {}} selectedCategory={null} />
      <div className="max-w-4xl mx-auto px-4 py-8 lg:my-6 bg-white rounded-lg shadow">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-muktaMalar mb-2">
            {decodeURIComponent(category)}
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-[#ff3131] to-[#ff914d]"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff3131]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-gray-600">{error}</p>
          </div>
        ) : newsItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">No articles found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newsCards}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
} 