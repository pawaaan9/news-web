import Image, { StaticImageData } from 'next/image';

interface AdCardProps {
  image: StaticImageData;
  title: string;
  brand: string;
}

export default function AdCard({ image, title, brand }: AdCardProps) {
  return (
    <div className="bg-white text-charcoal rounded-lg overflow-hidden shadow-md max-w-xs border-secondary-grey border-1 mx-auto md:mx-0">
      <div className="relative w-full h-40">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-400 mb-1">{brand}</p>
        <h2 className="text-sm font-semibold leading-snug mb-2">
          {title}
        </h2>
        <span className="text-[10px] border border-gray-500 px-1.5 py-0.5 rounded text-charcoal">
          Ad
        </span>
      </div>
    </div>
  );
}