import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface NewsCardProps {
  id: string; // Add id to props
  url: string;
  image: string | StaticImageData;
  category: string;
  title: string;
  author: string;
  date: string;
}

export default function NewsCard({
  id,
  url,
  image,
  category,
  title,
  author,
  date,
}: NewsCardProps) {
  const fallbackImage = "/fallback-image.jpg";

  let parsedCategories: string[] = [];
  try {
    parsedCategories = JSON.parse(category);
  } catch (error) {
    console.error("Failed to parse category:", error);
    parsedCategories = ["Unknown"];
  }

  return (
    <Link href={`/news-view/${id}`} passHref> 
      <div className="bg-white text-charcoal rounded-lg overflow-hidden shadow-md border border-gray-200 mx-auto md:mx-0 font-notoSans cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
        <div className="relative w-full aspect-video flex-shrink-0">
          <Image
            src={image || fallbackImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2 bg-zinc-200 text-xs px-2 py-0.5 rounded">
            {parsedCategories.map((cat, index) => (
              <span key={index} className="mr-1">
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-sm font-semibold mb-2 leading-snug">{title}</h2>

          <div className="text-[10px] text-gray-500 mt-auto flex items-center justify-between">
            <span className="font-medium">{author} විසින් </span>
            <span className="font-medium">{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}