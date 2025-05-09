"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import NavBar from "../components/navbar";
import NewsCard from "../components/news-card";
import AdCard from "@/components/ad-card";
import adImage from "../assets/images/ad-card.jpg";
import Footer from "@/components/footer";
import { getContent } from "@/api/content.api";
import { formatDistanceToNow } from "date-fns";

export default function Home() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [isLoading, setIsLoading] = useState(true);
  const [newsItems, setNewsItems] = useState<{ _id: string; headlineImage: string; category?: string; headline1?: string; author: string; createdTime: string }[]>([]);
  const [filteredItems, setFilteredItems] = useState<{ _id: string; headlineImage: string; category?: string; headline1?: string; author: string; createdTime: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Static ad items (would ideally come from an API)
  const adItems = [
    {
      id: "ad1",
      image: adImage,
      title:
        "This Brilliant Japanese Invention Instantly Translates Foreign Languages",
      brand: "Enence",
    },
    {
      id: "ad2",
      image: adImage,
      title: "Premium Quality Ceylon Tea - Now Available Worldwide",
      brand: "CeylonTea Co.",
    },
    {
      id: "ad3",
      image: adImage,
      title: "New Smartphone with Revolutionary Camera Technology",
      brand: "TechVision",
    },
  ];

  // Fetch news on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await getContent();
        setNewsItems((response as { data: any[] }).data);
        setError(null);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Filter news based on selected category
  useEffect(() => {
    if (newsItems.length === 0) return;
    
    if (!categoryParam || categoryParam === "Home") {
      // Show all news if no category is selected or Home is selected
      setFilteredItems(newsItems);
    } else {
      // Filter news by category
      const filtered = newsItems.filter(item => item.category === categoryParam);
      setFilteredItems(filtered);
    }
  }, [categoryParam, newsItems]);

  // Combine news and ads in the "3 news and 1 ad" structure
  const createCombinedItems = () => {
    const combinedItems = [];
    let newsIndex = 0;
    let adIndex = 0;

    while (newsIndex < filteredItems.length) {
      // Add up to 3 news items
      for (let i = 0; i < 3 && newsIndex < filteredItems.length; i++) {
        combinedItems.push({
          type: "news",
          data: filteredItems[newsIndex++],
        });
      }

      // Add 1 ad if available
      if (adIndex < adItems.length) {
        combinedItems.push({
          type: "ad",
          data: adItems[adIndex++],
        });
      }
    }

    return combinedItems;
  };

  const combinedItems = createCombinedItems();

  return (
    <main>
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-10">{error}</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold mb-2">No news available</h2>
            <p className="text-gray-600">
              {categoryParam ? `No news found in the "${categoryParam}" category.` : "No news articles available at this time."}
            </p>
          </div>
        ) : (
          <>
            {categoryParam && categoryParam !== "Home" && (
              <h1 className="text-2xl font-bold mb-6">{categoryParam}</h1>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {combinedItems.map((item, index) =>
                item.type === "news" ? (
                  <NewsCard
                    key={`${"id" in item.data ? item.data.id : item.data._id}-${index}`}
                    id={"_id" in item.data ? item.data._id : ""}
                    image={"headlineImage" in item.data ? item.data.headlineImage : ""}
                    category={"category" in item.data ? item.data.category || "" : ""}
                    title={"headline1" in item.data ? item.data.headline1 || "" : ""}
                    author={"author" in item.data ? item.data.author : ""}
                    date={
                      "createdTime" in item.data
                        ? formatDistanceToNow(new Date(item.data.createdTime), {
                            addSuffix: true,
                          })
                        : ""
                    }
                  />
                ) : (
                  <AdCard
                    key={`${"id" in item.data ? item.data.id : item.data._id}-${index}`}
                    image={"image" in item.data && typeof item.data.image !== "string" ? item.data.image : adImage}
                    title={"title" in item.data ? item.data.title : ""}
                    brand={"brand" in item.data ? item.data.brand : ""}
                  />
                )
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}