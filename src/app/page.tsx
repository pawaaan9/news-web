import NavBar from "../components/navbar";
import NewsCard from "../components/news-card";
import AdCard from "@/components/ad-card";
import Footer from "@/components/footer";
import SpecialNews from "@/components/special-news";
import { getContent } from "@/api/content.api";
import { formatDistanceToNow } from "date-fns";
import FeatureNews from "@/components/feature-news";

export default async function Home() {
  const response = await getContent();
  const newsItems = response.data;
  
  // Get featured and special news first
  const featuredNews = newsItems.find(item => item.isFeatured);
  const specialNews = newsItems.filter(item => item.isSpecial).slice(0, 2);
  
  // Filter regular news - exclude featured and special news
  const regularNews = newsItems.filter((item) => {
    const isFeatured = item._id === featuredNews?._id;
    const isSpecial = specialNews.some(specialItem => specialItem._id === item._id);
    return !item.isSpecial && !item.isFeatured && !isFeatured && !isSpecial;
  });

  // Insert ad after every 3 news items
  const newsWithAds = [];
  for (let i = 0; i < regularNews.length; i++) {
    // Add "Article Top" ad before first news item
    if (i === 0) {
      newsWithAds.push(
        <div key={`ad-top`} className="col-span-full">
          <AdCard position="Article Top" />
        </div>
      );
    }
    
    // Add news card
    newsWithAds.push(
      <NewsCard
        key={regularNews[i]._id}
        url={regularNews[i].url}
        image={regularNews[i].headlineImage}
        category={regularNews[i].category || ""}
        title={regularNews[i].headline1 || ""}
        author={regularNews[i].author}
        date={formatDistanceToNow(new Date(regularNews[i].createdTime), {
          addSuffix: true,
        })}
      />
    );

    // Add "Article Bottom" ad after every 3 news items
    if ((i + 1) % 3 === 0 && i !== regularNews.length - 1) {
      newsWithAds.push(
        <div key={`ad-bottom-${i}`} className="col-span-full">
          <AdCard position="Article Bottom" />
        </div>
      );
    }
  }

  return (
    <main>
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Mobile-only ad between feature and special news */}
        <div className="lg:hidden mb-6">
          <AdCard position="Article Top" />
        </div>

        {/* Featured and Special News in single row on desktop */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="lg:w-1/3">
            <FeatureNews />
          </div>
          <div className="lg:w-2/3">
            <SpecialNews />
          </div>
        </div>

        {/* Regular News Section with Ads */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newsWithAds}
        </div>
      </div>
      <Footer />
    </main>
  );
}
