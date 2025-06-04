import Image, { StaticImageData } from "next/image";

interface MediumRectangleAdProps {
  imageUrl: string | StaticImageData;
  linkUrl: string;
  alt?: string;
}

export default function MediumRectangleAd({
  imageUrl,
  linkUrl,
  alt = "Advertisement",
}: MediumRectangleAdProps) {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-[300px] h-[250px] rounded-lg overflow-hidden shadow-md bg-white mx-auto mb-6 lg:hidden"
    >
      <div className="relative w-[300px] h-[250px]">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-contain"
          sizes="300px"
          priority
        />
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 border border-white rounded">
          Ad
        </div>
      </div>
    </a>
  );
}
