import Image, { StaticImageData } from "next/image";

interface LargeLeaderboardAdProps {
  imageUrl: string | StaticImageData;
  linkUrl: string;
  alt?: string;
}

export default function LargeLeaderboardAd({
  imageUrl,
  linkUrl,
  alt = "Advertisement",
}: LargeLeaderboardAdProps) {
  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="lg:block w-[970px] h-[90px] rounded-lg overflow-hidden bg-gray-100 mx-auto mb-6 hidden"
    >
      <div className="relative w-[970px] h-[90px]">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-contain"
          sizes="970px"
          priority
        />
      </div>
    </a>
  );
}
