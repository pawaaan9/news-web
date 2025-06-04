import Image, { StaticImageData } from "next/image";

interface LargeRectangleAdProps {
  imageUrl: string | StaticImageData;
  linkUrl: string;
  alt?: string;
}

export default function LargeRectangleAd({
  imageUrl,
  linkUrl,
  alt = "Advertisement",
}: LargeRectangleAdProps) {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-[336px] h-[280px] rounded-lg overflow-hidden shadow-md bg-white mx-auto mb-6 lg:hidden"
    >
      <div className="relative w-[336px] h-[280px]">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-contain"
          sizes="336px"
          priority
        />
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 border border-white rounded">
          Ad
        </div>
      </div>
    </a>
  );
}
