import Image, { StaticImageData } from "next/image";

interface LargeMobileBannerAdProps {
  imageUrl: string | StaticImageData;
  linkUrl: string;
  alt?: string;
}

export default function LargeMobileBannerAd({
  imageUrl,
  linkUrl,
  alt = "Advertisement",
}: LargeMobileBannerAdProps) {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-[320px] h-[100px] rounded-lg overflow-hidden shadow-md bg-white mx-auto mb-6 lg:hidden"
    >
      <div className="relative w-[320px] h-[100px]">
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
