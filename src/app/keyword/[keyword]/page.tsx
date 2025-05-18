"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import NavBar from "@/components/navbar";
import NewsCard from "@/components/news-card";
import Footer from "@/components/footer";
import { getContentsByKeyword } from "@/api/content.api";
import { formatDistanceToNow } from "date-fns";

interface Article {
  _id: string;
  headline1: string;
  headlineImage: string;
  author: string;
  createdTime: string;
  category: { name: string; subCategory?: string }[] | string;
}

export default function KeywordNewsPage() {
  const params = useParams();
  const keyword = params.keyword as string;
  const [newsItems, setNewsItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await getContentsByKeyword(keyword);
        if (response.status === "success") {
          setNewsItems(response.data);
        } else {
          setError("No articles found for this keyword");
        }
      } catch (error) {
        setError("Failed to fetch articles");
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    if (keyword) {
      fetchNews();
    }
  }, [keyword]);

  // const newsWithAds = [];
  // for (let i = 0; i < newsItems.length; i++) {
  //   if (i === 0) {
  //     newsWithAds.push(
  //       <div key={`ad-top`} className="col-span-full">
  //         <AdCard position="Medium Rectangle" />
  //       </div>
  //     );
  //   }

  //   newsWithAds.push(
  //     <NewsCard
  //       key={newsItems[i]._id}
  //       id={newsItems[i]._id}
  //       image={newsItems[i].headlineImage}
  //       title={newsItems[i].headline1}
  //       author={newsItems[i].author}
  //       date={formatDistanceToNow(new Date(newsItems[i].createdTime), {
  //         addSuffix: true,
  //       })}
  //     />
  //   );

  //   if ((i + 1) % 3 === 0 && i !== newsItems.length - 1) {
  //     newsWithAds.push(
  //       <div key={`ad-bottom-${i}`} className="col-span-full">
  //         <AdCard position="Medium Rectangle" />
  //       </div>
  //     );
  //   }
  // }

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
    <main className="min-h-screen bg-gray-100 ">
      <NavBar onCategorySelect={() => {}} selectedCategory={null} />
      <div className="max-w-4xl mx-auto px-4 py-8 lg:my-6 bg-white rounded-lg shadow">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-muktaMalar mb-2">
            Articles tagged with &quot;{decodeURIComponent(keyword)}&quot;
          </h1>
          <div className="h-1 w-20 bg-primary"></div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-gray-600">{error}</p>
          </div>
        ) : newsItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600">No articles found for this keyword</p>
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
