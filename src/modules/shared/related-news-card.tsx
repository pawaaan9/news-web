import Image from "next/image";
import Link from "next/link";

interface RelatedNewsCardProps {
  url: string;
  image?: string;
  title: string;
  date: string;
}

export default function RelatedNewsCard({
  url,
  image,
  title,
  date,
}: RelatedNewsCardProps) {
  return (
    <Link
      href={`/news/${url}`}
      className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition"
    >
      <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-200 ">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : null}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm text-gray-900 truncate">
          {title}
        </div>
        <div className="text-xs text-gray-500">{date}</div>
      </div>
    </Link>
  );
}
