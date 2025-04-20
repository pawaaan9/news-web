import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  id: string;
  image: StaticImageData;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
}

export default function NewsCard({
  id,
  image,
  category,
  title,
  description,
  author,
  date,
}: NewsCardProps) {
  return (
    <Link href={`/news-view/${id}`} passHref>
      <div className="bg-white text-charcoal rounded-lg overflow-hidden shadow-md max-w-xs border border-gray-200 mx-auto md:mx-0 font-notoSans cursor-pointer hover:shadow-lg transition-shadow duration-300 h-[400px] flex flex-col">
        {/* Image container with fixed height */}
        <div className="relative w-full h-48 flex-shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2 bg-white/80 text-xs px-2 py-0.5 rounded">
            {category}
          </div>
        </div>
        
        {/* Content container with fixed height and flex layout */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Title with fixed height and overflow handling */}
          <h2 className="text-sm font-semibold mb-2 leading-snug line-clamp-2 h-12 overflow-hidden">
            {title}
          </h2>
          
          {/* Description with fixed height and overflow handling */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-3 flex-grow">
            {description}
          </p>
          
          {/* Author and date - fixed at bottom */}
          <div className="text-[10px] text-gray-500 mt-auto">
            <span className="font-medium">{author}</span> විසින් • {date}
          </div>
        </div>
      </div>
    </Link>
  );
}