import Image, { StaticImageData } from "next/image";

interface SkyscraperAdProps {
  imageUrl: string | StaticImageData;
  linkUrl: string;
  alt?: string;
}

export default function SkyscraperAd({
  imageUrl,
  linkUrl,
  alt = "Advertisement",
}: SkyscraperAdProps) {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full h-[100px] rounded-lg overflow-hidden bg-gray-100 mx-auto mb-6"
    >
      <div className="relative w-full h-[100px]">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-contain w-full "
          priority
        />
      </div>
    </a>
  );
}
