import Image, { StaticImageData } from 'next/image';

interface NewsCardProps {
  image: StaticImageData;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
}

export default function NewsCard({
  image,
  category,
  title,
  description,
  author,
  date,
}: NewsCardProps) {
  return (
    <div className="bg-white text-charcoal rounded-lg overflow-hidden shadow-md max-w-xs border border-gray-200 mx-auto md:mx-0 font-notoSans">
      <div className="relative w-full h-40">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/80 text-xs px-2 py-0.5 rounded">
          {category}
        </div>
      </div>
      <div className="p-3">
        <h2 className="text-sm font-semibold mb-1 leading-snug">{title}</h2>
        <p className="text-xs text-gray-600 mb-2 line-clamp-3">{description}</p>
        <div className="text-[10px] text-gray-500">
        <span className="font-medium">{author}</span> විසින්  • {date}
        </div>
      </div>
    </div>
  );
}