import { useEffect, useState } from "react";
import { getAllAdvertisements, AdvertisementData } from "@/api/advertisement.api";
import Image from "next/image";

export default function TopAdvertisement() {
  const [desktopAd, setDesktopAd] = useState<AdvertisementData | null>(null);
  const [mobileAd, setMobileAd] = useState<AdvertisementData | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await getAllAdvertisements();
        const ads = response.data;
        const now = new Date();

        // Filter active ads (published and not expired)
        const activeAds = ads.filter(
          (ad: AdvertisementData) =>
            ad.status === "published" &&
            new Date(ad.startDatetime) <= now &&
            new Date(ad.endDatetime) >= now
        );

        // Find desktop ads (Leaderboard or Large Leaderboard)
        const desktopPositions = ["Leaderboard", "Large Leaderboard"];
        const desktopAds = activeAds.filter((ad: AdvertisementData) =>
          desktopPositions.includes(ad.position)
        );

        // Find mobile ads (Large Mobile Banner or Mobile Banner)
        const mobilePositions = ["Large Mobile Banner", "Mobile Banner"];
        const mobileAds = activeAds.filter((ad: AdvertisementData) =>
          mobilePositions.includes(ad.position)
        );

        // Set a random ad for each position if available
        if (desktopAds.length > 0) {
          const selectedAd = desktopAds[Math.floor(Math.random() * desktopAds.length)];
          if (typeof selectedAd.adImage === 'string') {
            setDesktopAd(selectedAd);
          }
        }

        if (mobileAds.length > 0) {
          const selectedAd = mobileAds[Math.floor(Math.random() * mobileAds.length)];
          if (typeof selectedAd.adImage === 'string') {
            setMobileAd(selectedAd);
          }
        }
      } catch (error) {
        console.error("Failed to load advertisements:", error);
      }
    };

    fetchAds();
  }, []);

  const getDesktopAdDimensions = (position: string) => {
    return position === "Large Leaderboard" 
      ? { width: 970, height: 90 }
      : { width: 728, height: 90 }; 
  };

  if (!desktopAd && !mobileAd) return null;

  return (
    <div className="w-full flex justify-center mb-6">
      {/* Desktop Advertisement */}
      {desktopAd && typeof desktopAd.adImage === 'string' && (
        <div className="hidden lg:block">
          {desktopAd.adUrl ? (
            <a
              href={desktopAd.adUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block"
            >
              <Image
                src={desktopAd.adImage}
                alt={desktopAd.title}
                {...getDesktopAdDimensions(desktopAd.position)}
                className="w-full h-auto"
                priority
              />
              <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 border border-white rounded">
                Ad
              </div>
            </a>
          ) : (
            <div className="relative">
              <Image
                src={desktopAd.adImage}
                alt={desktopAd.title}
                {...getDesktopAdDimensions(desktopAd.position)}
                className="w-full h-auto"
                priority
              />
              <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 border border-white rounded">
                Ad
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile Advertisement */}
      {mobileAd && typeof mobileAd.adImage === 'string' && (
        <div className="lg:hidden">
          {mobileAd.adUrl ? (
            <a
              href={mobileAd.adUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block"
            >
              <Image
                src={mobileAd.adImage}
                alt={mobileAd.title}
                width={320}
                height={mobileAd.position === "Large Mobile Banner" ? 100 : 50}
                className="w-full h-auto"
                priority
              />
              <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 border border-white rounded">
                Ad
              </div>
            </a>
          ) : (
            <div className="relative">
              <Image
                src={mobileAd.adImage}
                alt={mobileAd.title}
                width={320}
                height={mobileAd.position === "Large Mobile Banner" ? 100 : 50}
                className="w-full h-auto"
                priority
              />
              <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 border border-white rounded">
                Ad
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 