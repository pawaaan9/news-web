import Image, { StaticImageData } from "next/image";

interface MobileBannerAdProps {
  imageUrl: string | StaticImageData;
  linkUrl: string;
  alt?: string;
}

export default function MobileBannerAd({
  imageUrl,
  linkUrl,
  alt = "Advertisement",
}: MobileBannerAdProps) {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-[320px] h-[50px] rounded-lg overflow-hidden bg-gray-100 mx-auto mb-6 lg:hidden"
    >
      <div className="relative w-[320px] h-[50px]">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-contain"
          sizes="320px"
          priority
        />
      </div>
    </a>
  );
}
