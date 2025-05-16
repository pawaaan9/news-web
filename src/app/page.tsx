"use client";

import { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import NewsCard from "../components/news-card";
import AdCard from "@/components/ad-card";
import Footer from "@/components/footer";
import SpecialNews from "@/components/special-news";
import { getContent, ContentData } from "@/api/content.api";
import { formatDistanceToNow } from "date-fns";
import FeatureNews from "@/components/feature-news";

export default function Home() {
  const [newsItems, setNewsItems] = useState<ContentData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getContent();
        setNewsItems(response.data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, []);

  const featuredNews = newsItems.find((item) => item.isFeatured);
  const specialNews = newsItems.filter((item) => item.isSpecial).slice(0, 2);

  const regularNews = newsItems.filter((item) => {
    const isFeatured = item._id === featuredNews?._id;
    const isSpecial = specialNews.some(
      (specialItem) => specialItem._id === item._id
    );
    return !item.isSpecial && !item.isFeatured && !isFeatured && !isSpecial;
  });

  // Filter news based on selected category
  const displayNews = selectedCategory
    ? newsItems.filter((item) => {
        const categories = Array.isArray(item.category) ? item.category : [];
        return categories.some(
          (cat: { name: string; subCategory?: string }) =>
            cat.name === selectedCategory ||
            cat.subCategory === selectedCategory
        );
      })
    : regularNews;

  const newsWithAds = [];
  for (let i = 0; i < displayNews.length; i++) {
    if (i === 0) {
      newsWithAds.push(
        <div key={`ad-top`} className="col-span-full">
          <AdCard position="Article Top" />
        </div>
      );
    }

    // const categoriesArr = Array.isArray(displayNews[i].category)
    //   ? displayNews[i].category
    //   : displayNews[i].category
    //   ? [{ name: String(displayNews[i].category) }]
    //   : [];

    newsWithAds.push(
      <NewsCard
        key={displayNews[i]._id}
        id={displayNews[i]._id}
        image={displayNews[i].headlineImage}
        // category={categoriesArr
        //   .map((cat: { name: string; subCategory?: string }) =>
        //     cat.subCategory ? `${cat.name} (${cat.subCategory})` : cat.name
        //   )
        //   .join(", ")}
        title={displayNews[i].headline1 || ""}
        author={displayNews[i].author}
        date={formatDistanceToNow(new Date(displayNews[i].createdTime), {
          addSuffix: true,
        })}
      />
    );

    if ((i + 1) % 3 === 0 && i !== displayNews.length - 1) {
      newsWithAds.push(
        <div key={`ad-bottom-${i}`} className="col-span-full">
          <AdCard position="Article Bottom" />
        </div>
      );
    }
  }

  return (
    <main>
      <NavBar
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="lg:hidden mb-6">
          <AdCard position="Article Top" />
        </div>

        {!selectedCategory && (
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="lg:w-1/3">
              <FeatureNews shouldFetch={true} />
            </div>
            <div className="lg:w-2/3">
              <SpecialNews shouldFetch={true} />
            </div>
          </div>
        )}

        {displayNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newsWithAds}
          </div>
        ) : (
          <div className="text-center py-10">
            <p>මෙම කාණ්ඩයේ පුවත් නොමැත</p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
