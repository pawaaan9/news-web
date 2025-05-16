import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface NewsCardProps {
  id: string;
  image: string | StaticImageData;
  // category: string | string[]; // Accept both
  title: string;
  author: string;
  date: string;
}

export default function NewsCard({
  id,
  image,
  // category,
  title,
  author,
  date,
}: NewsCardProps) {
  const fallbackImage = "/fallback-image.jpg";

  // // Handle category as array or comma-separated string
  // let parsedCategories: string[] = [];
  // if (Array.isArray(category)) {
  //   parsedCategories = category;
  // } else if (typeof category === "string") {
  //   parsedCategories = category
  //     .split(",")
  //     .map((c) => c.trim())
  //     .filter(Boolean);
  // }

  return (
    <Link href={`/news-view/${id}`} passHref>
      <div className="bg-white text-charcoal rounded-lg overflow-hidden shadow-md border border-gray-200 mx-auto md:mx-0 font-notoSans cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
        <div className="relative w-full pt-[56.25%]">
          {/* 16:9 aspect ratio */}
          <Image
            src={image || fallbackImage}
            alt=""
            fill
            className="object-cover absolute inset-0 w-full h-full aspect-[16/9]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          {/* <div className="absolute top-2 right-2 bg-zinc-200 text-xs px-2 py-0.5 rounded">
            {parsedCategories.map((cat, index) => (
              <span key={index} className="mr-1">
                {cat}
              </span>
            ))}
          </div> */}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-sm font-semibold mb-2 leading-snug font-muktaMalar">
            {title}
          </h2>

          <div className="text-[10px] text-gray-500 mt-auto flex items-center justify-between">
            <span className="font-medium">{author} by </span>
            <span className="font-medium">{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
