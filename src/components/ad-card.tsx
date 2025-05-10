import Image, { StaticImageData } from 'next/image';

interface AdCardProps {
  image: StaticImageData;
  title: string;
  brand: string;
}

export default function AdCard({ image, title, brand }: AdCardProps) {
  return (
    <div className="bg-white text-charcoal rounded-lg overflow-hidden shadow-md max-w-xs w-full border border-gray-200 mx-auto md:mx-0 font-notoSans flex flex-col h-[280px]">
      <div className="relative w-full aspect-video">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/80 text-[10px] px-2 py-0.5 rounded">
          Ad
        </div>
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <p className="text-xs text-gray-400 mb-1">{brand}</p>
        <h2 className="text-sm font-semibold leading-snug mb-auto line-clamp-3">{title}</h2>
        <div className="text-[10px] text-gray-500 mt-3">Sponsored Content</div>
      </div>
    </div>
  );
}
