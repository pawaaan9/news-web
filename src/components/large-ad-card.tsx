import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllAdvertisements, AdvertisementData } from "@/api/advertisement.api";

export default function LargeAdCard() {
  const [ad, setAd] = useState<AdvertisementData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await getAllAdvertisements();
        let ads = response.data;
        
        // Filter for Large Rectangle ads
        ads = ads.filter(ad => ad.position === "Large Rectangle");
        
        // Filter active ads (published and not expired)
        const now = new Date();
        const activeAds = ads.filter(ad => 
          ad.status === 'published' &&
          new Date(ad.startDatetime) <= now && 
          new Date(ad.endDatetime) >= now
        );

        if (activeAds.length > 0) {
          // Select a random ad from available ones
          const randomAd = activeAds[Math.floor(Math.random() * activeAds.length)];
          if (typeof randomAd.adImage === 'string') {
            setAd(randomAd);
          }
        }
      } catch (error) {
        console.error("Failed to load advertisement:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-md mx-auto">
        <div className="relative w-[336px] h-[280px] bg-gray-200 animate-pulse"></div>
      </div>
    );
  }

  if (!ad || typeof ad.adImage !== 'string') return null;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md mx-auto">
      {ad.adUrl ? (
        <a
          href={ad.adUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block w-[336px] h-[280px]"
          onClick={(e) => {
            // If the ad has a profile, prevent default and navigate to profile page
            if (ad.email || ad.phoneNo || ad.whatsappNo || ad.fbProfile) {
              e.preventDefault();
              window.open(`/ad-profile/${ad._id}`, '_blank');
            }
          }}
        >
          <Image
            src={ad.adImage}
            alt={ad.title}
            fill
            className="object-contain"
            sizes="336px"
          />
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 border border-white rounded">
            Ad
          </div>
        </a>
      ) : (
        <Link
          href={`/ad-profile/${ad._id}`}
          target="_blank"
          className="relative block w-[336px] h-[280px]"
        >
          <Image
            src={ad.adImage}
            alt={ad.title}
            fill
            className="object-contain"
            sizes="336px"
          />
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 border border-white rounded">
            Ad
          </div>
        </Link>
      )}
    </div>
  );
} 