/* eslint-disable @typescript-eslint/no-unused-vars */
import { getContent } from "@/api/content.api";
import NavBar from "@/components/navbar";
import NewsCard from "@/components/news-card";
import AdCard from "@/components/ad-card";
import Footer from "@/components/footer";
import adImage from "@/assets/images/ad-card.jpg";
import { formatDistanceToNow } from "date-fns";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const categoryParam = searchParams?.category;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let newsItems: any[] = [];
  let error = null;

  try {
    const response = await getContent();
    newsItems = response.data || [];
  } catch (err) {
    error = "Failed to load news. Please try again later.";
  }

  const filteredItems =
    categoryParam && categoryParam !== "Home"
      ? newsItems.filter((item) => item.category === categoryParam)
      : newsItems;

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

  const createCombinedItems = () => {
    const combinedItems = [];
    let newsIndex = 0;
    let adIndex = 0;

    while (newsIndex < filteredItems.length) {
      for (let i = 0; i < 3 && newsIndex < filteredItems.length; i++) {
        combinedItems.push({ type: "news", data: filteredItems[newsIndex++] });
      }

      if (adIndex < adItems.length) {
        combinedItems.push({ type: "ad", data: adItems[adIndex++] });
      }
    }

    return combinedItems;
  };

  const combinedItems = createCombinedItems();

  return (
    <main>
      <Suspense fallback={null}>
        <NavBar />
      </Suspense>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {error ? (
          <div className="text-red-500 text-center py-10">{error}</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold mb-2">No news available</h2>
            <p className="text-gray-600">
              {categoryParam
                ? `No news found in the "${categoryParam}" category.`
                : "No news articles available at this time."}
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
                    key={`${item.data._id}-${index}`}
                    id={item.data._id}
                    image={item.data.headlineImage}
                    category={item.data.category || ""}
                    title={item.data.headline1 || ""}
                    author={item.data.author}
                    date={formatDistanceToNow(new Date(item.data.createdTime), {
                      addSuffix: true,
                    })}
                  />
                ) : (
                  <AdCard
                    key={`${item.data.id}-${index}`}
                    image={item.data.image}
                    title={item.data.title}
                    brand={item.data.brand}
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
