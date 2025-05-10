import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface NewsCardProps {
  id: string;
  image: string | StaticImageData;
  category: string;
  title: string;
  author: string;
  date: string;
}

export default function NewsCard({
  id,
  image,
  category,
  title,
  author,
  date,
}: NewsCardProps) {
  const fallbackImage = "/fallback-image.jpg";

  return (
    <Link href={`/news-view/${id}`} passHref>
      <div className="bg-white text-charcoal rounded-lg overflow-hidden shadow-md  w-full border border-gray-200 mx-auto md:mx-0 font-notoSans flex flex-col h-[280px] cursor-pointer hover:shadow-lg transition-shadow duration-300 pb-4">
        <div className="relative w-full aspect-video">
          <Image
            src={image || fallbackImage}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 bg-white/80 text-[10px] px-2 py-0.5 rounded">
            {category}
          </div>
        </div>

        <div className="p-3 flex flex-col flex-grow">
          <p className="text-xs text-gray-400 mb-1">{category}</p>
          <h2 className="text-sm font-semibold leading-snug mb-auto line-clamp-3">
            {title}
          </h2>
          <div className="text-[10px] text-gray-500 mt-3 flex items-center justify-between">
            <span className="font-medium">{author} විසින්</span>
            <span className="font-medium">{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
