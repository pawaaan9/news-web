"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import AdProfileLinks from "@/components/ad-profile-links";
import { getAllAdvertisements, AdvertisementData } from "@/api/advertisement.api";
import Image from "next/image";
import Link from "next/link";

export default function AdProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [ad, setAd] = useState<AdvertisementData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAd = async () => {
      try {
        setLoading(true);
        const response = await getAllAdvertisements();
        const ads = response.data;
        const foundAd = ads.find((ad: AdvertisementData) => ad._id === id);
        
        if (foundAd) {
          setAd(foundAd);
        } else {
          setError("Advertisement not found");
        }
      } catch (err) {
        setError("Failed to load advertisement");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAd();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="w-full px-4 py-6 md:px-[10%]">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !ad) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="w-full px-4 py-6 md:px-[10%]">
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">{error || "Advertisement not found"}</p>
            <Link href="/" className="text-blue-500 hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="w-full px-4 py-6 md:px-[10%]">
        {/* Advertisement Image */}
        <div className="mb-6">
          <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
            <div className="relative w-full max-w-2xl mx-auto aspect-[16/9]">
              <Image
                src={ad.adImage as string}
                alt={ad.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Advertisement Title */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-charcoal mb-2">{ad.title}</h1>
          {ad.description && (
            <p className="text-gray-600">{ad.description}</p>
          )}
        </div>

        {/* Contact Information */}
        <AdProfileLinks 
          title={ad.title}
          email={ad.email || ""}
          phone={ad.phoneNo || ""}
          whatsapp={ad.whatsappNo || ""}
          facebook={ad.fbProfile || ""}
          twitter=""
          instagram=""
          linkedin=""
        />

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-500 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
} 