"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllAdvertisements } from "@/api/advertisement.api";

interface AdCardProps {
  position: "Article Top" | "Article Bottom";
}

export default function AdCard({ position }: AdCardProps) {
  const [ad, setAd] = useState<{
    image: string;
    title: string;
    brand: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await getAllAdvertisements();
        let ads = (response as { data: any[] }).data;
        
        // Filter by specified position
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
          setAd({
            image: typeof randomAd.adImage === 'string' ? randomAd.adImage : '',
            title: randomAd.title,
            brand: randomAd.country
          });
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
      <div className="bg-white text-charcoal rounded-lg overflow-hidden shadow-md max-w-xs border-secondary-grey border-1 mx-auto md:mx-0">
        <div className="relative w-full h-40 bg-gray-200 animate-pulse"></div>
        <div className="p-3">
          <div className="h-4 w-1/2 bg-gray-200 animate-pulse mb-1"></div>
          <div className="h-5 w-full bg-gray-200 animate-pulse mb-2"></div>
          <div className="h-3 w-10 bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!ad) return null;

  return (
    <div className="bg-white text-charcoal rounded-lg overflow-hidden shadow-md max-w-xs border-secondary-grey border-1 mx-auto md:mx-0">
      <div className="relative w-full h-40">
        <Image
          src={ad.image}
          alt={ad.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-400 mb-1">{ad.brand}</p>
        <h2 className="text-sm font-semibold leading-snug mb-2">{ad.title}</h2>
        <span className="text-[10px] border border-gray-500 px-1.5 py-0.5 rounded text-charcoal">
          Ad
        </span>
      </div>
    </div>
  );
}