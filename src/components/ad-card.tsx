"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllAdvertisements, AdvertisementData } from "@/api/advertisement.api";

interface AdCardProps {
  position: "Medium Rectangle" | "Large Rectangle";
}

export default function AdCard({ position }: AdCardProps) {
  const [ad, setAd] = useState<AdvertisementData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await getAllAdvertisements();
        let ads = response.data;
        
        // Filter by position
        ads = ads.filter(ad => ad.position === position);
        
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
  }, [position]);

  if (loading) {
    return (
      <div className="bg-white text-charcoal rounded-lg overflow-hidden shadow-md border border-gray-200 mx-auto md:mx-0 font-notoSans cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
        <div className="relative w-full pt-[56.25%] bg-gray-200 animate-pulse"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    );
  }

  if (!ad || typeof ad.adImage !== 'string') return null;

  const adSize = position === "Large Rectangle" ? "w-[336px] h-[280px]" : "w-[300px] h-[250px]";

  return (
    <div className="bg-white text-charcoal rounded-lg overflow-hidden shadow-md border border-gray-200 mx-auto md:mx-0 font-notoSans cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {ad.adUrl ? (
        <a
          href={ad.adUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col h-full"
          onClick={(e) => {
            // If the ad has a profile, prevent default and navigate to profile page
            if (ad.email || ad.phoneNo || ad.whatsappNo || ad.fbProfile) {
              e.preventDefault();
              window.open(`/ad-profile/${ad._id}`, '_blank');
            }
          }}
        >
          <div className="relative w-full pt-[56.25%]">
            <Image
              src={ad.adImage}
              alt={ad.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-sm font-semibold mb-2 leading-snug font-muktaMalar">
              {ad.title}
            </h2>
            <div className="text-[10px] text-gray-500 mt-auto flex items-center justify-between">
              <span className="font-medium">Advertisement</span>
              <div className="bg-black bg-opacity-70 text-white text-xs px-1 border border-white rounded">
                Ad
              </div>
            </div>
          </div>
        </a>
      ) : (
        <Link
          href={`/ad-profile/${ad._id}`}
          target="_blank"
          className="flex flex-col h-full"
        >
          <div className="relative w-full pt-[56.25%]">
            <Image
              src={ad.adImage}
              alt={ad.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-sm font-semibold mb-2 leading-snug font-muktaMalar">
              {ad.title}
            </h2>
            <div className="text-[10px] text-gray-500 mt-auto flex items-center justify-between">
              <span className="font-medium">Advertisement</span>
              <div className="bg-black bg-opacity-70 text-white text-xs px-1 border border-white rounded">
                Ad
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}