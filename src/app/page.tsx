"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import NavBar from "../components/navbar";
import NewsCard from "../components/news-card";
import Footer from "@/components/footer";
import SpecialNews from "@/components/special-news";
import { getContent, ContentData } from "@/api/content.api";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import FeatureNews from "@/components/feature-news";
import { useSearchParams } from "next/navigation";
import BillboardAd from "@/modules/ads/billboard";
import LargeLeaderboardAd from "@/modules/ads/large-leaderboard";
import LargeMobileBannerAd from "@/modules/ads/large-mobile-banner";
import MobileBannerAd from "@/modules/ads/mobile-banner";
import MediumRectangleAd from "@/modules/ads/medium-rectangle";
import LargeRectangleAd from "@/modules/ads/large_rectangle";
import HalfPageAd from "@/modules/ads/half-page";
import WideSkyscraperAd from "@/modules/ads/wide-skyscraper";
import SkyscraperAd from "@/modules/ads/skyscaper";
import BreakingNews from "@/components/breaking-news";
import {
  AdvertisementData,
  getAllAdvertisements,
} from "@/api/advertisement.api";
import { useCountry } from "@/contexts/country-context";

// Move your main logic here
function HomeContent() {
  const [newsItems, setNewsItems] = useState<ContentData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [advertisements, setAdvertisements] = useState<AdvertisementData[]>([]);
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedCountry } = useCountry();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

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

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await getAllAdvertisements();
        setAdvertisements(response.data);
      } catch (error) {
        console.error("Failed to fetch advertisements:", error);
      }
    };

    fetchAds();
  }, []);

  // Filter advertisements based on selected country
  const filteredAds = advertisements.filter((ad) => {
    // Check if the ad's countries array includes the selected country
    return (
      ad.countries.some((country) => country.code === selectedCountry.code) &&
      ad.status === "published"
    );
  });

  // Get published ads for each position
  const billboardAd = filteredAds.find((ad) => ad.position === "Billboard");
  const largeLeaderboardAd = filteredAds.find(
    (ad) => ad.position === "Large Leaderboard"
  );
  const largeMobileBannerAd = filteredAds.find(
    (ad) => ad.position === "Large Mobile Banner"
  );
  const mobileBannerAd = filteredAds.find(
    (ad) => ad.position === "Mobile Banner"
  );
  const mediumRectangleAd = filteredAds.find(
    (ad) => ad.position === "Medium Rectangle"
  );
  const largeRectangleAd = filteredAds.find(
    (ad) => ad.position === "Large Rectangle"
  );
  const halfPageAd = filteredAds.find((ad) => ad.position === "Half Page");
  const wideSkyscraperAd = filteredAds.find(
    (ad) => ad.position === "Wide Skyscraper"
  );
  const skyscraperAd = filteredAds.find((ad) => ad.position === "Skyscraper");

  // State for skyscraper ad visibility
  const [showSkyscraper, setShowSkyscraper] = useState(false);

  // Show skyscraper ad after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkyscraper(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Helper function to get image URL
  const getImageUrl = (ad: AdvertisementData | undefined) => {
    if (!ad) return "";
    return typeof ad.adImage === "string" ? ad.adImage : "";
  };

  // Helper function to get link URL
  const getLinkUrl = (ad: AdvertisementData) => {
    if (ad.isWebsiteHave && ad.adUrl) {
      // Add http:// if not present
      const url = ad.adUrl.startsWith("http") ? ad.adUrl : `http://${ad.adUrl}`;
      return url;
    }
    // If no website, link to ad profile page
    return `/ad-profile/${ad._id}`;
  };

  const featuredNews = newsItems.find((item) => item.isFeatured);
  const specialNews = newsItems.filter((item) => item.isSpecial).slice(0, 2);

  const regularNews = newsItems.filter((item) => {
    const isFeatured = item._id === featuredNews?._id;
    const isSpecial = specialNews.some(
      (specialItem) => specialItem._id === item._id
    );

    return !item.isSpecial && !item.isFeatured && !isFeatured && !isSpecial;
  });

  // Filter news based on selected category and search query
  const displayNews = newsItems.filter((item) => {
    if (item.status !== "Published") return false;
    if (!selectedCategory && item.isShownOnHome === false) return false;
    if (item.isBreaking === true) return false;
    // Category filter
    let categoryMatch = true;
    if (selectedCategory) {
      const categories = Array.isArray(item.category) ? item.category : [];
      categoryMatch = categories.some(
        (cat: { name: string; subCategory?: string }) =>
          cat.name === selectedCategory || cat.subCategory === selectedCategory
      );
    } else {
      // If no category selected, only show regular news
      categoryMatch = regularNews.some((n) => n._id === item._id);
    }

    // Search filter
    let searchMatch = true;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const headlineMatch = item.headline1?.toLowerCase().includes(q);
      const keywordsMatch = Array.isArray(item.keywords)
        ? item.keywords.some((kw) => kw.toLowerCase().includes(q))
        : false;
      searchMatch = headlineMatch || keywordsMatch;
    }

    return categoryMatch && searchMatch;
  });

  // Create groups of 4 news items followed by an ad
  const newsWithAds = [];
  let newsGroup = [];
  let adCounter = 0;

  for (let i = 0; i < displayNews.length; i++) {
    newsGroup.push(
      <NewsCard
        key={displayNews[i]._id}
        url={displayNews[i].url}
        image={displayNews[i].headlineImage}
        title={displayNews[i].headline1 || ""}
        author={displayNews[i].author}
        category={displayNews[i].category}
        date={
          displayNews[i].scheduledPublishDate
            ? formatDistanceToNowStrict(
                new Date(displayNews[i].scheduledPublishDate!),
                { addSuffix: true }
              )
            : displayNews[i].modifiedTime
            ? formatDistanceToNowStrict(new Date(displayNews[i].modifiedTime), {
                addSuffix: true,
              })
            : ""
        }
      />
    );

    // After every 4 news items or at the end of all news
    if (newsGroup.length === 4 || i === displayNews.length - 1) {
      // Add the news group
      newsWithAds.push(...newsGroup);

      // Add an ad if we have a full group of 4 and it's not the end
      if (newsGroup.length === 4 && i !== displayNews.length - 1) {
        adCounter++;
        // Alternate between Medium Rectangle and Large Rectangle ads
        if (adCounter % 2 === 0 && largeRectangleAd) {
          newsWithAds.push(
            <div key={`ad-${i}`} className="col-span-full flex justify-center">
              <LargeRectangleAd
                imageUrl={getImageUrl(largeRectangleAd)}
                linkUrl={getLinkUrl(largeRectangleAd)}
                alt={largeRectangleAd.title}
              />
            </div>
          );
        } else if (mediumRectangleAd) {
          newsWithAds.push(
            <div key={`ad-${i}`} className="col-span-full flex justify-center">
              <MediumRectangleAd
                imageUrl={getImageUrl(mediumRectangleAd)}
                linkUrl={getLinkUrl(mediumRectangleAd)}
                alt={mediumRectangleAd.title}
              />
            </div>
          );
        }
      }

      // Reset the news group
      newsGroup = [];
    }
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      <NavBar
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
        onSearch={handleSearch}
        showSearchBar={true}
      />

      {/* Top Advertisement Section - Full Width Container */}
      <div className="w-full lg:pt-6 lg:mt-[160px] mt-[100px] bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          {/* Billboard Ad - Desktop */}
          {billboardAd && (
            <BillboardAd
              imageUrl={getImageUrl(billboardAd)}
              linkUrl={getLinkUrl(billboardAd)}
              alt={billboardAd.title}
            />
          )}

          {/* Large Mobile Banner - Mobile */}
          {largeMobileBannerAd && (
            <LargeMobileBannerAd
              imageUrl={getImageUrl(largeMobileBannerAd)}
              linkUrl={getLinkUrl(largeMobileBannerAd)}
              alt={largeMobileBannerAd.title}
            />
          )}

          {/* Large Leaderboard Ad */}
          {largeLeaderboardAd && (
            <LargeLeaderboardAd
              imageUrl={getImageUrl(largeLeaderboardAd)}
              linkUrl={getLinkUrl(largeLeaderboardAd)}
              alt={largeLeaderboardAd.title}
            />
          )}

          {/* Mobile Banner - Mobile */}
          {mobileBannerAd && (
            <MobileBannerAd
              imageUrl={getImageUrl(mobileBannerAd)}
              linkUrl={getLinkUrl(mobileBannerAd)}
              alt={mobileBannerAd.title}
            />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-100 mt-6">
        <div className="max-w-[1250px] mx-auto px-4 pb-8 relative pt-[60px] lg:pt-0">
          {/* Side Ads - Desktop Only */}
          <div className="hidden lg:block absolute left-0 top-0 h-full pb-10">
            {halfPageAd && (
              <div className="sticky top-[160px]">
                <HalfPageAd
                  imageUrl={getImageUrl(halfPageAd)}
                  linkUrl={getLinkUrl(halfPageAd)}
                  alt={halfPageAd.title}
                />
              </div>
            )}
          </div>
          <div className="hidden lg:block absolute right-0 top-0 h-full pb-10">
            {wideSkyscraperAd && (
              <div className="sticky top-[160px]">
                <WideSkyscraperAd
                  imageUrl={getImageUrl(wideSkyscraperAd)}
                  linkUrl={getLinkUrl(wideSkyscraperAd)}
                  alt={wideSkyscraperAd.title}
                />
              </div>
            )}
          </div>
          {!selectedCategory && !searchQuery && (
            <div className="xl:max-w-[1000px] max-w-[800px] mx-auto">
              <BreakingNews shouldFetch={true} />
            </div>
          )}

          {/* Main Content with Side Margins for Ads */}
          <div className=" xl:max-w-[1000px] max-w-[800px] mx-auto">
            <div className="lg:bg-white bg-gray-100 rounded-lg lg:shadow">
              {selectedCategory && (
                <div className="mb-8">
                  <h1 className="text-3xl font-bold font-muktaMalar p-4 lg:p-8">
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

              {!selectedCategory && !searchQuery && (
                <>
                  <div className=" lg:p-4">
                    <div className="flex flex-col lg:flex-row gap-6 mb-8">
                      <div className="lg:w-1/3">
                        <FeatureNews shouldFetch={true} />
                      </div>
                      <div className="lg:w-2/3">
                        <SpecialNews shouldFetch={true} />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {displayNews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:px-4 pb-4">
                  {newsWithAds}
                </div>
              ) : (
                <div className="text-center py-10">
                  <span className="inline-block w-8 h-8 border-4 border-accent-orange border-t-transparent rounded-full animate-spin"></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {showSkyscraper && skyscraperAd && <div className="h-[80px] w-full" />}

      {/* Skyscraper Ad - Bottom of Page */}
      {showSkyscraper && skyscraperAd && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
          <div className="max-w-[1040px] mx-auto px-4 py-2 relative">
            <SkyscraperAd
              imageUrl={getImageUrl(skyscraperAd)}
              linkUrl={getLinkUrl(skyscraperAd)}
              alt={skyscraperAd.title}
            />
            <button
              onClick={() => setShowSkyscraper(false)}
              className="absolute right-2 top-2 z-20 text-gray-500 hover:text-gray-700 bg-white/80 rounded-full p-1 pointer-events-auto flex items-center justify-center"
              aria-label="Close advertisement"
              style={{
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                width: "40px",
                height: "40px",
                background: "rgba(255,255,255,0.95)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="20" fill="#fff" opacity="0.7" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

// Wrap HomeContent in Suspense
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
