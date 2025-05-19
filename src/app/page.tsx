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
import TopAdvertisement from "@/components/top-advertisement";

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

  // Create groups of 4 news items followed by an ad
  const newsWithAds = [];
  let newsGroup = [];

  for (let i = 0; i < displayNews.length; i++) {
    newsGroup.push(
      <NewsCard
        key={displayNews[i]._id}
        id={displayNews[i]._id}
        image={displayNews[i].headlineImage}
        title={displayNews[i].headline1 || ""}
        author={displayNews[i].author}
        date={formatDistanceToNow(new Date(displayNews[i].createdTime), {
          addSuffix: true,
        })}
      />
    );

    // After every 4 news items or at the end of all news
    if (newsGroup.length === 4 || i === displayNews.length - 1) {
      // Add the news group
      newsWithAds.push(...newsGroup);

      // Add an ad if we have a full group of 4 and it's not the end
      if (newsGroup.length === 4 && i !== displayNews.length - 1) {
        newsWithAds.push(
          <div key={`ad-${i}`} className="col-span-full flex justify-center ">
            <AdCard position="Medium Rectangle" />
          </div>
        );
      }

      // Reset the news group
      newsGroup = [];
    }
  }

  return (
    <main>
      <NavBar
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      {/* Top Advertisement Section - Full Width Container */}
      <div className="w-full lg:pt-6 lg:mt-[140px] mt-[100px]">
        <div className="max-w-6xl mx-auto px-4">
          <TopAdvertisement />
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-100 py-6">
        <div className="max-w-4xl mx-auto px-4 py-8 lg:bg-white bg-gray-100 rounded-lg lg:shadow">
          {selectedCategory && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-muktaMalar mb-2">
                {selectedCategory}
              </h1>
              <div
                className="h-1 w-full"
                style={{
                  background: "linear-gradient(to right, #ff3131, #ff914d)",
                }}
              ></div>
            </div>
          )}

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {newsWithAds}
            </div>
          ) : (
            <div className="text-center py-10">
              <p>இந்தப் பிரிவில் எந்தச் செய்தியும் இல்லை.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
