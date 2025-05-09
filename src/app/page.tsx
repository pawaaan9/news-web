import NavBar from "../components/navbar";
import NewsCard from "../components/news-card";
import AdCard from "@/components/ad-card";
import adImage from "../assets/images/ad-card.jpg";
import Footer from "@/components/footer";
import { ContentData, getContent } from "@/api/content.api";
import { formatDistanceToNow } from "date-fns";
import { StaticImageData } from "next/image";

type CombinedItem =
  | { type: "news"; data: ContentData }
  | {
      type: "ad";
      data: {
        id: string;
        image: StaticImageData;
        title: string;
        brand: string;
      };
    };

export default async function Home() {
  // Fetch news items from the API
  const response = await getContent();
  const newsItems = response.data;

  // Use static adItems for now
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

  // Combine news and ads in the "3 news and 1 ad" structure
  const combinedItems: CombinedItem[] = [];
  let newsIndex = 0;
  let adIndex = 0;

  while (newsIndex < newsItems.length) {
    // Add up to 3 news items
    for (let i = 0; i < 3 && newsIndex < newsItems.length; i++) {
      combinedItems.push({
        type: "news",
        data: newsItems[newsIndex++],
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

  return (
    <main>
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {combinedItems.map((item) =>
            item.type === "news" ? (
              <NewsCard
                key={item.data._id}
                id={item.data._id}
                image={item.data.headlineImage}
                category={item.data.category || ""}
                title={item.data.headline1 || ""}
                author={item.data.author}
                date={formatDistanceToNow(new Date(item.data.createdTime), {
                  addSuffix: true, // Adds "ago" at the end
                })}
              />
            ) : (
              <AdCard
                key={item.data.id}
                image={item.data.image}
                title={item.data.title}
                brand={item.data.brand || ""}
              />
            )
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
