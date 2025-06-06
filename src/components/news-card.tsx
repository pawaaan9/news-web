import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import preloadImage from "@/assets/images/tamilmedia.lk-preload-image.png";
import React from "react";
import { useRouter } from "next/navigation";

interface NewsCardProps {
  // id: string;
  url: string;
  image: string | StaticImageData;
  category?: string | string[];
  title: string;
  author: string;
  date: string;
}

export default function NewsCard({
  // id,
  url,
  image,
  category,
  title,
  author,
  date,
}: NewsCardProps) {
  const router = useRouter();
  const fallbackImage = "/fallback-image.jpg";

  const [isLoading, setIsLoading] = React.useState(true);

  let parsedCategories: string[] = [];
  if (Array.isArray(category)) {
    // If array of objects (with name), extract the name
    if (
      category.length > 0 &&
      typeof category[0] === "object" &&
      category[0] !== null
    ) {
      parsedCategories = (category as any[])
        .map((c) => c.name || "")
        .filter(Boolean);
    } else {
      parsedCategories = category as string[];
    }
  } else if (typeof category === "string") {
    parsedCategories = category
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
  }

  const handleCardClick = () => {
    router.push(`/news/${url}`);
  };

  const handleCategoryClick = (e: React.MouseEvent, categoryName: string) => {
    e.stopPropagation();
    router.push(`/?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div 
      className="bg-white text-charcoal rounded-lg overflow-hidden shadow-md border border-gray-200 mx-auto md:mx-0 font-notoSans cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
      onClick={handleCardClick}
    >
      <div className="relative w-full pt-[56.25%]">
        {/* 16:9 aspect ratio */}
        {isLoading && (
          <Image
            src={preloadImage}
            alt="Loading..."
            fill
            className="object-cover absolute inset-0 w-full h-full aspect-[16/9] z-10"
            priority
          />
        )}
        <Image
          src={image || fallbackImage}
          alt=""
          fill
          className="object-cover absolute inset-0 w-full h-full aspect-[16/9]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          onLoadingComplete={() => setIsLoading(false)}
        />
        {parsedCategories.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-20">
            {parsedCategories.map((cat, idx) => (
              <span
                key={idx}
                onClick={(e) => handleCategoryClick(e, cat)}
                className="bg-gradient-to-r from-[#ff3131] to-[#ff914d] text-white text-xs px-2 py-0.5 rounded hover:underline"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-2 leading-5 font-muktaMalar line-clamp-2">
          {title}
        </h2>

        <div className="text-[10px] text-gray-500 mt-auto flex items-center justify-between">
          <span className="font-medium">by {author} </span>
          <span className="font-medium">{date}</span>
        </div>
      </div>
    </div>
  );
}
